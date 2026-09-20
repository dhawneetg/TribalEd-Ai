import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-pill-outline",
    danger: "bg-[#b30000] text-white rounded-[32px] px-5 py-2.5 text-sm font-medium hover:bg-red-700 transition-all",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3",
  };

  return (
    <button
      className={cn(variantStyles[variant], variant !== "secondary" && sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
