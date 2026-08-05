# HealthUnion Global

Bilingual English and Arabic website for a regulatory affairs and compliance
consultancy covering medical devices and cosmetics across North America,
Saudi Arabia and the wider GCC.

## Stack

- **Frontend** React (Create React App with craco), Tailwind CSS, shadcn/ui,
  react-router, react-i18next with native right to left support
- **Backend** FastAPI, MongoDB via Motor
- **Email** SMTP, contact form submissions are delivered by email with the
  uploaded PDF attached

## Repository layout

```
frontend/          React application
  src/pages/       Home, Services, About, Insights, Contact, Privacy
  src/components/  Header, Footer, PageHero, FocusMarkets, CookieConsent
  src/locales/     en.json and ar.json, all interface strings
backend/           FastAPI service
  server.py        API endpoints
  email_service.py Email notifications
DEPLOY.md          Deployment guide, environment variables and DNS records
```

## Local development

Backend:

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env      # then fill in the values
uvicorn server:app --reload --port 8000
```

Frontend:

```bash
cd frontend
yarn install
cp .env.example .env      # then set REACT_APP_BACKEND_URL
yarn start
```

Run `yarn build` before pushing: it is the gate that catches build errors.

## Contact form behaviour

A submission is written to the database and sent by email to `EMAIL_TO`.
When a PDF is uploaded it travels through the database for the duration of the
submission, is attached to the notification email, then deleted. Files
uploaded without a completed submission are purged after 24 hours. No document
is kept at rest.

## Deployment

See DEPLOY.md for environment variables, SMTP configuration, DNS records and
the post launch verification checklist.

## Migrating to a new GitHub repository

This archive contains no git history and no build artefacts. To publish it
under your own organisation:

```bash
cd healthunion-global
git init
git add .
git commit -m "Initial commit: HealthUnion Global website"
git branch -M main
git remote add origin https://github.com/YOUR-ORG/healthunion-global.git
git push -u origin main
```

Check before the first commit that no `.env` file is staged. The `.gitignore`
excludes them, only the `.env.example` templates are tracked.
