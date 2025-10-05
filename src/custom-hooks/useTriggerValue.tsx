import { useState } from 'react';

const useTriggerValue = (): {
  value: number;
  handleTriggerValue: VoidFunction;
} => {
  const [value, setValue] = useState<number>(1);
  const handleTriggerValue = () => {
    setValue((prevState) => prevState + 1);
  };
  return { value, handleTriggerValue };
};

export default useTriggerValue;
