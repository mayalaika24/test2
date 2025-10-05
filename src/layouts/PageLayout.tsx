import React from 'react';
import { ChildrenType } from '../types';
import { cn } from '../lib/utils';
import Loader from '../components/ui/Loader';
const PageLayout: React.FC<
  ChildrenType & {
    header: string;
    footer?: React.ReactNode;
    subTitle?: React.ReactNode;
    loading?: boolean;
  }
> = ({ header, children, footer, subTitle = null, loading = false }) => {
  return (
    <div className="bg-white py-4 rounded-2xl shadow-table-shadow h-full flex flex-col">
      <div className={cn('flex items-center pb-4 border-b px-6 w-full')}>
        <h2
          className={cn(
            'font-semibold text-xl',
            !subTitle ? 'w-full text-center' : 'flex-1'
          )}
        >
          {header}
        </h2>
        {subTitle}
      </div>
      <div
        className={cn(
          'flex-1 overflow-y-auto px-6 py-2',
          footer ? 'border-b' : ''
        )}
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          children
        )}
      </div>
      {footer && footer}
    </div>
  );
};

export default PageLayout;
