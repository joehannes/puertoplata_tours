import { useEffect, useMemo, useRef, useState } from 'react';
import { getCart, setCart } from '../lib/storage';
import { buildWhatsAppMessage } from '../lib/i18n';

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
  const [cart] = useState(() => getCart());
  const [paid, setPaid] = useState(false);
  const containerRef = useRef(null);

  const waUrl = useMemo(() => {
    if (!cart) return '#';
    const number = data.settings.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER;
    const text = buildWhatsAppMessage({ lang, booking: cart });
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }, [cart, data.settings.whatsappNumber, lang]);

  useEffect(() => {
    let mounted = true;
    async function renderButtons() {
      const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
      if (!cart || !containerRef.current || !clientId) return;
      const paypal = await loadPayPal(clientId, data.settings.currency || 'USD');
      if (!mounted || !paypal) return;
      containerRef.current.innerHTML = '';
      paypal.Buttons({
        createOrder: (_d, actions) => actions.order.create({ purchase_units: [{ amount: { value: cart.total.toFixed(2) } }] }),
        onApprove: async (_d, actions) => {
          await actions.order.capture();
          setPaid(true);
          setCart({ ...cart, paid: true, paidAt: new Date().toISOString() });
        }
      }).render(containerRef.current);
    }
    renderButtons();
    return () => { mounted = false; };
  }, [cart, data.settings.currency]);

  if (!cart) return <div className="card">No active booking in session.</div>;

  return (
    <div className="card space-y-4">
      <h1 className="font-heading text-3xl">Checkout</h1>
      <p>Total: <strong>${cart.total}</strong></p>
      <div ref={containerRef} />
      {(paid || !import.meta.env.VITE_PAYPAL_CLIENT_ID) && <a className="btn-primary inline-block" href={waUrl} target="_blank" rel="noreferrer">Confirm on WhatsApp</a>}
    </div>
  );
}
