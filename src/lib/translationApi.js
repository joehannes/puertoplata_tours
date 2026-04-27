const ENDPOINT = 'https://api.langbly.com/language/translate/v2';

function readTranslatedText(json) {
  if (Array.isArray(json?.data?.translations)) {
    return json.data.translations.map((x) => x?.translatedText || '').filter(Boolean);
  }
  if (typeof json?.data?.translatedText === 'string') return [json.data.translatedText];
  return [];
}

async function translateOne(text, target, apiKey) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ q: text, target })
  });
  if (!res.ok) throw new Error('Langbly request failed');
  const json = await res.json();
  const translated = readTranslatedText(json)[0];
  return translated || text;
}

export async function translateMany(texts, target = 'es') {
  const apiKey = import.meta.env.VITE_LANGBLY_API_KEY || import.meta.env.VITE_LANGSBY_API_KEY;
  if (!apiKey || !Array.isArray(texts) || !texts.length) return texts;

  const out = [];
  for (const text of texts) {
    try {
      out.push(await translateOne(text, target, apiKey));
    } catch {
      out.push(text);
    }
  }
  return out;
}
