# Table Component

A comprehensive table component with sorting, pagination, and row selection capabilities.

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

### Column Interface

```typescript
interface Column {
  name: string;
  field: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  format?: (value: any) => React.ReactNode;
  style?: React.CSSProperties;
}
```

## Usage

```tsx
import { Table } from 'ndui-ahrom';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    sortable: true
  },
  {
    name: 'age',
    field: 'age',
    label: 'Age',
    sortable: true,
    align: 'right'
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    format: (value) => <a href={`mailto:${value}`}>{value}</a>
  }
];

const data = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' }
];

// Basic usage
<Table
  columns={columns}
  data={data}
/>

// With selection and pagination
<Table
  columns={columns}
  data={data}
  title="Users"
  selection="multiple"
  onSelectionChange={(selected) => console.log('Selected:', selected)}
  pagination={true}
  defaultRowsPerPage={5}
/>
```