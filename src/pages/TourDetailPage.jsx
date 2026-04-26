import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setCart } from '../lib/storage';

export default function TourDetailPage({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = data.tours.find((t) => t.id === id);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState('');

  if (!tour) return <div className="card">Tour not found.</div>;

  const total = adults * tour.price.adult + children * tour.price.child;

  return (
    <div className="card space-y-4">
      <h1 className="font-heading text-3xl">{tour.title}</h1>
      <p>{tour.description}</p>
      <div className="grid md:grid-cols-4 gap-3 items-end">
        <label>Adults<input className="w-full border rounded p-2" type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} /></label>
        <label>Children<input className="w-full border rounded p-2" type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} /></label>
        <label>Date<input className="w-full border rounded p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <button className="btn-primary" onClick={() => {
          setCart({ type: 'tour', tourId: tour.id, title: tour.title, adults, children, date, pickup: 'Cruise Port', total });
          navigate('/checkout');
        }}>Book ${total}</button>
      </div>
    </div>
  );
}
