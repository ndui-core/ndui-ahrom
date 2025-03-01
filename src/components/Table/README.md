# Table Component

A comprehensive table component with sorting, pagination, row selection, custom rendering, and responsive card view capabilities.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | Column[] | - | Array of column definitions |
| data | any[] | - | Array of data to display |
| title | string | - | Optional table title |
| loading | boolean | false | Loading state of the table |
| selection | 'single' \| 'multiple' \| 'none' | 'none' | Row selection mode |
| onSelectionChange | (selected: any[]) => void | - | Callback when selection changes |
| pagination | boolean | true | Enable/disable pagination |
| rowsPerPageOptions | number[] | [5, 10, 20, 50] | Available page size options |
| defaultRowsPerPage | number | 10 | Default number of rows per page |
| onRowClick | (row: any, index: number) => void | - | Callback when row is clicked |
| noDataMessage | string | 'No data available' | Message shown when no data |
| loadingMessage | string | 'Loading...' | Message shown when loading |
| defaultViewMode | 'table' \| 'card' | 'table' | Default view mode |

### Column Interface

```typescript
interface Column {
  name: string;
  field?: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  format?: (value: any) => React.ReactNode;
  render?: (row: any) => React.ReactNode;
  style?: React.CSSProperties;
  width?: number | string;
}
```

## Usage

```tsx
import { Table, Button } from 'ndui-ahrom';
import Link from 'next/link';

// Basic usage with custom rendering
const columns = [
  {
    name: "customer", 
    field: "request.user.name", 
    label: "نام مخاطب",
    render: (row) => row.request.user.name || "نامشخص"
  },
  {
    name: "status",
    field: "status",
    label: "Status",
    sortable: true
  },
  { 
    name: "actions", 
    label: "عملیات", 
    render: (row) => (
      <Link href={`/dashboard/invoices/${row.id}`}>
        <Button size="sm" variant="ghost">مشاهده</Button>
      </Link>
    )
  }
];

const data = [
  { id: 1, request: { user: { name: 'John Doe' } }, status: 'Active' },
  { id: 2, request: { user: { name: 'Jane Smith' } }, status: 'Pending' }
];

<Table
  columns={columns}
  data={data}
  title="Invoices"
/>

// With selection, pagination and card view
<Table
  columns={columns}
  data={data}
  title="Users"
  selection="multiple"
  onSelectionChange={(selected) => console.log('Selected:', selected)}
  pagination={true}
  defaultRowsPerPage={5}
  defaultViewMode="card"
/>
```

## Features

### Custom Column Rendering

You can use the `render` prop in a column definition to completely customize how a cell is rendered:

```tsx
{
  name: "actions",
  label: "Actions",
  render: (row) => (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => handleEdit(row)}>Edit</Button>
      <Button size="sm" variant="error" onClick={() => handleDelete(row)}>Delete</Button>
    </div>
  )
}
```

### Responsive Card View

The component provides a built-in toggle between table and card views, making it responsive for different screen sizes:

- Table view: Traditional tabular layout
- Card view: Each row is displayed as a card, with column labels and values stacked vertically

### Nested Data Access

You can access nested properties using dot notation in the `field` prop:

```tsx
{
  name: "customerName",
  field: "order.customer.name",
  label: "Customer Name"
}
```

### Advanced Features

- Column resizing
- Sorting
- Filtering
- Pagination
- Row selection (single/multiple)
- Expandable rows
- Loading states