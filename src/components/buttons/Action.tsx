import React from 'react';
import { ActionButtonProps } from '../../types';
// import useLocalTranslation from '../../custom-hooks/useLocalTranslation';

const ActionButton: React.FC<ActionButtonProps> = ({ action, onAction }) => {
  // const { t } = useLocalTranslation();
  return (
    <button
      onClick={() => onAction(action)}
      className="flex items-center gap-1"
    >
      <img src={`/icons/${action}.svg`} className="w-6 h-6" />
      <span
        className={`mt-1 ${action === 'delete' ? 'text-red' : 'text-secondary'}`}
      >
        {/* {t(action)} */}
      </span>
    </button>
  );
};

export default ActionButton;
