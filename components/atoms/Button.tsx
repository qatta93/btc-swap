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
        "w-full py-6 text-lg font-medium bg-pink-500 text-white rounded-xl",
        { "hover:bg-pink-600": !disabled },
        { "opacity-50 cursor-default": disabled },
        className
      )}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
}
