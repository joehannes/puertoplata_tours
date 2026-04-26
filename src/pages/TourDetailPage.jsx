import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setCart } from '../lib/storage';

export default function TourDetailPage({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = data.tours.find((t) => t.id === id);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  const total = useMemo(() => {
    if (!tour) return 0;
    return adults * tour.price.adult + children * tour.price.child;
  }, [adults, children, tour]);

  if (!tour) return <div className="tropical-card">Tour not found.</div>;

  return (
    <div className="space-y-4">
      <section className="tropical-card space-y-4">
        <h1 className="font-heading text-3xl">{tour.title}</h1>
        <p className="text-slate-700">{tour.description}</p>
        <img src={tour.images[activeImage]} alt={tour.title} className="w-full h-72 object-cover rounded-3xl" />
        <div className="grid grid-cols-3 gap-2">
          {tour.images.map((image, idx) => (
            <button key={image} onClick={() => setActiveImage(idx)} className={`rounded-2xl overflow-hidden border-2 ${idx === activeImage ? 'border-ocean-700' : 'border-transparent'}`}>
              <img src={image} alt={`${tour.title} ${idx + 1}`} className="h-20 w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="tropical-card">
          <h2 className="font-display">Typical Flow</h2>
          <ul className="mt-2 text-sm list-disc pl-4 space-y-1">{tour.itinerary.map((step) => <li key={step}>{step}</li>)}</ul>
        </div>
        <div className="tropical-card">
          <h2 className="font-display">Included</h2>
          <ul className="mt-2 text-sm list-disc pl-4 space-y-1">{tour.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="tropical-card">
          <h2 className="font-display">Good To Know</h2>
          <ul className="mt-2 text-sm list-disc pl-4 space-y-1">{tour.notes.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="tropical-card space-y-3">
        <p className="text-sm text-slate-600">Cruise-safe duration: {tour.durationHours}h (includes return buffer)</p>
        <div className="grid md:grid-cols-4 gap-3 items-end">
          <label>Adults<input className="w-full border rounded-xl p-2" type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} /></label>
          <label>Children<input className="w-full border rounded-xl p-2" type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} /></label>
          <label>Date<input className="w-full border rounded-xl p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <button className="btn-sunset" onClick={() => {
            setCart({ type: 'tour', tourId: tour.id, title: tour.title, adults, children, date, pickup: 'Cruise Port', total });
            navigate('/checkout');
          }}>Reserve ${total}</button>
        </div>
      </section>
    </div>
  );
}
