import React from 'react';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { cn } from '../../lib/utils';
const RenderField: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ children, label, className = 'w-full' }) => {
  const { t } = useLocalTranslation();
  return (
    <div className={cn(className, 'flex flex-col gap-0.5')}>
      <label className="text-black">{t(label)}:</label>
      {children}
    </div>
  );
};

export default RenderField;
