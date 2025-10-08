import React from 'react';
import { ActionButtonProps } from '../../types';
import Icon from '../ui/icon';
import { useDarkMode } from '../../custom-hooks/useDarkMode';
// import useLocalTranslation from '../../custom-hooks/useLocalTranslation';

const ActionButton: React.FC<ActionButtonProps> = ({ action, onAction }) => {
  // const { t } = useLocalTranslation();
  const {isDark} = useDarkMode();
  return (
    <button
      onClick={() => onAction(action)}
      className="flex items-center gap-1"
    >
      <Icon name={action} color={action === 'Trash' ? 'red' : isDark ? 'var(--secondary)' : 'var(--primary)'}/>
    </button>
  );
};

export default ActionButton;
