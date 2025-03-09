import React from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: Option[];
  name: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  size = "md",
  className = "",
  placeholder = "",
  ...props
}) => {
  const methods = useFormContext();
  if (!methods) {
    console.error("❌ useFormContext() is null! Make sure this Input component is inside a FormProvider.");
    return null;
  }


  const { register, formState: { errors } } = methods;
  const error = errors[name]?.message as string | undefined;

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
        {...register(name)} 
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