import React, { useEffect } from "react";

interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  message: React.ReactNode;
  onClose?: () => void;
  autoClose?: number; // Duration in milliseconds
}

const Alert: React.FC<AlertProps> = ({ 
  type = "info", 
  message, 
  onClose,
  autoClose 
}) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose && onClose) {
      timeoutId = setTimeout(onClose, autoClose);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [autoClose, onClose]);

  return (
    <div 
      className={`alert alert-${type} shadow-lg`}
      role="alert"
      aria-live="polite"
    >
      <div>
        {type === "info" && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            className="stroke-current shrink-0 w-6 h-6"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}
        
        {type === "success" && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="stroke-current shrink-0 h-6 w-6"
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}
        
        {type === "warning" && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="stroke-current shrink-0 h-6 w-6"
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        )}
        
        {type === "error" && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="stroke-current shrink-0 h-6 w-6"
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}
        
        <span>{message}</span>
      </div>
      {onClose && (
        <button 
          className="btn btn-ghost btn-sm"
          onClick={onClose}
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;