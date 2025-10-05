import { useState } from 'react';
const useToggleBoolean = (
  initialState: boolean = false
): {
  value: boolean;
  handleToggle: VoidFunction;
  handleSetValue: (val: boolean) => void;
} => {
  const [value, setValue] = useState<boolean>(initialState);

  const handleToggle = (): void => {
    setValue((prevState) => !prevState);
  };
  const handleSetValue = (val: boolean): void => {
    setValue(val);
  };
  return { value, handleToggle, handleSetValue };
};

export default useToggleBoolean;
