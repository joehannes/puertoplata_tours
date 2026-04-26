import { useEffect, useMemo, useState } from 'react';
import { defaultData } from '../data/defaultData';
import { getData, setData } from '../lib/storage';
import { loadRemoteData, saveRemoteData } from '../lib/api';
import { appDataSchema } from '../lib/schemas';

export function useAppData() {
  const [data, setDataState] = useState(() => getData(defaultData));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    loadRemoteData(defaultData).then((remote) => {
      if (!live) return;
      const parsed = appDataSchema.safeParse(remote);
      const next = parsed.success ? parsed.data : defaultData;
      setDataState(next);
      setData(next);
      setLoading(false);
    });
    return () => {
      live = false;
    };
  }, []);

  const updateData = async (next) => {
    setDataState(next);
    setData(next);
    await saveRemoteData(next);
  };

  return useMemo(() => ({ data, updateData, loading }), [data, loading]);
}
