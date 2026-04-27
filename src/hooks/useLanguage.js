import { useEffect, useState } from 'react';

const getCookie = (name) =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

export function useLanguage() {
  const [lang, setLang] = useState(() => getCookie('ppt_lang') || 'en');

  useEffect(() => {
    document.cookie = `ppt_lang=${lang};path=/;max-age=31536000`;
  }, [lang]);

  return { lang, setLang };
}
