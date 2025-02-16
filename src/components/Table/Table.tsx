import React, { useState, useMemo } from 'react';

export interface Column {
  name: string;
  field: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  format?: (value: any) => React.ReactNode;
  style?: React.CSSProperties;
}

export interface TableProps {
  columns: Column[];
  data: any[];
  title?: string;
  loading?: boolean;
  selection?: 'single' | 'multiple' | 'none';
  onSelectionChange?: (selected: any[]) => void;
  pagination?: boolean;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onRowClick?: (row: any, index: number) => void;
  noDataMessage?: string;
  loadingMessage?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  title,
  loading = false,
  selection = 'none',
  onSelectionChange,
  pagination = true,
  rowsPerPageOptions = [5, 10, 20, 50],
  defaultRowsPerPage = 10,
  onRowClick,
  noDataMessage = 'No data available',
  loadingMessage = 'Loading...',
}) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDesc, setSortDesc] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Handle sorting
  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (aValue === bValue) return 0;
      const comparison = aValue > bValue ? 1 : -1;
      return sortDesc ? -comparison : comparison;
    });
  }, [data, sortBy, sortDesc]);

  // Handle pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage, pagination]);

  // Handle selection
  const handleSelectAll = () => {
    const newSelected = selected.length === data.length ? [] : data;
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSelectRow = (row: any) => {
    let newSelected: any[];
    
    if (selection === 'single') {
      newSelected = [row];
    } else {
      const selectedIndex = selected.indexOf(row);
      if (selectedIndex === -1) {
        newSelected = [...selected, row];
      } else {
        newSelected = selected.filter((_, index) => index !== selectedIndex);
      }
    }
    
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const isSelected = (row: any) => selected.indexOf(row) !== -1;

  return (
    <div className="overflow-x-auto">
      {title && (
        <div className="p-4 font-bold text-lg">{title}</div>
      )}
      
      <table className="table w-full">
        <thead>
          <tr>
            {selection !== 'none' && (
              <th className="w-16">
                {selection === 'multiple' && (
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAll}
                  />
                )}
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.name}
                className={`${column.sortable ? 'cursor-pointer' : ''} ${
                  column.align ? `text-${column.align}` : ''
                }`}
                style={column.style}
                onClick={() => {
                  if (column.sortable) {
                    if (sortBy === column.field) {
                      setSortDesc(!sortDesc);
                    } else {
                      setSortBy(column.field);
                      setSortDesc(false);
                    }
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.sortable && sortBy === column.field && (
                    <span>{sortDesc ? '↓' : '↑'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selection !== 'none' ? 1 : 0)}
                className="text-center p-4"
              >
                {loadingMessage}
              </td>
            </tr>
          ) : paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selection !== 'none' ? 1 : 0)}
                className="text-center p-4"
              >
                {noDataMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-base-200' : ''}
                  ${isSelected(row) ? 'bg-base-200' : ''}
                `}
                onClick={() => {
                  onRowClick?.(row, rowIndex);
                  if (selection !== 'none') {
                    handleSelectRow(row);
                  }
                }}
              >
                {selection !== 'none' && (
                  <td>
                    <input
                      type={selection === 'multiple' ? 'checkbox' : 'radio'}
                      className={selection === 'multiple' ? 'checkbox' : 'radio'}
                      checked={isSelected(row)}
                      onChange={() => handleSelectRow(row)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.name}
                    className={column.align ? `text-${column.align}` : ''}
                    style={column.style}
                  >
                    {column.format
                      ? column.format(row[column.field])
                      : row[column.field]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && data.length > 0 && (
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              className="select select-bordered select-sm"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span>
              {(currentPage - 1) * rowsPerPage + 1}-
              {Math.min(currentPage * rowsPerPage, data.length)} of {data.length}
            </span>
            <div className="join">
              <button
                className="join-item btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                «
              </button>
              <button
                className="join-item btn btn-sm"
                disabled={currentPage * rowsPerPage >= data.length}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;