import React, { useState } from 'react';
import Label from './label';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { PiSpinner } from 'react-icons/pi';
import { SlArrowDown } from 'react-icons/sl';
import SearchInput from './search-input';
import { OptionType } from '../../types';
import { InView } from 'react-intersection-observer';
import LinearLoader from './linear-loader';
import { cn } from '../../lib/utils';
import ValidationField from './validation-field';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Select: React.FC<{
  options: Array<any>;
  label: string;
  onSelect: (val: number | string) => void;
  loading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  onSearch?: (val: string) => void;
  value?: number | string;
  paginate?: boolean;
  isSearch?: boolean;
  error?: string;
  defaultValue?: string;
  required?: boolean;
}> = ({
  options,
  label,
  onSelect,
  loading = false,
  hasNextPage = false,
  fetchNextPage = () => {},
  onSearch = () => {},
  paginate = false,
  isSearch = false,
  error,
  defaultValue = '',
  required = true,
}) => {
  const { t } = useLocalTranslation();
  const [selected, setSelected] = useState<OptionType>();
  const [open, setOpen] = useState(false);

  function handleSelect(option: OptionType) {
    setSelected(option);
    onSelect(option.id);
    setOpen(false); // Close the dropdown after selection
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="w-full">
          <div className="flex">
            <Label className="text-start" label={t(label)} />
            {required && <span className="text-red"> *</span>}
          </div>
          <div className="h-12 w-full border-1 border-primary rounded-md flex items-center justify-between ps-2 pe-4 cursor-pointer">
            <span className="text-sm text-black">
              {(selected && selected.name) || defaultValue}
            </span>
            {loading ? (
              <PiSpinner className="animate-spin" color={'var(--primary)'} />
            ) : (
              <SlArrowDown color={'var(--primary)'} />
            )}
          </div>
          {error && (
            <ValidationField errorClassName="text-start" error={error} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full sm:max-w-[420px] max-w-[300px] pt-3"
        onInteractOutside={() => setOpen(false)}
      >
        {paginate && isSearch && (
          <div className="px-4">
            <SearchInput className="w-full" onSearch={(val) => onSearch(val)} />
          </div>
        )}
        <div
          className={cn(
            'max-h-[200px] overflow-y-auto overscroll-contain px-2',
            isSearch ? 'mt-2' : ''
          )}
        >
          {options.map((option, i) => {
            return (
              <button
                onClick={() => handleSelect(option)}
                className="w-full py-2 hover:bg-alice-blue rounded-sm text-start px-3 text-black"
                key={i}
              >
                {option.name}
              </button>
            );
          })}
          {options.length === 0 && !loading && (
            <p className="text-center py-2 text-sm">{t('no_data')}</p>
          )}
          {loading && <LinearLoader />}
          {paginate && (
            <InView
              as="div"
              style={{ height: '1px' }}
              onChange={(inView) => {
                if (inView && hasNextPage && !loading) {
                  fetchNextPage();
                }
              }}
            >
              <div style={{ height: '1px' }}></div>
            </InView>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Select;
