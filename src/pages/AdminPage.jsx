import { useState } from 'react';
import { uploadToCloudinary } from '../lib/api';

export default function AdminPage({ data, updateData }) {
  const [pwd, setPwd] = useState('');
  const [ok, setOk] = useState(false);
  const [draft, setDraft] = useState(JSON.stringify(data, null, 2));
  const [status, setStatus] = useState('');

  const login = () => setOk(pwd === import.meta.env.VITE_ADMIN_PASSWORD);

  const save = async () => {
    try {
      const parsed = JSON.parse(draft);
      await updateData(parsed);
      setStatus('Saved');
    } catch {
      setStatus('Invalid JSON');
    }
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadToCloudinary(file);
      setStatus(`Uploaded: ${url}`);
    } catch {
      setStatus('Cloudinary upload failed (configure preset/keys).');
    }
  };

  if (!ok) {
    return (
      <div className="card max-w-md mx-auto space-y-3">
        <h1 className="font-heading text-2xl">Admin</h1>
        <input className="w-full border rounded p-2" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Password" />
        <button className="btn-primary" onClick={login}>Enter</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl">Admin Dashboard</h1>
      <div className="card space-y-3">
        <label className="block">Upload image to Cloudinary<input type="file" accept="image/*" onChange={onUpload} className="mt-1" /></label>
        <textarea className="w-full border rounded p-3 min-h-[420px] font-mono text-xs" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button className="btn-primary" onClick={save}>Save to JSONBin</button>
        {status && <p className="text-sm">{status}</p>}
      </div>
    </div>
  );
}
