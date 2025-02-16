import React, { useState, useRef, useEffect } from 'react';

interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  position?: 'bottom' | 'top' | 'left' | 'right';
}

const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  position = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`
          absolute z-50 bg-base-100 rounded-lg shadow-lg py-2 min-w-[200px]
          ${position === 'top' ? 'bottom-full mb-2' : ''}
          ${position === 'bottom' ? 'top-full mt-2' : ''}
          ${position === 'left' ? 'right-full mr-2' : ''}
          ${position === 'right' ? 'left-full ml-2' : ''}
        `}>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {item.divider ? (
                <div className="my-2 border-t border-base-300" />
              ) : (
                <button
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-base-200'}
                  `}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick?.();
                      setIsOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                >
                  {item.icon && <span>{item.icon}</span>}
                  }
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;