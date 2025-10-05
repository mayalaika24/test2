import { useAppSelector, useAppDispatch } from '../../custom-hooks/useRedux';
import { handleToggleSidebar } from '../../features/SidebarSlice';
import React from 'react';
import { ClassNameType } from '../../types';

const Switch: React.FC<ClassNameType> = ({ className = '' }) => {
  const isOpen = useAppSelector((state) => state.sidebar.value);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(handleToggleSidebar(!isOpen));
  };

  return (
    <button
      className={`transition-all duration-200 ${className} ${isOpen ? 'ltr:-right-6 rtl:-left-6' : 'rotate-180 ltr:-right-5 rtl:-left-5'}`}
      onClick={handleToggle}
    >
      <img src="/icons/round-arrow.svg" />
    </button>
  );
};

export default Switch;
