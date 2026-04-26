import { Link } from 'react-router-dom';

export default function ToursPage({ data }) {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl">Shore Tours Crafted for 4–6 Hours</h1>
      <p className="text-slate-600">Every itinerary is optimized for cruise timing from Amber Cove and Taíno Bay.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {data.tours.filter((tour) => tour.availability).map((tour) => (
          <article key={tour.id} className="tropical-card space-y-3">
            <img src={tour.images[0]} alt={tour.title} className="w-full h-48 object-cover leaf-shape" />
            <div>
              <h2 className="font-display text-xl">{tour.title}</h2>
              <p>{tour.shortDescription}</p>
              <p className="text-sm text-slate-600 mt-2">{tour.durationHours}h • Up to {tour.maxGroupSize} guests • Adult ${tour.price.adult}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tour.tags.map((tag) => <span key={tag} className="text-xs bg-ocean-50 text-ocean-900 px-2 py-1 rounded-full">#{tag}</span>)}
            </div>
            <Link className="btn-island inline-block" to={`/tours/${tour.id}`}>Open Tour</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
