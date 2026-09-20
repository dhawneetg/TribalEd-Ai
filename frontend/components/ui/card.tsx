import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "canvas" | "stone" | "dark";
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "canvas",
  children,
  ...props
}) => {
  const variantStyles = {
    canvas: "bg-white border border-[#e5e7eb] text-[#212121]",
    stone: "bg-[#eeece7] border border-[#d9d9dd] text-[#212121]",
    dark: "bg-[#17171c] border border-[#27272a] text-white",
  };

  return (
    <div
      className={cn("rounded-[22px] p-6 sm:p-8 transition-all", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
