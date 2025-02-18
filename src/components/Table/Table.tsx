import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

export interface Column {
  name: string;
  field: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  format?: (value: any) => React.ReactNode;
  style?: React.CSSProperties;
  width?: number | string;
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
  expandable?: boolean;
  renderExpandedRow?: (row: any) => React.ReactNode;
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
  expandable = false,
  renderExpandedRow
}) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDesc, setSortDesc] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});
  const tableRef = useRef<HTMLDivElement>(null);
  const resizingColumn = useRef<string | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  // Handle column resizing
  const handleResizeStart = (e: React.MouseEvent, columnName: string) => {
    e.preventDefault();
    resizingColumn.current = columnName;
    startX.current = e.pageX;
    startWidth.current = columnWidths[columnName] || 0;
    
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingColumn.current) return;
    
    const diff = e.pageX - startX.current;
    const newWidth = Math.max(50, startWidth.current + diff);
    
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn.current!]: newWidth
    }));
  };

  const handleResizeEnd = () => {
    resizingColumn.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  // Handle filtering
  const filteredData = useMemo(() => {
    return data.filter(row => {
      return Object.entries(filters).every(([field, value]) => {
        const cellValue = row[field]?.toString().toLowerCase();
        return !value || cellValue?.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  // Handle sorting
  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (aValue === bValue) return 0;
      const comparison = aValue > bValue ? 1 : -1;
      return sortDesc ? -comparison : comparison;
    });
  }, [filteredData, sortBy, sortDesc]);

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

  // Handle row expansion
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  return (
    <div className="overflow-x-auto" ref={tableRef} role="table" aria-label={title}>
      {title && (
        <div className="p-4 font-bold text-lg" role="heading" aria-level={1}>{title}</div>
      )}
      
      <div className="overflow-x-auto">
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
                      aria-label="Select all rows"
                    />
                  )}
                </th>
              )}
              {expandable && <th className="w-12"></th>}
              {columns.map((column) => (
                <th
                  key={column.name}
                  className={`
                    ${column.sortable ? 'cursor-pointer' : ''} 
                    ${column.align ? `text-${column.align}` : ''}
                    relative
                  `}
                  style={{ 
                    width: columnWidths[column.name] || column.width,
                    minWidth: '100px'
                  }}
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
                  role="columnheader"
                  aria-sort={
                    sortBy === column.field 
                      ? sortDesc ? 'descending' : 'ascending'
                      : 'none'
                  }
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortBy === column.field && (
                      <span aria-hidden="true">{sortDesc ? '↓' : '↑'}</span>
                    )}
                  </div>
                  {column.filterable && (
                    <Input
                      placeholder={`Filter ${column.label}`}
                      value={filters[column.field] || ''}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        [column.field]: e.target.value
                      }))}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Filter ${column.label}`}
                      size="xs"
                      className="mt-2 w-full"
                    />
                  )}
                  <div
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
                    onMouseDown={(e) => handleResizeStart(e, column.name)}
                    role="separator"
                    aria-orientation="vertical"
                  />
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selection !== 'none' ? 1 : 0) + (expandable ? 1 : 0)}
                  className="text-center p-4"
                  role="status"
                >
                  {loadingMessage}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selection !== 'none' ? 1 : 0) + (expandable ? 1 : 0)}
                  className="text-center p-4"
                >
                  {noDataMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr
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
                    role="row"
                    aria-selected={isSelected(row)}
                  >
                    {selection !== 'none' && (
                      <td role="cell">
                        <input
                          type={selection === 'multiple' ? 'checkbox' : 'radio'}
                          className={selection === 'multiple' ? 'checkbox' : 'radio'}
                          checked={isSelected(row)}
                          onChange={() => handleSelectRow(row)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {expandable && (
                      <td role="cell">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRowExpansion(row.id);
                          }}
                          aria-expanded={expandedRows.includes(row.id)}
                          aria-label={`Expand row ${rowIndex + 1}`}
                        >
                          {expandedRows.includes(row.id) ? '▼' : '▶'}
                        </Button>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.name}
                        className={column.align ? `text-${column.align}` : ''}
                        style={{ 
                          width: columnWidths[column.name] || column.width,
                          ...column.style 
                        }}
                        role="cell"
                      >
                        {column.format
                          ? column.format(row[column.field])
                          : row[column.field]}
                      </td>
                    ))}
                  </tr>
                  {expandable && expandedRows.includes(row.id) && (
                    <tr>
                      <td 
                        colSpan={columns.length + (selection !== 'none' ? 1 : 0) + 1}
                        className="p-4 bg-base-100"
                      >
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {renderExpandedRow?.(row)}
                          </motion.div>
                        </AnimatePresence>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && data.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              options={rowsPerPageOptions.map(option => ({
                value: option.toString(),
                label: option.toString()
              }))}
              value={rowsPerPage.toString()}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              size="sm"
              className="w-24"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span>
              {(currentPage - 1) * rowsPerPage + 1}-
              {Math.min(currentPage * rowsPerPage, data.length)} of {data.length}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-label="Previous page"
              >
                «
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={currentPage * rowsPerPage >= data.length}
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next page"
              >
                »
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;