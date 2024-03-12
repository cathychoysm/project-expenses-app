import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, defaultValue: any) {
  const [value, setValue] = useState(() => {
    // use the value from local storage as the default value
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue !== null && localStorageValue !== "") {
      return JSON.parse(localStorageValue);
    }

    // if there is no value from local storage, use self-defined defaultValue as the default value
    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
