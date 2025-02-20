# Bottom Bar Component

A mobile-friendly bottom navigation bar component inspired by Quasar Framework.

## Features

- Icon and label support
- Badge support
- Active item highlighting
- Smooth animations
- Responsive design
- Customizable appearance
- Show/hide animations

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | BottomBarItem[] | - | Array of navigation items |
| value | string | - | Currently selected item value |
| onChange | (value: string) => void | - | Callback when item is selected |
| showLabels | boolean | true | Whether to show item labels |
| elevated | boolean | true | Add elevation shadow |
| bordered | boolean | false | Add top border |
| className | string | '' | Additional CSS classes |
| showActiveHighlight | boolean | true | Show highlight for active item |
| activeColor | 'primary' \| 'secondary' \| 'accent' | 'primary' | Color theme for active item |
| animated | boolean | true | Enable animations |
| isVisible | boolean | true | Control visibility |
| height | string | '56px' | Height of the bar |

### BottomBarItem Interface

```typescript
interface BottomBarItem {
  icon: ReactNode;
  label: string;
  value: string;
  badge?: number | string;
}
```

## Usage

```tsx
import { BottomBar } from 'ndui-ahrom';

const items = [
  {
    icon: '🏠',
    label: 'Home',
    value: 'home'
  },
  {
    icon: '🔍',
    label: 'Search',
    value: 'search'
  },
  {
    icon: '❤️',
    label: 'Favorites',
    value: 'favorites',
    badge: 3
  },
  {
    icon: '👤',
    label: 'Profile',
    value: 'profile'
  }
];

// Basic usage
function Example() {
  const [active, setActive] = useState('home');

  return (
    <BottomBar
      items={items}
      value={active}
      onChange={setActive}
    />
  );
}

// Custom styling
<BottomBar
  items={items}
  value={active}
  onChange={setActive}
  activeColor="secondary"
  elevated={false}
  bordered
/>

// Icons only
<BottomBar
  items={items}
  value={active}
  onChange={setActive}
  showLabels={false}
/>

// With visibility control
function ResponsiveExample() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BottomBar
      items={items}
      value={active}
      onChange={setActive}
      isVisible={isVisible}
    />
  );
}
```

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- High contrast active state
- Screen reader friendly text

## Best Practices

1. Limit the number of items (3-5 recommended)
2. Use clear, recognizable icons
3. Keep labels short and descriptive
4. Use badges sparingly
5. Consider hiding on scroll for content-heavy pages
6. Ensure sufficient touch targets
7. Maintain consistent navigation structure