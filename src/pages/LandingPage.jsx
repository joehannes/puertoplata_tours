import { Link } from 'react-router-dom';
import { t } from '../lib/i18n';

export default function LandingPage({ lang, data }) {
  const tx = t[lang];
  return (
    <div className="space-y-8">
      <section className="card bg-gradient-to-r from-ocean-700 to-ocean-500 text-white">
        <h1 className="font-heading text-4xl mb-2">Puerto Plata Half-Day Adventures</h1>
        <p className="mb-4">{tx.hoursWarning}</p>
        <div className="flex gap-3">
          <Link className="btn-primary bg-white text-ocean-800" to="/tours">{tx.exploreTours}</Link>
          <Link className="btn-secondary border-white text-white hover:bg-white/10" to="/custom">{tx.planMyDay}</Link>
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl mb-3">Predefined Tours</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.tours.slice(0, 2).map((tour) => (
            <div className="card" key={tour.id}><h3 className="font-semibold">{tour.title}</h3><p>{tour.shortDescription}</p></div>
          ))}
        </div>
      </section>
      <section className="card">
        <h2 className="font-heading text-2xl mb-2">Flexible Private Guide</h2>
        <p>Spontaneous, local, and tailored in real time. Choose your vibe, then finalize details on WhatsApp.</p>
      </section>
      <section className="card">
        <h2 className="font-heading text-2xl mb-2">Airport Transfers</h2>
        <p>{data.transfers[0]?.title} from ${data.transfers[0]?.price}</p>
      </section>
    </div>
  );
}
