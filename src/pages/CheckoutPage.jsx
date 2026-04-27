import { useMemo, useState } from 'react';
import { cartTotal, clearCart, getCart } from '../lib/storage';
import { buildWhatsAppMessage, tr } from '../lib/i18n';

export default function CheckoutPage({ data, lang }) {
  const [cart, setCartState] = useState(() => getCart());
  const safeCart = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);
  const total = useMemo(() => cartTotal(safeCart), [safeCart]);

  const waUrl = useMemo(() => {
    if (!safeCart.length) return '#';
    const number = data.settings.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER;
    const text = buildWhatsAppMessage({ lang, items: safeCart, total });
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }, [safeCart, data.settings.whatsappNumber, lang, total]);

  const paypalMeUrl = useMemo(() => {
    const username = data.settings.paypalMeUsername || 'ownerusername';
    return `https://paypal.me/${username}/${Number(total || 0).toFixed(2)}`;
  }, [data.settings.paypalMeUsername, total]);

  if (!safeCart.length) return <div className="card">{tr(lang, 'checkout.empty')}</div>;

  return (
    <div className="card space-y-4">
      <h1 className="font-heading text-3xl">{tr(lang, 'checkout.title')}</h1>
      <div className="space-y-2">
        {safeCart.map((item) => (
          <div key={item.id} className="rounded-2xl p-3 bg-white/50 backdrop-blur border border-white/60">
            <p className="font-semibold">{tr(lang, 'checkout.item')}: {item.type === 'tour' ? item.title : (lang === 'es' ? 'Día Personalizado' : 'Custom Day')}</p>
            <p className="text-sm text-slate-600">${item.total} • {item.date || 'TBD'}</p>
          </div>
        ))}
      </div>
      <p>{tr(lang, 'checkout.total')}: <strong>${total}</strong></p>

      <div className="flex gap-2 flex-wrap">
        <a className="btn-primary inline-block" href={waUrl} target="_blank" rel="noreferrer">{tr(lang, 'checkout.confirm')}</a>
        <a className="btn-sunset inline-block" href={paypalMeUrl} target="_blank" rel="noreferrer">{tr(lang, 'checkout.paypal')}</a>
        <button className="btn-secondary" onClick={() => { clearCart(); setCartState([]); }}>{tr(lang, 'checkout.clear')}</button>
      </div>
    </div>
  );
}
