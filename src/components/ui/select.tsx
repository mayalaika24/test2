import React, { useState } from 'react';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { PiSpinner } from 'react-icons/pi';
import { SlArrowDown } from 'react-icons/sl';
import { cn } from '../../lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { OptionType } from '../../types';

const Select: React.FC<{
  options: Array<any>;
  label: string;
  onSelect: (val: string) => void;
  value?: number | string;
  error?: string;
  defaultValue?: string;
  required?: boolean;
}> = ({
  options,
  label,
  onSelect,
  error,
  defaultValue = '',
  required = true,
}) => {
  const { t } = useLocalTranslation();
  const [selected, setSelected] = useState<OptionType<string>>();
  const [open, setOpen] = useState(false);

  function handleSelect(option: OptionType<string>) {
    setSelected(option);
    onSelect(option.id);
    setOpen(false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="w-full">
          <div className="flex">
            <label className='text-black dark:text-white dark:border-silver'>{t(label)}</label>
            {required && <span className="text-red"> *</span>}
          </div>
          <div className="h-12 w-full bg-white dark:border-silver dark:bg-dark border-1 border-primary rounded-md flex items-center justify-between ps-2 pe-4 cursor-pointer">
            <span className="text-sm text-black dark:text-white dark:border-silver">
              {(selected && selected.name) || defaultValue}
            </span>
          </div>
          {error && <span className="text-xs text-red">{t(error)}</span>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full sm:max-w-[420px] max-w-[300px] pt-3 dark:bg-dark"
        onInteractOutside={() => setOpen(false)}
      >
        <div
          className={cn(
            'max-h-[200px] overflow-y-auto overscroll-contain px-2'
          )}
        >
          {options.map((option, i) => {
            return (
              <button
                onClick={() => handleSelect(option)}
                className="w-full py-2 hover:bg-alice-blue dark:hover:bg-[rgba(255,255,255,0.2)] rounded-sm text-start px-3 text-black dark:text-silver"
                key={i}
              >
                {option.name}
              </button>
            );
          })}
          {options.length === 0 && (
            <p className="text-center py-2 text-sm">{t('no_data')}</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Select;
