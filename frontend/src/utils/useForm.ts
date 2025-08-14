import { useState } from 'react';

export interface FormHandlers<T> {
  values: T;
  handleChange: (field: keyof T, value: T[keyof T]) => void;
  reset: () => void;
}

export function useForm<T extends Record<string, unknown>>(initialValues: T): FormHandlers<T> {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange(field: keyof T, value: T[keyof T]) {
    setValues(prev => ({ ...prev, [field]: value }));
  }

  function reset() {
    setValues(initialValues);
  }

  return { values, handleChange, reset };
}
