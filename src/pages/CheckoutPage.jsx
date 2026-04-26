import { useEffect, useMemo, useRef, useState } from 'react';
import { cartTotal, clearCart, getCart, setCart } from '../lib/storage';
import { buildWhatsAppMessage, tr } from '../lib/i18n';

function loadPayPal(clientId, currency) {
  return new Promise((resolve, reject) => {
    if (window.paypal) return resolve(window.paypal);
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function CheckoutPage({ data, lang }) {
  const [cart, setCartState] = useState(() => getCart());
  const [paid, setPaid] = useState(false);
  const containerRef = useRef(null);
  const total = useMemo(() => cartTotal(cart), [cart]);

  const waUrl = useMemo(() => {
    if (!cart.length) return '#';
    const number = data.settings.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER;
    const text = buildWhatsAppMessage({ lang, items: cart, total });
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }, [cart, data.settings.whatsappNumber, lang, total]);

  useEffect(() => {
    let mounted = true;
    async function renderButtons() {
      const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
      if (!cart.length || !containerRef.current || !clientId) return;
      const paypal = await loadPayPal(clientId, data.settings.currency || 'USD');
      if (!mounted || !paypal) return;
      containerRef.current.innerHTML = '';
      paypal.Buttons({
        createOrder: (_d, actions) => actions.order.create({ purchase_units: [{ amount: { value: total.toFixed(2) } }] }),
        onApprove: async (_d, actions) => {
          await actions.order.capture();
          setPaid(true);
          setCart(cart.map((item) => ({ ...item, paid: true, paidAt: new Date().toISOString() })));
        }
      }).render(containerRef.current);
    }
    renderButtons();
    return () => { mounted = false; };
  }, [cart, data.settings.currency, total]);

  if (!cart.length) return <div className="card">{tr(lang, 'checkout.empty')}</div>;

  return (
    <div className="card space-y-4">
      <h1 className="font-heading text-3xl">{tr(lang, 'checkout.title')}</h1>
      <div className="space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="rounded-2xl p-3 bg-white/50 backdrop-blur border border-white/60">
            <p className="font-semibold">{tr(lang, 'checkout.item')}: {item.type === 'tour' ? item.title : (lang === 'es' ? 'Día Personalizado' : 'Custom Day')}</p>
            <p className="text-sm text-slate-600">${item.total} • {item.date || 'TBD'}</p>
          </div>
        ))}
      </div>
      <p>{tr(lang, 'checkout.total')}: <strong>${total}</strong></p>
      <div ref={containerRef} />
      <div className="flex gap-2 flex-wrap">
        {(paid || !import.meta.env.VITE_PAYPAL_CLIENT_ID) && <a className="btn-primary inline-block" href={waUrl} target="_blank" rel="noreferrer">{tr(lang, 'checkout.confirm')}</a>}
        <button className="btn-secondary" onClick={() => { clearCart(); setCartState([]); }}>{tr(lang, 'checkout.clear')}</button>
      </div>
    </div>
  );
}
