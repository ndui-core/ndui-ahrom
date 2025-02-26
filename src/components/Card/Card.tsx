import React from "react";

interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

const Card: React.FC<CardProps> = ({ title, children, footer, className = ""  , elevated = false}) => {
  return (
    <div  className={`card bg-white  ${className} ${elevated ? 'shadow-xl' : 'border-2'}`}>
      {title && (
        <div className="card-title p-4 pb-0">
          {title}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-actions p-6 pt-0">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;