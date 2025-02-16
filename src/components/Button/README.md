# Button Component

A customizable button component with different variants and native button functionality.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'accent' | 'primary' | The visual style of the button |
| ...props | ButtonHTMLAttributes<HTMLButtonElement> | - | All native button attributes |

## Usage

```tsx
import { Button } from 'your-library';

// Basic usage
<Button>Click me</Button>

// Secondary variant with onClick
<Button 
  variant="secondary"
  onClick={() => console.log('Clicked!')}
>
  Secondary Button
</Button>

// Disabled accent button
<Button 
  variant="accent"
  disabled
>
  Disabled Button
</Button>
```