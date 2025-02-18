import React from "react";

interface InputProps {
  label?: string;
  error?: string;
  value?: string;
  onChange: (option: any) => void;
  className?: string;
  variant?: "bordered" | "ghost" | "primary";
  size?: "xs" | "sm" | "md" | "lg";
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  error,
  onChange,
  variant = "bordered",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClass = `input input-${variant} ${size ? `input-${size}` : ""} ${
    error ? "input-error" : ""
  } ${className}`;

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input onChange={onChange} className={baseClass} {...props} />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Input;