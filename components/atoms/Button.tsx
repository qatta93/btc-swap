import React from "react";
import { cn } from "@/lib/utils";

export function Button({
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "w-full py-6 mob:py-4 text-lg font-medium bg-primary-500 text-white rounded-xl",
        { "hover:bg-primary-600": !disabled },
        { "opacity-50 cursor-default": disabled },
        className
      )}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
}
