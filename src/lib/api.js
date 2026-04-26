import { appDataSchema } from './schemas';

const base = 'https://api.jsonbin.io/v3/b';

export async function loadRemoteData(fallback) {
  const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
  const key = import.meta.env.VITE_JSONBIN_API_KEY;
  if (!binId || !key) return fallback;
  try {
    const res = await fetch(`${base}/${binId}/latest`, {
      headers: { 'X-Access-Key': key }
    });
    if (!res.ok) throw new Error('Failed remote fetch');
    const json = await res.json();
    const parsed = appDataSchema.safeParse(json.record);
    return parsed.success ? parsed.data : fallback;
  } catch {
    return fallback;
  }
}

export async function saveRemoteData(data) {
  const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
  const key = import.meta.env.VITE_JSONBIN_API_KEY;
  if (!binId || !key) return false;
  const res = await fetch(`${base}/${binId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': key
    },
    body: JSON.stringify(data)
  });
  return res.ok;
}

async function cloudinaryUpload(formData) {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  if (!cloud || !apiKey) throw new Error('Missing Cloudinary vars');
  formData.append('upload_preset', 'unsigned_puertoplata');
  formData.append('api_key', apiKey);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.secure_url;
}

export async function uploadToCloudinary(file) {
  const fd = new FormData();
  fd.append('file', file);
  return cloudinaryUpload(fd);
}

export async function uploadImageUrlToCloudinary(imageUrl) {
  const fd = new FormData();
  fd.append('file', imageUrl);
  return cloudinaryUpload(fd);
}
