import { useEffect, RefObject } from 'react';

type Callback = () => void;

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: Callback
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;
