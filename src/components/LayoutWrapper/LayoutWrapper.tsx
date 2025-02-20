"use client";

import React, { useState, useEffect } from 'react';
import BottomBar from '../BottomBar/BottomBar';
import Toolbar from '../Toolbar/Toolbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
  drawerContent?: React.ReactNode;
  showDrawer?: boolean;
  miniDrawer?: boolean;
  drawerWidth?: string;
  miniDrawerWidth?: string;
  toolbarContent?: React.ReactNode;
  showToolbar?: boolean;
  elevatedToolbar?: boolean;
  bottomBarItems?: {
    icon: React.ReactNode;
    label: string;
    value: string;
    badge?: number | string;
    href?: string;
  }[];
  showBottomBar?: boolean;
  bottomBarValue?: string;
  onBottomBarChange?: (value: string) => void;
  className?: string;
  breakpoint?: number;
  rtl?: boolean;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  drawerContent,
  showDrawer = true,
  miniDrawer = false,
  drawerWidth = '280px',
  miniDrawerWidth = '60px',
  toolbarContent,
  showToolbar = true,
  elevatedToolbar = true,
  bottomBarItems,
  showBottomBar = true,
  bottomBarValue,
  onBottomBarChange,
  className = '',
  breakpoint = 1024,
  rtl = false,
}) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, [breakpoint]);

  const mainContentStyle = isDesktop && isDrawerOpen ? {
    [rtl ? 'marginRight' : 'marginLeft']: miniDrawer ? miniDrawerWidth : drawerWidth
  } : {};

  return (
    <div className={`min-h-screen ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Fixed Desktop Drawer */}
      {showDrawer && drawerContent && isDesktop && (
        <div 
          className={`fixed top-0 ${rtl ? 'right-0' : 'left-0'} h-full transition-all duration-300`}
          style={{ 
            width: isDrawerOpen ? (miniDrawer ? miniDrawerWidth : drawerWidth) : '0px',
            contentVisibility: 'auto',
            transform: isDrawerOpen ? 'translateX(0)' : `translateX(${rtl ? '100%' : '-100%'})`
          }}
        >
          <div className={`h-full bg-base-100 ${rtl ? 'border-l' : 'border-r'} border-base-300`}>
            {drawerContent}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {showDrawer && drawerContent && !isDesktop && (
        <div 
          className={`
            fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
            ${isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div 
            className={`
              fixed top-0 ${rtl ? 'right-0' : 'left-0'} h-full bg-base-100 transition-transform duration-300
              ${isMobileDrawerOpen ? 'translate-x-0' : rtl ? 'translate-x-full' : '-translate-x-full'}
            `}
            style={{ width: drawerWidth }}
            onClick={e => e.stopPropagation()}
          >
            {drawerContent}
          </div>
        </div>
      )}

      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 ${className}`}
        style={mainContentStyle}
      >
        {/* Toolbar */}
        {showToolbar && (
          <Toolbar elevated={elevatedToolbar}>
            {showDrawer && (
              <>
                {/* Mobile menu button */}
                {!isDesktop && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => setIsMobileDrawerOpen(true)}
                  >
                    ☰
                  </button>
                )}
                {/* Desktop drawer toggle */}
                {isDesktop && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    ☰
                  </button>
                )}
              </>
            )}
            {toolbarContent}
          </Toolbar>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Bottom Bar */}
        {showBottomBar && bottomBarItems && !isDesktop && (
          <BottomBar
            items={bottomBarItems}
            value={bottomBarValue}
            onChange={onBottomBarChange}
          />
        )}
      </div>
    </div>
  );
};

export default LayoutWrapper;