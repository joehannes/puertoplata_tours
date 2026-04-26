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
  const [showPayPal, setShowPayPal] = useState(false);
  const containerRef = useRef(null);

  const safeCart = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);
  const total = useMemo(() => cartTotal(safeCart), [safeCart]);

  const waUrl = useMemo(() => {
    if (!safeCart.length) return '#';
    const number = data.settings.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER;
    const text = buildWhatsAppMessage({ lang, items: safeCart, total });
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }, [safeCart, data.settings.whatsappNumber, lang, total]);

  useEffect(() => {
    let mounted = true;
    async function renderButtons() {
      const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
      if (!safeCart.length || !containerRef.current || !clientId || !showPayPal) return;

      const paypal = await loadPayPal(clientId, data.settings.currency || 'USD');
      if (!mounted || !paypal) return;

      const payeeEmail = data.settings.paypalEmail || import.meta.env.VITE_PAYPAL_EMAIL;
      containerRef.current.innerHTML = '';
      paypal.Buttons({
        createOrder: (_d, actions) => actions.order.create({
          purchase_units: [{
            amount: { value: total.toFixed(2) },
            ...(payeeEmail ? { payee: { email_address: payeeEmail } } : {})
          }]
        }),
        onApprove: async (_d, actions) => {
          await actions.order.capture();
          const paidCart = safeCart.map((item) => ({ ...item, paid: true, paidAt: new Date().toISOString() }));
          setPaid(true);
          setCart(paidCart);
          setCartState(paidCart);
        }
      }).render(containerRef.current);
    }

    renderButtons();
    return () => { mounted = false; };
  }, [safeCart, data.settings.currency, data.settings.paypalEmail, total, showPayPal]);

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
        <button className="btn-sunset" onClick={() => setShowPayPal((v) => !v)}>{tr(lang, 'checkout.paypal')}</button>
        <button className="btn-secondary" onClick={() => { clearCart(); setCartState([]); }}>{tr(lang, 'checkout.clear')}</button>
      </div>

      {showPayPal && import.meta.env.VITE_PAYPAL_CLIENT_ID && <div ref={containerRef} />}
      {paid && <p className="text-green-700 text-sm">{lang === 'es' ? 'Pago recibido. Ahora confirma por WhatsApp.' : 'Payment received. Now confirm on WhatsApp.'}</p>}
    </div>
  );
}
