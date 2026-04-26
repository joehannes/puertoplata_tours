import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCartItem } from '../lib/storage';
import { tr } from '../lib/i18n';

export default function CustomPage({ data, lang }) {
  const navigate = useNavigate();
  const opts = data.customOptions.options;
  const [selected, setSelected] = useState([]);
  const [hours, setHours] = useState(4);
  const [groupSize, setGroupSize] = useState(2);
  const [date, setDate] = useState('');

  const total = hours * data.customOptions.basePricePerHour * groupSize;
  const toggle = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  return (
    <div className="space-y-4">
      <section className="tropical-card">
        <h1 className="font-heading text-3xl">{tr(lang, 'custom.title')}</h1>
        <p className="text-slate-700 mt-2">{tr(lang, 'custom.desc')}</p>
      </section>
      <section className="tropical-card">
        <h2 className="font-display text-xl mb-3">{tr(lang, 'custom.choose')}</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {opts.map((o) => (
            <button key={o.id} onClick={() => toggle(o.id)} className={`p-3 rounded-3xl border text-left transition ${selected.includes(o.id) ? 'bg-ocean-100 border-ocean-500' : 'bg-white/60 border-slate-200'}`}>
              {o.label}
            </button>
          ))}
        </div>
      </section>
      <section className="tropical-card grid md:grid-cols-4 gap-3 items-end">
        <label>{tr(lang, 'custom.hours')}<input className="w-full border rounded-xl p-2" type="number" min="1" max={data.customOptions.maxHours} value={hours} onChange={(e) => setHours(Number(e.target.value))} /></label>
        <label>{tr(lang, 'custom.group')}<input className="w-full border rounded-xl p-2" type="number" min="1" value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value))} /></label>
        <label>{tr(lang, 'common.date')}<input className="w-full border rounded-xl p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <button className="btn-island" onClick={() => {
          addCartItem({ type: 'custom', preferences: opts.filter((o) => selected.includes(o.id)).map((o) => o.label), hours, groupSize, date, pickup: 'Cruise Port', total });
          navigate('/checkout');
        }}>{tr(lang, 'common.continue')} ${total}</button>
      </section>
    </div>
  );
}
