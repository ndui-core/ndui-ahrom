# DataGrid Component

## English

A powerful data grid component with features like sorting, filtering, pagination, and row selection.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | Column[] | - | Column definitions |
| rows | any[] | - | Data rows |
| pageSize | number | 10 | Rows per page |
| selection | 'single' \| 'multiple' \| 'none' | 'none' | Row selection mode |
| onSelectionChange | (selected: any[]) => void | - | Selection change callback |
| loading | boolean | false | Loading state |
| className | string | '' | Additional CSS classes |
| theme | 'light' \| 'dark' | 'light' | Grid theme |

### Column Interface

```typescript
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
```

### Features

- Advanced sorting and filtering
- Pagination
- Row selection
- Column resizing
- Search functionality
- Responsive design
- Light/dark themes
- Custom cell rendering
- Loading states

### Usage

```tsx
import { DataGrid } from 'your-library';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    cellRenderer: ActionButtons,
    sortable: false,
    filter: false
  }
];

const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Basic usage
<DataGrid
  columns={columns}
  rows={rows}
/>

// With selection and custom page size
<DataGrid
  columns={columns}
  rows={rows}
  selection="multiple"
  pageSize={25}
  onSelectionChange={(selected) => console.log('Selected:', selected)}
/>

// Dark theme
<DataGrid
  columns={columns}
  rows={rows}
  theme="dark"
/>
```

## فارسی

کامپوننت جدول داده قدرتمند با ویژگی‌هایی مانند مرتب‌سازی، فیلتر، صفحه‌بندی و انتخاب ردیف.

### پراپ‌ها

| پراپ | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| columns | Column[] | - | تعریف ستون‌ها |
| rows | any[] | - | ردیف‌های داده |
| pageSize | number | 10 | تعداد ردیف در هر صفحه |
| selection | 'single' \| 'multiple' \| 'none' | 'none' | حالت انتخاب ردیف |
| onSelectionChange | (selected: any[]) => void | - | تابع فراخوانی تغییر انتخاب |
| loading | boolean | false | وضعیت بارگذاری |
| className | string | '' | کلاس‌های CSS اضافی |
| theme | 'light' \| 'dark' | 'light' | تم جدول |

### رابط Column

```typescript
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
```

### ویژگی‌ها

- مرتب‌سازی و فیلتر پیشرفته
- صفحه‌بندی
- انتخاب ردیف
- تغییر اندازه ستون
- قابلیت جستجو
- طراحی واکنش‌گرا
- تم‌های روشن/تاریک
- رندر سفارشی سلول
- حالت‌های بارگذاری

### نحوه استفاده

```tsx
import { DataGrid } from 'your-library';

const columns = [
  {
    field: 'id',
    headerName: 'شناسه',
    width: 100
  },
  {
    field: 'name',
    headerName: 'نام',
    flex: 1
  },
  {
    field: 'email',
    headerName: 'ایمیل',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'عملیات',
    cellRenderer: ActionButtons,
    sortable: false,
    filter: false
  }
];

const rows = [
  { id: 1, name: 'علی محمدی', email: 'ali@example.com' },
  { id: 2, name: 'مریم احمدی', email: 'maryam@example.com' }
];

// استفاده ساده
<DataGrid
  columns={columns}
  rows={rows}
/>

// با انتخاب و اندازه صفحه سفارشی
<DataGrid
  columns={columns}
  rows={rows}
  selection="multiple"
  pageSize={25}
  onSelectionChange={(selected) => console.log('انتخاب شده:', selected)}
/>

// تم تاریک
<DataGrid
  columns={columns}
  rows={rows}
  theme="dark"
/>
```