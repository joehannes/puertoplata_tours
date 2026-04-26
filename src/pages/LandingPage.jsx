import { Link } from 'react-router-dom';
import { tr } from '../lib/i18n';

const heroImages = [
  'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1000',
  'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1000',
  'https://images.pexels.com/photos/3760259/pexels-photo-3760259.jpeg?auto=compress&cs=tinysrgb&w=1000'
];

export default function LandingPage({ lang, data }) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden p-5 pb-16 md:p-8 md:pb-20 wave-top text-white rounded-[2rem]">
        <div className="relative z-10 max-w-xl space-y-4">
          <p className="uppercase text-xs tracking-[0.25em] text-white/80">{tr(lang, 'landing.heroTag')}</p>
          <h1 className="font-heading text-4xl leading-tight">{tr(lang, 'landing.heroTitle')}</h1>
          <p className="text-white/90">{tr(lang, 'landing.hoursWarning')} {tr(lang, 'landing.heroSub')}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-sunset" to="/tours">🧭 {tr(lang, 'landing.exploreTours')}</Link>
            <Link className="btn-island" to="/custom">🌴 {tr(lang, 'landing.planMyDay')}</Link>
          </div>
        </div>
        <svg className="absolute -bottom-5 -right-2 w-40 h-40 opacity-30" viewBox="0 0 200 200"><path fill="white" d="M48.7,-63.9C64.4,-55.2,79.3,-43.1,83.7,-28.1C88.1,-13.1,82.2,4.8,74.4,20.7C66.5,36.6,56.7,50.5,43.6,62.1C30.5,73.8,14.3,83.2,-0.7,84.2C-15.7,85.2,-31.4,77.8,-43.1,67.1C-54.8,56.4,-62.6,42.4,-68.5,27.9C-74.5,13.5,-78.6,-1.5,-76.6,-16.1C-74.6,-30.6,-66.4,-44.7,-54.5,-54.2C-42.6,-63.6,-27,-68.4,-11.2,-73.2C4.7,-78,33,-72.6,48.7,-63.9Z" transform="translate(100 100)" /></svg>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {heroImages.map((img, i) => (
          <img key={img} src={img} alt="Puerto Plata experience" className={`h-36 w-full object-cover ${i % 2 ? 'shell-shape' : 'leaf-shape'}`} />
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="tropical-card">
          <h2 className="font-display text-xl">{tr(lang, 'landing.fastTitle')}</h2>
          <p className="text-slate-700">{tr(lang, 'landing.fastDesc')}</p>
          <p className="text-sm mt-2 text-ocean-900">{data.tours.length} {lang === 'es' ? 'experiencias listas ahora' : 'curated experiences ready now'}.</p>
        </div>
        <div className="tropical-card">
          <h2 className="font-display text-xl">{tr(lang, 'landing.customTitle')}</h2>
          <p className="text-slate-700">{tr(lang, 'landing.customDesc')}</p>
          <p className="text-sm mt-2 text-ocean-900">{lang === 'es' ? 'Ideal para familias y grupos pequeños con intereses distintos.' : 'Great for families and small groups with mixed interests.'}</p>
        </div>
      </section>

      <section className="tropical-card">
        <h3 className="font-display text-xl">{tr(lang, 'landing.transferTitle')}</h3>
        <p className="text-slate-700">{tr(lang, 'landing.transferDesc')}</p>
      </section>
    </div>
  );
}
