import React from "react";

interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, footer, className = "" }) => {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      {title && (
        <div className="card-title p-6 pb-0">
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