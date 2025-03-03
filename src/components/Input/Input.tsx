import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  variant?: "bordered" | "ghost" | "primary";
  inputSize?: "xs" | "sm" | "md" | "lg";
  prepend?: React.ReactNode;
  append?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  name, 
  label, 
  variant = "bordered", 
  inputSize = "md", 
  className = "", 
  prepend,
  append,
  ...props 
}) => {
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
      
      <div className="flex">
        {prepend && (
          <div className="flex items-center justify-center px-3 bg-base-200 border border-r-0 border-base-300 rounded-l-lg">
            {prepend}
          </div>
        )}
        
        <input 
          {...register(name)} 
          className={`
            ${baseClass}
            ${prepend ? 'rounded-l-none' : ''}
            ${append ? 'rounded-r-none' : ''}
            ${prepend || append ? 'flex-1' : ''}
          `} 
          {...props} 
        />
        
        {append && (
          <div className="flex items-center justify-center px-3 bg-base-200 border border-l-0 border-base-300 rounded-r-lg">
            {append}
          </div>
        )}
      </div>
      
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Input;