import React from 'react';
import { ActionsProps } from '../../types';
import ActionButton from '../buttons/Action';
import { IconName } from '../ui/icon';

const TableActions: React.FC<ActionsProps> = ({ actions, onAction }) => {
  return (
    <div className="w-max flex items-center gap-4">
      {actions.map((action: IconName, i: number) => (
        <ActionButton onAction={onAction} action={action} key={i} />
      ))}
    </div>
  );
};

export default TableActions;
