import React, { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
  filter?: boolean;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  flex?: number;
  width?: number;
  cellRenderer?: React.ComponentType<any>;
}

interface DataGridProps {
  columns: Column[];
  rows: any[];
  pageSize?: number;
  selection?: 'single' | 'multiple' | 'none';
  onSelectionChange?: (selected: any[]) => void;
  loading?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

const DataGrid: React.FC<DataGridProps> = ({
  columns,
  rows,
  pageSize = 10,
  selection = 'none',
  onSelectionChange,
  loading = false,
  className = '',
  theme = 'light'
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchText, setSearchText] = useState('');

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }, []);

  const onFilterTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    gridApi?.setQuickFilter(value);
  }, [gridApi]);

  const handleSelectionChanged = useCallback(() => {
    if (onSelectionChange) {
      const selectedRows = gridApi?.getSelectedRows();
      onSelectionChange(selectedRows);
    }
  }, [gridApi, onSelectionChange]);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={onFilterTextChange}
          className="max-w-xs"
        />
        <Select
          options={[
            { value: '10', label: '10 per page' },
            { value: '25', label: '25 per page' },
            { value: '50', label: '50 per page' }
          ]}
          value={pageSize.toString()}
          onChange={(e) => gridApi?.paginationSetPageSize(Number(e.target.value))}
          className="max-w-xs"
        />
      </div>

      <div 
        className={`ag-theme-alpine${theme === 'dark' ? '-dark' : ''} w-full h-[600px]`}
      >
        <AgGridReact
          rowData={rows}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={pageSize}
          rowSelection={selection === 'none' ? undefined : selection}
          onGridReady={onGridReady}
          onSelectionChanged={handleSelectionChanged}
          overlayLoadingTemplate={
            '<span class="loading loading-spinner loading-lg"></span>'
          }
          overlayNoRowsTemplate={
            '<span class="text-base-content/70">No rows to show</span>'
          }
        />
      </div>
    </div>
  );
};

export default DataGrid;