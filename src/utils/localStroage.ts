const saveToLocalStorage = ({ key, value }: { key: string; value: string }) => {
  localStorage.setItem(key, value);
};

const getDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export { saveToLocalStorage, getDataFromLocalStorage };
