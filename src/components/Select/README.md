# Select Component

A customizable select component with support for labels, options, and error states.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Label text for the select |
| options | Option[] | - | Array of options to display |
| error | string | - | Error message to display |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Size of the select |
| className | string | '' | Additional CSS classes |
| ...props | SelectHTMLAttributes<HTMLSelectElement> | - | All native select attributes |

### Option Interface

```typescript
interface Option {
  value: string;
  label: string;
}
```

## Usage

```tsx
import Select from 'ndui-ahrom';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
];

// Basic usage
<Select
  label="Choose an option"
  options={options}
/>

// With error state
<Select
  label="Country"
  options={options}
  error="Please select a country"
/>

// Custom size
<Select
  label="Size"
  options={options}
  size="lg"
/>
```