# Input Component

A flexible input component with support for labels, error states, and various styles.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Label text for the input |
| error | string | - | Error message to display |
| variant | 'bordered' \| 'ghost' \| 'primary' | 'bordered' | Visual style of the input |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Size of the input |
| className | string | '' | Additional CSS classes |
| ...props | InputHTMLAttributes<HTMLInputElement> | - | All native input attributes |

## Usage

```tsx
import Input from 'your-library';

// Basic usage
<Input
  label="Username"
  placeholder="Enter username"
/>

// With error state
<Input
  label="Email"
  type="email"
  error="Please enter a valid email"
/>

// Custom variant and size
<Input
  label="Search"
  variant="ghost"
  size="lg"
  placeholder="Search..."
/>
```