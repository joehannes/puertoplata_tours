# Puerto Plata Tours (Frontend-only)

Mobile-first React + Vite tourism storefront for Puerto Plata cruise visitors.

## Features
- Cart supports multiple services in localStorage and sends all items in one WhatsApp message.
- EN/ES UI copy system with language toggle persisted in cookies.
- Tropical Caribbean UI with translucent cards/buttons, blur, and green jungle background pattern.
- JSONBin content storage with localStorage fallback.
- Admin dashboard with real forms and auto Cloudinary upload -> URL attachment.
- PayPal checkout and bilingual WhatsApp booking message.

## Final JSON seed (use in JSONBin)
```json
{
  "tours": "Use src/data/defaultData.js tours array",
  "customOptions": "Use src/data/defaultData.js customOptions",
  "transfers": "Use src/data/defaultData.js transfers",
  "settings": "Use src/data/defaultData.js settings"
}
```

> Copy the full object from `src/data/defaultData.js` into your JSONBin record for production.

## Run
```bash
npm install
npm run dev
```

## Deploy
Static deploy on Cloudflare Pages (`npm run build`).
