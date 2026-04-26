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
export const getCart = () => readLocal(CART_KEY, null);
export const setCart = (cart) => writeLocal(CART_KEY, cart);
