import React from 'react';
import { ImSpinner9 } from 'react-icons/im';

const Loader: React.FC = () => {
  return (
    <div className="p-8 flex items-center justify-center w-full">
      <ImSpinner9 color="var(--primary)" className="animate-spin w-10 h-10" />
    </div>
  );
};

export default Loader;
