# Dropdown Component

A customizable dropdown menu component with flexible positioning and sizing options.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | ReactNode | - | The element that triggers the dropdown |
| items | DropdownItem[] | - | Array of items to display in the dropdown |
| position | 'left' \| 'right' \| 'top' \| 'bottom' | 'bottom' | Position of the dropdown menu |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Size of the dropdown menu items |

### DropdownItem Interface

```typescript
interface DropdownItem {
  label: ReactNode;
  value: string;
  onClick?: () => void;
}
```

## Usage

```tsx
import { Dropdown, Button } from 'your-library';

const items = [
  { 
    label: 'Option 1', 
    value: '1', 
    onClick: () => console.log('Option 1 clicked') 
  },
  { 
    label: 'Option 2', 
    value: '2', 
    onClick: () => console.log('Option 2 clicked') 
  }
];

// Basic usage
<Dropdown
  trigger={<Button>Open Menu</Button>}
  items={items}
/>

// Custom position and size
<Dropdown
  trigger={<Button>Settings</Button>}
  items={items}
  position="right"
  size="sm"
/>
```