import { useEffect, useMemo, useState } from 'react';
import { uploadImageUrlToCloudinary, uploadToCloudinary } from '../lib/api';
import { tr } from '../lib/i18n';

const emptyTour = {
  id: '', title: '', shortDescription: '', description: '', durationHours: 4,
  price: { adult: 60, child: 40 }, maxGroupSize: 10, images: [], tags: [], itinerary: [], includes: [], notes: [], availability: true
};

const emptyTransfer = { id: '', title: '', price: 35, capacity: 4, description: '', durationMinutes: 40, availability: true };

const parseList = (v) => v.split(',').map((x) => x.trim()).filter(Boolean);

export default function AdminPage({ data, updateData, lang }) {
  const [pwd, setPwd] = useState('');
  const [ok, setOk] = useState(false);
  const [status, setStatus] = useState('');
  const [tab, setTab] = useState('tours');
  const [draft, setDraft] = useState(data);

  useEffect(() => setDraft(data), [data]);

  const login = () => setOk(pwd === import.meta.env.VITE_ADMIN_PASSWORD);
  const persist = async (next) => {
    setDraft(next);
    await updateData(next);
    setStatus(tr(lang, 'admin.saved'));
  };

  const addTour = () => setDraft((prev) => ({ ...prev, tours: [...prev.tours, { ...emptyTour, id: `tour_${Date.now()}` }] }));
  const addTransfer = () => setDraft((prev) => ({ ...prev, transfers: [...prev.transfers, { ...emptyTransfer, id: `transfer_${Date.now()}` }] }));

  const updateTour = (idx, patch) => setDraft((prev) => ({ ...prev, tours: prev.tours.map((t, i) => i === idx ? { ...t, ...patch } : t) }));
  const updateTransfer = (idx, patch) => setDraft((prev) => ({ ...prev, transfers: prev.transfers.map((t, i) => i === idx ? { ...t, ...patch } : t) }));

  const onTourImageUpload = async (idx, file) => {
    if (!file) return;
    setStatus('Uploading image...');
    try {
      const url = await uploadToCloudinary(file);
      setDraft((prev) => ({
        ...prev,
        tours: prev.tours.map((t, i) => i === idx ? { ...t, images: [...t.images, url] } : t)
      }));
      setStatus('Image uploaded and attached to tour.');
    } catch {
      setStatus('Upload failed. Confirm Cloudinary vars + unsigned preset.');
    }
  };


  const migrateAllTourImagesToCloudinary = async () => {
    setStatus('Migrating image URLs to Cloudinary...');
    try {
      const migratedTours = [];
      for (const tour of draft.tours) {
        const urls = [];
        for (const img of tour.images) {
          if (img.includes('res.cloudinary.com')) {
            urls.push(img);
          } else {
            const hosted = await uploadImageUrlToCloudinary(img);
            urls.push(hosted);
          }
        }
        migratedTours.push({ ...tour, images: urls });
      }
      const next = { ...draft, tours: migratedTours };
      setDraft(next);
      await updateData(next);
      setStatus('Migration complete and saved to JSONBin.');
    } catch {
      setStatus('Migration failed. Check Cloudinary preset/keys and JSONBin settings.');
    }
  };

  const tabs = useMemo(() => [
    { id: 'tours', label: tr(lang, 'admin.tours') },
    { id: 'custom', label: tr(lang, 'admin.custom') },
    { id: 'transfers', label: tr(lang, 'admin.transfers') },
    { id: 'settings', label: tr(lang, 'admin.settings') }
  ], [lang]);

  if (!ok) {
    return (
      <div className="tropical-card max-w-md mx-auto space-y-3">
        <h1 className="font-heading text-2xl">{tr(lang, 'admin.login')}</h1>
        <input className="w-full border rounded-xl p-2" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Password" />
        <button className="btn-island" onClick={login}>{tr(lang, 'admin.enter')}</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="tropical-card flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">{tabs.map((x) => <button key={x.id} className={`rounded-full px-3 py-1 ${tab === x.id ? 'bg-ocean-700 text-white' : 'bg-ocean-50'}`} onClick={() => setTab(x.id)}>{x.label}</button>)}</div>
        <div className="flex gap-2"><button className="btn-sunset" onClick={() => persist(draft)}>{tr(lang, 'common.save')}</button><button className="btn-island" onClick={migrateAllTourImagesToCloudinary}>Migrate Images → Cloudinary</button></div>
      </div>

      {tab === 'tours' && (
        <div className="space-y-4">
          <button className="btn-island" onClick={addTour}>{tr(lang, 'admin.addTour')}</button>
          {draft.tours.map((tour, idx) => (
            <div key={tour.id} className="tropical-card space-y-2">
              <div className="grid md:grid-cols-3 gap-2">
                <input className="border rounded-xl p-2" value={tour.title} onChange={(e) => updateTour(idx, { title: e.target.value })} placeholder="Title" />
                <input className="border rounded-xl p-2" value={tour.id} onChange={(e) => updateTour(idx, { id: e.target.value })} placeholder="ID" />
                <input className="border rounded-xl p-2" type="number" value={tour.durationHours} onChange={(e) => updateTour(idx, { durationHours: Number(e.target.value) })} placeholder="Hours" />
              </div>
              <textarea className="w-full border rounded-xl p-2" value={tour.shortDescription} onChange={(e) => updateTour(idx, { shortDescription: e.target.value })} placeholder="Short description" />
              <textarea className="w-full border rounded-xl p-2" value={tour.description} onChange={(e) => updateTour(idx, { description: e.target.value })} placeholder="Full description" />
              <div className="grid md:grid-cols-3 gap-2">
                <input className="border rounded-xl p-2" type="number" value={tour.price.adult} onChange={(e) => updateTour(idx, { price: { ...tour.price, adult: Number(e.target.value) } })} placeholder="Adult" />
                <input className="border rounded-xl p-2" type="number" value={tour.price.child} onChange={(e) => updateTour(idx, { price: { ...tour.price, child: Number(e.target.value) } })} placeholder="Child" />
                <input className="border rounded-xl p-2" type="number" value={tour.maxGroupSize} onChange={(e) => updateTour(idx, { maxGroupSize: Number(e.target.value) })} placeholder="Group max" />
              </div>
              <input className="border rounded-xl p-2 w-full" value={tour.tags.join(', ')} onChange={(e) => updateTour(idx, { tags: parseList(e.target.value) })} placeholder="tags: nature, culture" />
              <input className="border rounded-xl p-2 w-full" value={(tour.itinerary || []).join(', ')} onChange={(e) => updateTour(idx, { itinerary: parseList(e.target.value) })} placeholder="itinerary comma separated" />
              <input className="border rounded-xl p-2 w-full" value={(tour.includes || []).join(', ')} onChange={(e) => updateTour(idx, { includes: parseList(e.target.value) })} placeholder="includes comma separated" />
              <input className="border rounded-xl p-2 w-full" value={(tour.notes || []).join(', ')} onChange={(e) => updateTour(idx, { notes: parseList(e.target.value) })} placeholder="notes comma separated" />
              <label className="text-sm block">{tr(lang, 'admin.upload')}
                <input type="file" accept="image/*" onChange={(e) => onTourImageUpload(idx, e.target.files?.[0])} className="mt-1" />
              </label>
              <div className="grid grid-cols-4 gap-2">{tour.images.map((img) => <img key={img} src={img} alt="tour" className="h-16 w-full object-cover rounded-xl" />)}</div>
              <button className="text-sm text-red-600" onClick={() => setDraft((prev) => ({ ...prev, tours: prev.tours.filter((_, i) => i !== idx) }))}>{tr(lang, 'admin.del')} tour</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'transfers' && (
        <div className="space-y-4">
          <button className="btn-island" onClick={addTransfer}>{tr(lang, 'admin.addTransfer')}</button>
          {draft.transfers.map((tr, idx) => (
            <div key={tr.id} className="tropical-card grid md:grid-cols-3 gap-2 items-center">
              <input className="border rounded-xl p-2" value={tr.title} onChange={(e) => updateTransfer(idx, { title: e.target.value })} />
              <input className="border rounded-xl p-2" value={tr.id} onChange={(e) => updateTransfer(idx, { id: e.target.value })} />
              <input className="border rounded-xl p-2" value={tr.description} onChange={(e) => updateTransfer(idx, { description: e.target.value })} />
              <input className="border rounded-xl p-2" type="number" value={tr.price} onChange={(e) => updateTransfer(idx, { price: Number(e.target.value) })} />
              <input className="border rounded-xl p-2" type="number" value={tr.capacity} onChange={(e) => updateTransfer(idx, { capacity: Number(e.target.value) })} />
              <input className="border rounded-xl p-2" type="number" value={tr.durationMinutes || 40} onChange={(e) => updateTransfer(idx, { durationMinutes: Number(e.target.value) })} />
              <button className="text-sm text-red-600" onClick={() => setDraft((prev) => ({ ...prev, transfers: prev.transfers.filter((_, i) => i !== idx) }))}>{tr(lang, 'admin.del')}</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'custom' && (
        <div className="tropical-card space-y-2">
          <input className="border rounded-xl p-2 w-full" type="number" value={draft.customOptions.basePricePerHour} onChange={(e) => setDraft((prev) => ({ ...prev, customOptions: { ...prev.customOptions, basePricePerHour: Number(e.target.value) } }))} />
          <input className="border rounded-xl p-2 w-full" type="number" value={draft.customOptions.maxHours} onChange={(e) => setDraft((prev) => ({ ...prev, customOptions: { ...prev.customOptions, maxHours: Number(e.target.value) } }))} />
          <input className="border rounded-xl p-2 w-full" value={draft.customOptions.options.map((o) => `${o.id}:${o.label}`).join(',')} onChange={(e) => setDraft((prev) => ({ ...prev, customOptions: { ...prev.customOptions, options: e.target.value.split(',').map((x) => x.trim()).filter(Boolean).map((x) => ({ id: x.split(':')[0], label: x.split(':')[1] || x.split(':')[0] })) } }))} />
        </div>
      )}

      {tab === 'settings' && (
        <div className="tropical-card grid md:grid-cols-2 gap-2">
          <label className="text-sm">WhatsApp number
            <input className="border rounded-xl p-2 w-full" value={draft.settings.whatsappNumber} onChange={(e) => setDraft((prev) => ({ ...prev, settings: { ...prev.settings, whatsappNumber: e.target.value } }))} placeholder="WhatsApp" />
          </label>
          <label className="text-sm">PayPal recipient email (used by checkout button)
            <input className="border rounded-xl p-2 w-full" value={draft.settings.paypalEmail || ''} onChange={(e) => setDraft((prev) => ({ ...prev, settings: { ...prev.settings, paypalEmail: e.target.value } }))} placeholder="PayPal email" />
          </label>
          <input className="border rounded-xl p-2" value={draft.settings.guideName || ''} onChange={(e) => setDraft((prev) => ({ ...prev, settings: { ...prev.settings, guideName: e.target.value } }))} placeholder="Guide name" />
          <input className="border rounded-xl p-2" type="number" value={draft.settings.guideYears || 0} onChange={(e) => setDraft((prev) => ({ ...prev, settings: { ...prev.settings, guideYears: Number(e.target.value) } }))} placeholder="Years exp" />
          <textarea className="border rounded-xl p-2 md:col-span-2" value={draft.settings.guideBio || ''} onChange={(e) => setDraft((prev) => ({ ...prev, settings: { ...prev.settings, guideBio: e.target.value } }))} placeholder="Guide bio" />
        </div>
      )}

      {status && <p className="text-sm text-ocean-900">{status}</p>}
    </div>
  );
}
