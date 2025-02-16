# DateTime Picker Component

## English

A date and time picker component with customizable format and time selection.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| selected | Date \| null | - | Selected date value |
| onChange | (date: Date \| null) => void | - | Change handler |
| showTimeSelect | boolean | false | Enable time selection |
| dateFormat | string | "MM/dd/yyyy" | Date format string |
| label | string | - | Input label |
| error | string | - | Error message |
| className | string | '' | Additional CSS classes |

### Usage

```tsx
import { DateTimePicker } from 'your-library';

function Example() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DateTimePicker
      selected={date}
      onChange={setDate}
      showTimeSelect
      label="Select Date and Time"
    />
  );
}
```

## فارسی

کامپوننت انتخاب تاریخ و زمان با قابلیت سفارشی‌سازی فرمت و انتخاب زمان.

### پراپ‌ها

| پراپ | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| selected | Date \| null | - | تاریخ انتخاب شده |
| onChange | (date: Date \| null) => void | - | تابع تغییر تاریخ |
| showTimeSelect | boolean | false | فعال‌سازی انتخاب زمان |
| dateFormat | string | "MM/dd/yyyy" | فرمت نمایش تاریخ |
| label | string | - | برچسب ورودی |
| error | string | - | پیام خطا |
| className | string | '' | کلاس‌های CSS اضافی |

### نحوه استفاده

```tsx
import { DateTimePicker } from 'your-library';

function Example() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DateTimePicker
      selected={date}
      onChange={setDate}
      showTimeSelect
      label="انتخاب تاریخ و زمان"
    />
  );
}
```