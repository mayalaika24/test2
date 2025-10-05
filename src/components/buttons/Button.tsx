import React from 'react';
import { ButtonType } from '../../types';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { cn } from '../../lib/utils';
import { ImSpinner9 } from 'react-icons/im';
const Button: React.FC<
  ButtonType & { primary?: boolean } & { secondary?: boolean }
> = ({
  text,
  onClick = () => {},
  loading = false,
  className = '',
  type = 'button',
  primary = true,
  secondary = false,
}) => {
  const { t } = useLocalTranslation();
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={cn(
        'rounded-sm lg:px-4 px-2 h-12 capitalize lg:min-w-[160px] min-w-[100px] md:text-base text-sm flex items-center justify-center',
        primary ? 'bg-primary text-white' : '',
        secondary ? 'bg-primary-foreground text-black' : '',
        className
      )}
    >
      {loading ? (
        <ImSpinner9 color="white" className="animate-spin" />
      ) : (
        t(text)
      )}
    </button>
  );
};

export default Button;
