import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../lib/storage';

export default function CustomPage({ data }) {
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
        <h1 className="font-heading text-3xl">Private “Build Your Day” Guide</h1>
        <p className="text-slate-700 mt-2">Tell us your mood, then improvise on the go. Perfect when your group wants mixed experiences without rigid schedules.</p>
      </section>

      <section className="tropical-card">
        <h2 className="font-display text-xl mb-3">Choose your tropical mix</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {opts.map((o) => (
            <button key={o.id} onClick={() => toggle(o.id)} className={`p-3 rounded-3xl border text-left transition ${selected.includes(o.id) ? 'bg-ocean-100 border-ocean-500' : 'bg-white border-slate-200'}`}>
              {o.label}
            </button>
          ))}
        </div>
      </section>

      <section className="tropical-card grid md:grid-cols-4 gap-3 items-end">
        <label>Hours<input className="w-full border rounded-xl p-2" type="number" min="1" max={data.customOptions.maxHours} value={hours} onChange={(e) => setHours(Number(e.target.value))} /></label>
        <label>Group<input className="w-full border rounded-xl p-2" type="number" min="1" value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value))} /></label>
        <label>Date<input className="w-full border rounded-xl p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <button className="btn-island" onClick={() => {
          setCart({ type: 'custom', preferences: opts.filter((o) => selected.includes(o.id)).map((o) => o.label), hours, groupSize, date, pickup: 'Cruise Port', total });
          navigate('/checkout');
        }}>Continue ${total}</button>
      </section>
    </div>
  );
}
