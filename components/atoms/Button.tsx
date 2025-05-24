import React from 'react';
import { cn } from '@/lib/utils';

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                'bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-xl font-medium hover:opacity-90 transition',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
