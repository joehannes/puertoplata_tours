import { useEffect, useMemo, useState } from 'react';
import { translateMany } from '../lib/translationApi';

const CACHE_KEY = 'pptours_rt_es';

const getCache = () => {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; }
};
const setCache = (cache) => {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch { /* ignore */ }
};

export function useTranslatedCatalog(data, lang) {
  const [translated, setTranslated] = useState(null);

  useEffect(() => {
    let active = true;
    if (lang !== 'es') {
      setTranslated(null);
      return;
    }

    async function run() {
      const cache = getCache();
      const keys = [];
      const values = [];

      data.tours.forEach((tour) => {
        [['title', tour.title], ['shortDescription', tour.shortDescription], ['description', tour.description]].forEach(([field, txt]) => {
          const k = `tour.${tour.id}.${field}`;
          keys.push(k);
          values.push(cache[k] || txt);
        });
      });
      data.transfers.forEach((tr) => {
        [['title', tr.title], ['description', tr.description]].forEach(([field, txt]) => {
          const k = `transfer.${tr.id}.${field}`;
          keys.push(k);
          values.push(cache[k] || txt);
        });
      });

      const missingIdx = keys.map((k, i) => (cache[k] ? -1 : i)).filter((i) => i >= 0);
      if (missingIdx.length) {
        const translatedMissing = await translateMany(missingIdx.map((i) => values[i]), 'es', 'en');
        missingIdx.forEach((idx, j) => {
          cache[keys[idx]] = translatedMissing[j] || values[idx];
          values[idx] = cache[keys[idx]];
        });
        setCache(cache);
      }

      const clone = structuredClone(data);
      clone.tours = clone.tours.map((tour) => ({
        ...tour,
        title: cache[`tour.${tour.id}.title`] || tour.title,
        shortDescription: cache[`tour.${tour.id}.shortDescription`] || tour.shortDescription,
        description: cache[`tour.${tour.id}.description`] || tour.description
      }));
      clone.transfers = clone.transfers.map((tr) => ({
        ...tr,
        title: cache[`transfer.${tr.id}.title`] || tr.title,
        description: cache[`transfer.${tr.id}.description`] || tr.description
      }));

      if (active) setTranslated(clone);
    }

    run();
    return () => { active = false; };
  }, [data, lang]);

  return useMemo(() => (lang === 'es' ? translated || data : data), [lang, translated, data]);
}
