import { useEffect, useState } from 'react';

const useStateWithLocalStorage = (localStorageKey, initialValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || initialValue,
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
};

export default useStateWithLocalStorage;
