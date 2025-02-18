import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className={`checkbox ${error ? 'checkbox-error' : ''} ${className}`}
          {...props}
        />
        {label && <span className="label-text ml-2">{label}</span>}
        
      </label>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;