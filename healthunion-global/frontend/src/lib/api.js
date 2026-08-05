import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const getPosts = (lang) =>
  api.get(`/posts`, { params: { lang } }).then((r) => r.data);

export const getPost = (slug, lang) =>
  api.get(`/posts/${slug}`, { params: { lang } }).then((r) => r.data);

export const uploadFile = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api
    .post(`/files/upload`, fd, { headers: { "Content-Type": "multipart/form-data" } })
    .then((r) => r.data);
};

export const submitContact = (payload) =>
  api.post(`/contact/submit`, payload).then((r) => r.data);

export const fileDownloadUrl = (fileId) => `${API}/files/${fileId}/download`;
