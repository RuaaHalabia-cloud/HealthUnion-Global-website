from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException, Header, Query
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from bson import ObjectId
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import email_service
from seed_data import BLOG_POSTS

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
fs = AsyncIOMotorGridFSBucket(db, bucket_name="uploads")

APP_NAME = os.environ.get("APP_NAME", "healthunion")
MAX_FILE_BYTES = 20 * 1024 * 1024  # 20 MB
ALLOWED_PRODUCT_CATEGORIES = {"medical_device", "cosmetics"}
ALLOWED_DEVICE_CLASSES = {"class_i", "class_iia", "class_iib", "class_iii", ""}
ALLOWED_MARKETS = {"usa", "canada", "saudi_arabia", "other_gcc"}

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactSubmissionCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    company_name: str
    contact_email: EmailStr
    contact_phone: Optional[str] = ""
    product_category: str
    device_classification: Optional[str] = ""
    target_markets: List[str] = Field(default_factory=list)
    message: str
    consent: bool = False
    locale: str = "en"
    file_id: Optional[str] = None
    # honeypot anti-spam field, must remain empty for genuine users
    website: Optional[str] = ""


class ContactSubmission(ContactSubmissionCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    is_spam: bool = False


# ---------- Helpers ----------
def localized_posts(lang: str):
    lang = "ar" if lang == "ar" else "en"
    out = []
    for p in BLOG_POSTS:
        loc = p[lang]
        out.append({
            "id": p["id"],
            "slug": p["slug"],
            "category": p["category"],
            "image": p["image"],
            "featured": p["featured"],
            "date": p["date"],
            "reading_time": p["reading_time"],
            "title": loc["title"],
            "excerpt": loc["excerpt"],
            "body": loc["body"],
        })
    return out


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "HealthUnion Global API", "status": "ok"}


@api_router.get("/posts")
async def get_posts(lang: str = Query("en")):
    posts = localized_posts(lang)
    # list view excludes full body for lightness
    return [{k: v for k, v in p.items() if k != "body"} for p in posts]


@api_router.get("/posts/{slug}")
async def get_post(slug: str, lang: str = Query("en")):
    for p in localized_posts(lang):
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail="Post not found")


@api_router.post("/files/upload")
async def upload_file(file: UploadFile = File(...)):
    # Validate PDF by content type and magic header
    filename = file.filename or "document.pdf"
    data = await file.read()
    if len(data) == 0:
        raise HTTPException(status_code=422, detail="Empty file")
    if len(data) > MAX_FILE_BYTES:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 20 MB.")
    is_pdf_ext = filename.lower().endswith(".pdf")
    is_pdf_ct = (file.content_type or "").lower() in ("application/pdf", "application/x-pdf")
    is_pdf_magic = data[:5] == b"%PDF-"
    if not (is_pdf_magic and (is_pdf_ext or is_pdf_ct)):
        raise HTTPException(status_code=415, detail="Only PDF files are accepted.")

    file_id = str(uuid.uuid4())
    try:
        grid_id = await fs.upload_from_stream(
            f"{file_id}.pdf",
            data,
            metadata={"file_id": file_id, "original_filename": filename},
        )
    except Exception as e:
        logger.error("Upload to GridFS failed: %s", e)
        raise HTTPException(status_code=502, detail="Storage upload failed. Please try again.")
    result = {"path": str(grid_id), "size": len(data)}

    doc = {
        "id": file_id,
        "storage_path": result["path"],
        "original_filename": filename,
        "content_type": "application/pdf",
        "size": result["size"],
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.files.insert_one(doc)
    return {"file_id": file_id, "original_filename": filename, "size": doc["size"]}


@api_router.get("/files/{file_id}/download")
async def download_file(file_id: str):
    record = await db.files.find_one({"id": file_id, "is_deleted": False}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    try:
        stream = await fs.open_download_stream(ObjectId(record["storage_path"]))
        data = await stream.read()
        content_type = "application/pdf"
    except Exception as e:
        logger.error("Download from GridFS failed: %s", e)
        raise HTTPException(status_code=404, detail="File no longer available")
    headers = {
        "Content-Disposition": f'inline; filename="{record.get("original_filename", "document.pdf")}"'
    }
    return Response(content=data, media_type=record.get("content_type", "application/pdf"), headers=headers)


@api_router.post("/contact/submit")
async def submit_contact(payload: ContactSubmissionCreate):
    # Honeypot: if filled, silently accept but flag as spam (don't notify)
    is_spam = bool((payload.website or "").strip())

    # Validation
    if not payload.company_name.strip():
        raise HTTPException(status_code=422, detail="Company name is required.")
    if payload.product_category not in ALLOWED_PRODUCT_CATEGORIES:
        raise HTTPException(status_code=422, detail="Invalid product category.")
    if payload.device_classification not in ALLOWED_DEVICE_CLASSES:
        raise HTTPException(status_code=422, detail="Invalid device classification.")
    if not payload.message.strip():
        raise HTTPException(status_code=422, detail="Message is required.")
    if any(m not in ALLOWED_MARKETS for m in payload.target_markets):
        raise HTTPException(status_code=422, detail="Invalid target market.")
    if not payload.consent:
        raise HTTPException(status_code=422, detail="Consent is required to submit this form.")

    # Validate referenced file exists
    frec = None
    if payload.file_id:
        frec = await db.files.find_one({"id": payload.file_id, "is_deleted": False})
        if not frec:
            raise HTTPException(status_code=422, detail="Referenced file not found.")

    submission = ContactSubmission(**payload.model_dump(), is_spam=is_spam)
    doc = submission.model_dump()
    await db.contact_submissions.insert_one(doc)

    # Attach the uploaded PDF to the notification, then drop it.
    # Nothing is kept at rest: the email becomes the single copy.
    attachment = None
    if payload.file_id and not is_spam and frec:
        try:
            stream = await fs.open_download_stream(ObjectId(frec["storage_path"]))
            attachment = (frec.get("original_filename", "document.pdf"), await stream.read())
        except Exception as e:
            logger.error("Could not read uploaded file for attachment: %s", e)

    # Notify (no-op if email not configured); skip notify for spam
    sent = False
    if not is_spam:
        try:
            sent = email_service.notify_new_lead(doc, attachment=attachment)
        except Exception as e:
            logger.error("Email notify error (non-fatal): %s", e)

    # Purge the PDF once it has been delivered by email.
    if payload.file_id and frec and sent:
        try:
            await fs.delete(ObjectId(frec["storage_path"]))
            await db.files.update_one({"id": payload.file_id}, {"$set": {"is_deleted": True}})
        except Exception as e:
            logger.error("Could not purge uploaded file: %s", e)

    return {
        "id": submission.id,
        "status": "received",
        "email_enabled": email_service.is_enabled(),
        "email_sent": sent if not is_spam else True,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    """Remove upload leftovers older than 24 hours (forms started but never sent)."""
    try:
        cutoff = datetime.now(timezone.utc) - timedelta(hours=24)
        removed = 0
        async for grid_file in fs.find({"uploadDate": {"$lt": cutoff}}):
            await fs.delete(grid_file._id)
            removed += 1
        if removed:
            await db.files.delete_many({"created_at": {"$lt": cutoff.isoformat()}})
            logger.info("Startup cleanup: %s orphaned upload(s) removed", removed)
    except Exception as e:
        logger.error("Startup cleanup failed: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
