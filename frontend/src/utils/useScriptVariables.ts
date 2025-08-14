import { useEffect, useState } from 'react';

export function useScriptVariables<T = unknown>(modulePath: string): T | null {
  const [vars, setVars] = useState<T | null>(null);

  useEffect(() => {
    import(modulePath).then((mod) => {
      const value = mod as { default?: T } | T;
      setVars('default' in value ? value.default! : value);
    });
  }, [modulePath]);

  return vars;
}
