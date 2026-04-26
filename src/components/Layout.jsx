import { Link, NavLink } from 'react-router-dom';

export default function Layout({ children, lang, setLang }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-sand-50">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl text-ocean-900">Puerto Plata Tours</Link>
          <nav className="flex gap-4 text-sm">
            {['/tours', '/custom', '/transfers'].map((to) => (
              <NavLink key={to} to={to} className="hover:text-ocean-700">{to.replace('/', '') || 'home'}</NavLink>
            ))}
          </nav>
          <button className="btn-secondary" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>{lang.toUpperCase()}</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      <footer className="border-t bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex justify-between">
          <span>Local Puerto Plata guide • Cruise-friendly timing</span>
          <Link to="/admin" className="text-ocean-700">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
