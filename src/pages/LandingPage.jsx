import { Link } from 'react-router-dom';
import { tr } from '../lib/i18n';

const heroImages = [
  'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80',
  'https://images.pexels.com/photos/1732278/pexels-photo-1732278.jpeg?auto=compress&cs=tinysrgb&w=1000',
  'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=80'
];

export default function LandingPage({ lang, data }) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden p-5 pb-16 md:p-8 md:pb-20 wave-top text-white backdrop-blur-md rounded-[2rem]">
        <div className="relative z-10 max-w-xl space-y-4">
          <p className="uppercase text-xs tracking-[0.25em] text-white/80">{tr(lang, 'landing.heroTag')}</p>
          <h1 className="font-heading text-4xl leading-tight">{tr(lang, 'landing.heroTitle')}</h1>
          <p className="text-white/90">{tr(lang, 'landing.hoursWarning')} {tr(lang, 'landing.heroSub')}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-sunset" to="/tours">🧭 {tr(lang, 'landing.exploreTours')}</Link>
            <Link className="btn-island" to="/custom">🌴 {tr(lang, 'landing.planMyDay')}</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {heroImages.map((img, i) => (
          <img key={img} src={img} alt="Puerto Plata experience" className={`h-36 w-full object-cover image-widget ${i % 2 ? 'shell-shape' : 'leaf-shape'}`} />
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
