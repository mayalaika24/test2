export type Temp<R> = {
  action: IconName;
  data: R;
} | null;

// Updated useTempItem hook
import { useState } from 'react';
import { IconName } from '../components/ui/icon';

const useTempItem = <T,>(): {
  temp: Temp<T>;
  handleSetTemp: (el: Temp<T>) => void;
} => {
  const [temp, setTemp] = useState<Temp<T>>(null);

  const handleSetTemp = (el: Temp<T>) => {
    setTemp(el);
  };

  return { temp, handleSetTemp };
};

export default useTempItem;
