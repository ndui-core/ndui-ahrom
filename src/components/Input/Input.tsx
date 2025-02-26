import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  variant?: "bordered" | "ghost" | "primary";
  inputSize?: "xs" | "sm" | "md" | "lg";
}

const Input: React.FC<InputProps> = ({ name, label, variant = "bordered", inputSize = "md", className = "", ...props }) => {
  const methods = useFormContext();
  if (!methods) {
    console.error("❌ useFormContext() is null! Make sure this Input component is inside a FormProvider.");
    return null;
  }

  const { register, formState: { errors } } = methods;
  const error = errors[name]?.message as string | undefined;

  const baseClass = `input input-${variant} input-${inputSize} ${error ? "input-error" : ""} ${className}`;

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input {...register(name)} className={baseClass} {...props} />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Input;
