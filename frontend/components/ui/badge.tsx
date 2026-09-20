import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "success" | "warning" | "error" | "neutral" | "digilocker" | "scheme";
  confidence?: number;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  confidence,
  children,
  className,
}) => {
  let resolvedVariant = variant || "neutral";

  if (confidence !== undefined) {
    if (confidence >= 0.95) resolvedVariant = "success";
    else if (confidence >= 0.70) resolvedVariant = "warning";
    else resolvedVariant = "error";
  }

  const variantStyles = {
    success: "bg-[#edfce9] text-[#003c33] border border-[#a3e635]/40",
    warning: "bg-[#fef9c3] text-[#854d0e] border border-[#fde047]",
    error: "bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]",
    neutral: "bg-[#eeece7] text-[#212121] border border-[#d9d9dd]",
    digilocker: "bg-[#eff6ff] text-[#1863dc] border border-[#93c5fd] font-medium",
    scheme: "bg-[#17171c] text-white border border-[#27272a] uppercase tracking-wider text-[11px]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight",
        variantStyles[resolvedVariant],
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          resolvedVariant === "success" && "bg-[#16a34a]",
          resolvedVariant === "warning" && "bg-[#ca8a04]",
          resolvedVariant === "error" && "bg-[#dc2626]",
          resolvedVariant === "digilocker" && "bg-[#1863dc]",
          resolvedVariant === "scheme" && "bg-white",
          resolvedVariant === "neutral" && "bg-[#75758a]"
        )}
      />
      {children}
    </span>
  );
};
