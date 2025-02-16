# Alert Component

A versatile alert component for displaying messages with different types and optional close functionality.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | The type of alert to display |
| message | ReactNode | - | The content to display in the alert |
| onClose | () => void | - | Optional callback for handling alert dismissal |

## Usage

```tsx
import { Alert } from 'your-library';

// Basic usage
<Alert message="This is an info alert" />

// Success alert
<Alert 
  type="success"
  message="Operation completed successfully"
/>

// Dismissible warning alert
<Alert 
  type="warning"
  message="Please review your changes"
  onClose={() => console.log('Alert closed')}
/>
```