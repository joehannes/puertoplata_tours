import { Link } from 'react-router-dom';

export default function ToursPage({ data }) {
  return (
    <div>
      <h1 className="font-heading text-3xl mb-4">Tours (4-6 hours)</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.tours.filter((t) => t.availability).map((tour) => (
          <article key={tour.id} className="card">
            <img src={tour.images[0]} alt={tour.title} className="w-full h-48 object-cover rounded-xl mb-3" />
            <h2 className="font-semibold text-xl">{tour.title}</h2>
            <p>{tour.shortDescription}</p>
            <p className="text-sm mt-2">Duration: {tour.durationHours}h • Adult: ${tour.price.adult}</p>
            <Link className="btn-primary inline-block mt-3" to={`/tours/${tour.id}`}>View Details</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
