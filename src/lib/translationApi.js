const ENDPOINTS = [
  'https://api.langsby.com/v1/translate',
  'https://api.langsby.com/translate'
];

function parseTranslationResponse(json) {
  if (Array.isArray(json?.translations)) {
    return json.translations.map((t) => t?.text || t?.translation || '').filter(Boolean);
  }
  if (Array.isArray(json?.data?.translations)) {
    return json.data.translations.map((t) => t?.translatedText || t?.text || '').filter(Boolean);
  }
  if (Array.isArray(json?.translated)) return json.translated;
  if (typeof json?.translation === 'string') return [json.translation];
  return [];
}

export async function translateMany(texts, target = 'es', source = 'en') {
  const apiKey = import.meta.env.VITE_LANGSBY_API_KEY;
  if (!apiKey || !texts.length) return texts;

  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'X-API-Key': apiKey
        },
        body: JSON.stringify({
          source,
          target,
          text: texts,
          texts
        })
      });
      if (!res.ok) continue;
      const json = await res.json();
      const out = parseTranslationResponse(json);
      if (out.length === texts.length) return out;
      if (out.length) return texts.map((t, i) => out[i] || t);
    } catch {
      // try next endpoint
    }
  }

  return texts;
}
