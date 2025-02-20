import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomBarItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: number | string;
  href?: string;
}

interface BottomBarProps {
  /**
   * Array of items to display in the bottom bar
   */
  items: BottomBarItem[];
  /**
   * Currently selected item value
   */
  value?: string;
  /**
   * Callback when an item is selected
   */
  onChange?: (value: string) => void;
  /**
   * Whether to show labels
   */
  showLabels?: boolean;
  /**
   * Whether the bottom bar is elevated
   */
  elevated?: boolean;
  /**
   * Whether the bottom bar is bordered
   */
  bordered?: boolean;
  /**
   * Custom class names
   */
  className?: string;
  /**
   * Whether to show active highlight
   */
  showActiveHighlight?: boolean;
  /**
   * Color theme for active item
   */
  activeColor?: 'primary' | 'secondary' | 'accent';
  /**
   * Whether to animate item transitions
   */
  animated?: boolean;
  /**
   * Whether to show bottom bar
   */
  isVisible?: boolean;
  /**
   * Height of the bottom bar
   */
  height?: string;
}

const BottomBar: React.FC<BottomBarProps> = ({
  items,
  value,
  onChange,
  showLabels = true,
  elevated = true,
  bordered = false,
  className = '',
  showActiveHighlight = true,
  activeColor = 'primary',
  animated = true,
  isVisible = true,
  height = '56px',
}) => {
  const renderItem = (item: BottomBarItem) => {
    const isActive = item.value === value;
    const content = (
      <>
        {showActiveHighlight && isActive && animated && (
          <motion.div
            layoutId="activeBackground"
            className={`absolute inset-x-4 top-1 h-1 bg-${activeColor} rounded-full`}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
        )}

        <div className="relative">
          {item.icon}
          {item.badge && (
            <div className={`
              absolute -top-2 -right-2
              min-w-[18px] h-[18px]
              rounded-full
              bg-error text-error-content
              text-xs flex items-center justify-center
              px-1
            `}>
              {item.badge}
            </div>
          )}
        </div>

        {showLabels && (
          <span className={`
            text-xs mt-1
            ${isActive ? 'font-medium' : ''}
          `}>
            {item.label}
          </span>
        )}
      </>
    );

    const className = `
      flex flex-col items-center justify-center
      flex-1 h-full relative
      transition-colors duration-200
      ${isActive ? `text-${activeColor}` : 'text-base-content'}
    `;

    if (item.href) {
      return (
        <a
          href={item.href}
          className={className}
          onClick={() => onChange?.(item.value)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        onClick={() => onChange?.(item.value)}
        className={className}
      >
        {content}
      </button>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`
            fixed bottom-0 left-0 right-0
            bg-base-100
            ${elevated ? 'shadow-[0_-2px_4px_0_rgba(0,0,0,0.1)]' : ''}
            ${bordered ? 'border-t border-base-300' : ''}
            z-50
            ${className}
          `}
          style={{ height }}
        >
          <div className="flex items-center justify-around h-full">
            {items.map((item) => (
              <div key={item.value} className="flex-1 h-full">
                {renderItem(item)}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomBar;