import React from 'react';
import { Button } from '../Button/Button';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  width?: string;
  children: React.ReactNode;
  overlay?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'left',
  width = '300px',
  children,
  overlay = true,
}) => {
  return (
    <div className={`drawer ${position === 'left' ? 'drawer-start' : 'drawer-end'} z-50`}>
      <input 
        type="checkbox" 
        className="drawer-toggle" 
        checked={isOpen}
        onChange={onClose}
      />
      
      {overlay && (
        <div className="drawer-overlay" onClick={onClose}></div>
      )}
      
      <div 
        className="drawer-content bg-base-100 h-full fixed top-0"
        style={{ width }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2"
          onClick={onClose}
          aria-label="Close drawer"
        >
          ✕
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;