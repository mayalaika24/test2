import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  ColumnResizeMode,
  ColumnOrderState,
  VisibilityState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import React, { useState, useMemo } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { Action } from '../../types';
import TableActions from './table-actions';
import { cn } from '../../lib/utils';
const headerClass =
  'px-4 h-12 bg-gray-50 border-y-1 border-primary-foreground relative text-start no-wrap-text';
const containerClass =
  'bg-white shadow-table-shadow rounded-2xl flex flex-col max-h-full';
const innerClass = 'p-8 flex items-center justify-center';
interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  caption?: string;
  className?: string;
  actions: Array<Action>;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onAction: (params: { action: Action; data: TData }) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
}

export function DataTable<TData>({
  data,
  columns,
  caption,
  className = '',
  actions,
  pageSize = 10,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onAction,
  isLoading = false,
  isError = false,
  children,
  errorMessage = 'An error occurred',
}: DataTableProps<TData>) {
  const { t } = useLocalTranslation();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode,
  });

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const paginationButtons = useMemo(() => {
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      let pageNum;
      if (totalPages <= 5) {
        pageNum = i + 1;
      } else if (currentPage <= 3) {
        pageNum = i + 1;
      } else if (currentPage >= totalPages - 2) {
        pageNum = totalPages - 4 + i;
      } else {
        pageNum = currentPage - 2 + i;
      }

      return (
        <button
          key={pageNum}
          onClick={() => onPageChange?.(pageNum)}
          className={`w-8 h-8 rounded-md flex items-center justify-center ${
            currentPage === pageNum
              ? 'bg-[#F9F9F9] text-black'
              : 'hover:bg-gray-100'
          }`}
        >
          {pageNum}
        </button>
      );
    });
  }, [totalPages, currentPage]);

  if (isLoading) {
    return (
      <div className={cn(containerClass, className)}>
        {children}
        <div className={cn(innerClass)}>
          <ImSpinner9
            color="var(--primary)"
            className="animate-spin w-10 h-10"
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn(containerClass, className)}>
        {children}
        <div className={cn(innerClass, 'text-red')}>{errorMessage}</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white shadow-table-shadow rounded-2xl flex flex-col max-h-full ${className}`}
    >
      {children || <div className="h-10"></div>}
      <Table>
        {caption && (
          <caption className="text-left p-4 text-sm text-gray-500">
            {caption}
          </caption>
        )}

        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={headerClass}
                  style={{
                    width: 'max-content',
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
              <TableHead className={headerClass}>{t('actions')}</TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`
                      px-4 h-12 text-start
                      ${cell.column.id === 'id' ? 'font-medium' : ''}
                    `}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <TableActions
                    onAction={(action: Action) =>
                      onAction({ action, data: row.original })
                    }
                    actions={actions}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="text-center h-12"
              >
                {t('no_data')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="p-4 flex items-center md:justify-between justify-end">
        <span className='md:inline-block hidden'>
          {t('show')} {Math.min(pageSize, data.length)} {t('of')} {totalItems}{' '}
          {t('items')}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <img
              src="/icons/arrow-direction.svg"
              className="rtl:rotate-180"
              alt="Previous"
            />
          </button>

          <div className="flex items-center sm:gap-1 gap-0.5">
            {paginationButtons}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="mx-1">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => onPageChange?.(totalPages)}
                className={`sm:w-8 aspect-square w-6 rounded-md flex items-center justify-center ${
                  currentPage === totalPages
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <img
              src="/icons/arrow-direction.svg"
              alt="Next"
              className="ltr:rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
