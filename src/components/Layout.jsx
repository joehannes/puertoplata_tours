import { Link, NavLink } from 'react-router-dom';
import { tr } from '../lib/i18n';

const items = [
  { to: '/tours', icon: '🧭', label: 'nav.tours' },
  { to: '/custom', icon: '🌴', label: 'nav.custom' },
  { to: '/transfers', icon: '🚐', label: 'nav.transfers' },
  { to: '/checkout', icon: '💳', label: 'nav.checkout' }
];

export default function Layout({ children, lang, setLang, settings }) {
  const wa = settings?.whatsappNumber || '18091234567';
  return (
    <div className="min-h-screen page-pattern">
      <header className="sticky top-0 z-20 bg-white/45 backdrop-blur-xl border-b border-white/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-display text-ocean-900 text-lg">⛵ Puerto Plata</Link>
          <nav className="flex gap-2">
            {items.map((item) => (
              <NavLink key={item.to} to={item.to} className="icon-pill" title={tr(lang, item.label)} aria-label={tr(lang, item.label)}>{item.icon}</NavLink>
            ))}
          </nav>
          <button className="btn-island !px-3 !py-1.5 text-sm" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>{lang.toUpperCase()}</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="mt-12 px-4 pb-8">
        <div className="max-w-6xl mx-auto tropical-card bg-white/45 backdrop-blur-xl">
          <div className="grid md:grid-cols-[90px_1fr_auto] gap-4 items-center">
            <div className="leaf-shape h-20 w-20 bg-gradient-to-br from-ocean-500 to-sunset-400 flex items-center justify-center text-3xl text-white">🧑🏽‍✈️</div>
            <div>
              <p className="font-display text-ocean-900">{settings?.guideName || 'Local Guide'}</p>
              <p className="text-sm text-slate-700">{settings?.guideYears || 10}+ {tr(lang, 'footer.years')}</p>
              <p className="text-sm text-slate-600">{settings?.guideBio || 'Trusted local host'} WhatsApp: +{wa}</p>
            </div>
            <div className="flex gap-2">
              <a className="btn-island text-sm" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">{tr(lang, 'common.whatsapp')}</a>
              <Link to="/admin" className="btn-sunset text-sm">{tr(lang, 'common.admin')}</Link>
            </div>
          </div>
          <p className="text-xs mt-3 text-slate-500">{tr(lang, 'footer.trust')}</p>
        </div>
      </footer>
    </div>
  );
}
