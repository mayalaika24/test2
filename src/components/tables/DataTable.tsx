import React from 'react';
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
} from '@tanstack/react-table';
import useLocalTranslation from '../../custom-hooks/useLocalTranslation';
import { Action } from '../../types';
import TableActions from './table-actions';
import { cn } from '../../lib/utils';

const headerClass =
  'px-4 h-12 bg-gray-50 border-y-1 border-primary-foreground relative text-start no-wrap-text';
const containerClass =
  'bg-white shadow-table-shadow rounded-2xl flex flex-col max-h-full';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  caption?: string;
  className?: string;
  actions: Array<Action>;
  onAction: (params: { action: Action; data: TData }) => void;
  children?: React.ReactNode;
}

export function DataTable<TData>({
  data,
  columns,
  caption,
  className = '',
  actions,
  onAction,
  children,
}: DataTableProps<TData>) {
  const { t } = useLocalTranslation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn(containerClass, className)}>
      {children || <div className="h-10" />}

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
                <TableHead key={header.id} className={headerClass}>
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
                    className={`px-4 h-12 text-start ${
                      cell.column.id === 'id' ? 'font-medium' : ''
                    }`}
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
    </div>
  );
}
