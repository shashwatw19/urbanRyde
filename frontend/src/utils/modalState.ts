export const saveModalState = (key: string, value: boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getModalState = (key: string, defaultValue = false): boolean => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};