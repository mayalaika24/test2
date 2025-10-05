import React from 'react';
import { ChildrenType, ClassNameType } from '../types';
import { cn } from '../lib/utils';

const FormLayout: React.FC<ChildrenType & ClassNameType> = ({
  children,
  className = 'grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2',
}) => {
  return <div className={cn(className)}>{children}</div>;
};

export default FormLayout;
