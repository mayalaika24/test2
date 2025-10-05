import React from 'react';
import { ClassNameType } from '../../types';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { cn } from '../../lib/utils';
const TableHeader: React.FC<
  { title: string } & ClassNameType & { children?: React.ReactNode }
> = ({ title, children, className = 'mb-6' }) => {
  const { t } = useLocalTranslation();
  return (
    <div
      className={cn('flex items-center justify-between px-4 pt-6', className)}
    >
      <h2 className="lg:text-[22px] md:text-lg font-semibold">{t(title)}</h2>
      {children}
    </div>
  );
};

export default TableHeader;
