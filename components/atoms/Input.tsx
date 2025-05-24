import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={`flex-1 bg-transparent outline-none text-lg ${className}`}
            {...props}
        />
    );
}
