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
    <div className="card space-y-4">
      <h1 className="font-heading text-3xl">Build Your Day</h1>
      <p>Choose your preferences and decide in real time with your private local guide.</p>
      <div className="grid md:grid-cols-2 gap-3">
        {opts.map((o) => (
          <button key={o.id} onClick={() => toggle(o.id)} className={`p-3 rounded-xl border text-left ${selected.includes(o.id) ? 'bg-ocean-100 border-ocean-500' : 'bg-white'}`}>
            {o.label}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-4 gap-3">
        <label>Hours (max {data.customOptions.maxHours})<input className="w-full border rounded p-2" type="number" min="1" max={data.customOptions.maxHours} value={hours} onChange={(e) => setHours(Number(e.target.value))} /></label>
        <label>Group<input className="w-full border rounded p-2" type="number" min="1" value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value))} /></label>
        <label>Date<input className="w-full border rounded p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
      </div>
      <button className="btn-primary" onClick={() => {
        setCart({ type: 'custom', preferences: opts.filter((o) => selected.includes(o.id)).map((o) => o.label), hours, groupSize, date, pickup: 'Cruise Port', total });
        navigate('/checkout');
      }}>Continue (${total})</button>
    </div>
  );
}
