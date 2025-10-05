import React from 'react';
import { ChildrenType } from '../types';

const TableLayout: React.FC<ChildrenType> = ({ children }) => {
  return <div className="h-full">{children}</div>;
};

export default TableLayout;
