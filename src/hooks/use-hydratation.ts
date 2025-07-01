// hooks/useHydration.ts
import { useEffect, useState } from 'react';

export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Executa apenas no client (evita hydration mismatch)
    setHydrated(true);
  }, []);

  return hydrated;
}
