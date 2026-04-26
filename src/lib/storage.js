const KEY = 'pptours_app';
const CART_KEY = 'pptours_cart';

export const readLocal = (k, fallback) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeLocal = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    // ignore
  }
};

export const getData = (fallback) => readLocal(KEY, fallback);
export const setData = (data) => writeLocal(KEY, data);

export const getCart = () => readLocal(CART_KEY, []);
export const setCart = (cartItems) => writeLocal(CART_KEY, cartItems);
export const addCartItem = (item) => {
  const current = getCart();
  const next = [...current, { ...item, id: `${Date.now()}_${Math.random().toString(16).slice(2)}` }];
  setCart(next);
  return next;
};
export const clearCart = () => setCart([]);
export const cartTotal = (items) => items.reduce((sum, item) => sum + (item.total || 0), 0);
