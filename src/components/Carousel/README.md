# Carousel Component

## English

A flexible carousel/slider component with support for autoplay, navigation, and pagination.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| slides | { id: string; content: ReactNode }[] | - | Array of slide content |
| autoplay | boolean | false | Enable automatic sliding |
| interval | number | 3000 | Autoplay interval in milliseconds |
| navigation | boolean | true | Show navigation buttons |
| pagination | boolean | true | Show pagination dots |
| loop | boolean | true | Enable infinite loop |
| className | string | '' | Additional CSS classes |

### Features

- Smooth transitions
- Touch/swipe support
- Responsive design
- Keyboard navigation
- Customizable controls
- Autoplay with pause on hover
- Accessible navigation

### Usage

```tsx
import { Carousel } from 'your-library';

const slides = [
  {
    id: '1',
    content: (
      <div className="h-64 bg-primary flex items-center justify-center">
        <h2 className="text-2xl text-white">Slide 1</h2>
      </div>
    )
  },
  {
    id: '2',
    content: (
      <div className="h-64 bg-secondary flex items-center justify-center">
        <h2 className="text-2xl text-white">Slide 2</h2>
      </div>
    )
  }
];

// Basic usage
<Carousel slides={slides} />

// With autoplay
<Carousel
  slides={slides}
  autoplay
  interval={5000}
/>

// Custom navigation
<Carousel
  slides={slides}
  navigation={false}
  pagination={true}
/>
```

## فارسی

کامپوننت اسلایدر/کروسل انعطاف‌پذیر با پشتیبانی از پخش خودکار، ناوبری و صفحه‌بندی.

### پراپ‌ها

| پراپ | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| slides | { id: string; content: ReactNode }[] | - | آرایه‌ای از محتوای اسلایدها |
| autoplay | boolean | false | فعال‌سازی اسلاید خودکار |
| interval | number | 3000 | فاصله زمانی پخش خودکار به میلی‌ثانیه |
| navigation | boolean | true | نمایش دکمه‌های ناوبری |
| pagination | boolean | true | نمایش نقاط صفحه‌بندی |
| loop | boolean | true | فعال‌سازی حلقه بی‌نهایت |
| className | string | '' | کلاس‌های CSS اضافی |

### ویژگی‌ها

- انتقال‌های نرم
- پشتیبانی از لمس/سوایپ
- طراحی واکنش‌گرا
- ناوبری با کیبورد
- کنترل‌های قابل سفارشی‌سازی
- پخش خودکار با توقف در هنگام هاور
- ناوبری دسترس‌پذیر

### نحوه استفاده

```tsx
import { Carousel } from 'your-library';

const slides = [
  {
    id: '1',
    content: (
      <div className="h-64 bg-primary flex items-center justify-center">
        <h2 className="text-2xl text-white">اسلاید ۱</h2>
      </div>
    )
  },
  {
    id: '2',
    content: (
      <div className="h-64 bg-secondary flex items-center justify-center">
        <h2 className="text-2xl text-white">اسلاید ۲</h2>
      </div>
    )
  }
];

// استفاده ساده
<Carousel slides={slides} />

// با پخش خودکار
<Carousel
  slides={slides}
  autoplay
  interval={5000}
/>

// ناوبری سفارشی
<Carousel
  slides={slides}
  navigation={false}
  pagination={true}
/>
```