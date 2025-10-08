import * as React from 'react';
import { cn } from '../../lib/utils';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  theme?: 'gray';
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      theme = '',
      containerClassName,
      labelClassName,
      errorClassName,
      required = true,
      ...props
    },
    ref
  ) => {
    const { t } = useLocalTranslation();
    return (
      <div className={cn('space-y-1', containerClassName, 'relative')}>
        {label && (
          <label
            className={cn('text-black dark:text-silver capitalize text-sm', labelClassName)}
          >
            {t(label)}
            {required && <span className="text-red">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'h-12 border-1 w-full rounded-md ps-2',
            error && 'border-destructive focus-visible:ring-destructive',
            className,
            'border-primary dark:text-white dark:border-silver read-only:bg-gray-50 read-only:border-primary-foreground bg-white dark:bg-dark'
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red">{t(error)}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
