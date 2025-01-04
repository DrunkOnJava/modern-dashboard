import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
}

export function DataTable<T>({ 
  data, 
  columns, 
  sortColumn, 
  sortDirection, 
  onSort 
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 transition-colors duration-200">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-6 py-3 ${column.width || ''} ${
                  onSort ? 'cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200' : ''
                }`}
                onClick={() => onSort?.(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {sortColumn === column.key && (
                    sortDirection === 'asc' ? 
                      <ArrowUp className="w-4 h-4" /> : 
                      <ArrowDown className="w-4 h-4" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={index}
              className="border-b border-gray-100 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 
                hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              {columns.map((column) => (
                <td 
                  key={String(column.key)} 
                  className="px-6 py-4 text-gray-700 dark:text-gray-300"
                >
                  {column.render 
                    ? column.render(item[column.key], item)
                    : String(item[column.key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}