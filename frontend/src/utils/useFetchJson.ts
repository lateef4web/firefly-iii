import { useEffect, useState } from 'react';

export function useFetchJson<T = unknown>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, [url]);

  return data;
}
