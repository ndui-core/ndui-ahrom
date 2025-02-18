import React from 'react';

interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  className = '',
}) => {
  return (
    <div className={`text-sm breadcrumbs ${className}`}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a
                href={item.href}
                className="flex items-center gap-2"
              >
                {item.icon && <span>{item.icon}</span>}
                
                {item.label}
              </a>
            ) : (
              <span className="flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;