# Drawer Component

A versatile drawer component that slides in from the side of the screen, perfect for navigation menus, filters, or additional content panels.

## Features

- Slides from left or right side
- Customizable width
- Optional overlay backdrop
- Smooth animations
- Controlled visibility
- TypeScript support
- Responsive design

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | - | Controls the visibility of the drawer |
| onClose | () => void | - | Callback function when drawer is closed |
| position | 'left' \| 'right' | 'left' | Position of the drawer |
| width | string | '300px' | Width of the drawer |
| children | ReactNode | - | Content to be displayed inside the drawer |
| overlay | boolean | true | Whether to show the overlay backdrop |

## Usage

### Basic Usage

```tsx
import { Drawer, Button } from 'your-library';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Drawer Content</h2>
          <p>This is the drawer content.</p>
        </div>
      </Drawer>
    </>
  );
}
```

### Custom Position and Width

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right"
  width="400px"
>
  <div className="p-4">
    <h2>Right Drawer</h2>
    <p>This drawer slides in from the right side.</p>
  </div>
</Drawer>
```

### Without Overlay

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  overlay={false}
>
  <div className="p-4">
    <h2>No Overlay</h2>
    <p>This drawer doesn't show the overlay backdrop.</p>
  </div>
</Drawer>
```

### Navigation Menu Example

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Menu</h2>
    <nav className="flex flex-col gap-2">
      <a href="/" className="hover:bg-base-200 p-2 rounded">Home</a>
      <a href="/about" className="hover:bg-base-200 p-2 rounded">About</a>
      <a href="/contact" className="hover:bg-base-200 p-2 rounded">Contact</a>
    </nav>
  </div>
</Drawer>
```

## Styling

The drawer uses DaisyUI classes for styling and can be customized using Tailwind CSS classes. The main elements are:

- `.drawer` - The main container
- `.drawer-content` - The drawer panel
- `.drawer-overlay` - The overlay backdrop

You can customize the appearance by:
- Adding custom classes to the drawer content
- Modifying the width prop
- Adjusting padding and margins of the content
- Using DaisyUI theme colors

## Accessibility

The drawer component:
- Traps focus within the drawer when open
- Closes on overlay click
- Supports keyboard navigation
- Uses ARIA attributes for screen readers

## Best Practices

1. Always provide a clear way to close the drawer
2. Use appropriate widths for different screen sizes
3. Consider the content hierarchy inside the drawer
4. Use the overlay prop based on your use case
5. Implement proper loading states if content is dynamic

## Notes

- The drawer uses fixed positioning, ensure your layout accounts for this
- Content outside the drawer remains interactive when overlay is disabled
- Consider using the `position` prop based on your app's UX requirements
- The drawer automatically handles responsive behavior