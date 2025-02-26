import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: Option[];
  error?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  size = "md",
  className = "",
  placeholder = "",
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
      aria-placeholder={placeholder}
        className={`select select-bordered ${size ? `select-${size}` : ""} ${
          error ? "select-error" : ""
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Select;