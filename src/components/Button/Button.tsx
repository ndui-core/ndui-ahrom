import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({ 
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
  disabled,
  children,
  type = "button",
  ...props
}) => {
  const baseClasses = [
    "btn",
    `btn-${variant}`,
    size !== "md" && `btn-${size}`,
    fullWidth && "w-full",
    loading && "loading",
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2" aria-hidden="true">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2" aria-hidden="true">{icon}</span>
      )}
    </button>
  );
};

export default Button;