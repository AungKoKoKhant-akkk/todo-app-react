import { useEffect, useState } from 'react';

/**
 * Custom hook to sync state with localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - initial value if nothing in localStorage
 */
export const useLocalStorage = (key, initialValue) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
    setIsFirstRender(false);
  }, [key]);

  // Save to localStorage whenever value changes
  const saveToLocalStorage = (value) => {
    if (!isFirstRender) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return { saveToLocalStorage };
};
