import React from 'react';
import { Action, ActionsProps } from '../../types';
import ActionButton from '../buttons/Action';

const TableActions: React.FC<ActionsProps> = ({ actions, onAction }) => {
  return (
    <div className="w-max flex items-center gap-4">
      {actions.map((action: Action, i: number) => (
        <ActionButton onAction={onAction} action={action} key={i} />
      ))}
    </div>
  );
};

export default TableActions;
