import React from 'react';
// @ts-ignore
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = variant === 'primary' ? 'btn-primary' :
        variant === 'secondary' ? 'btn-secondary' :
            variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
                'bg-transparent text-slate-600 hover:bg-slate-100'; // ghost

    const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-sm' :
        size === 'lg' ? 'px-6 py-3 text-lg' :
            ''; // md is default logic in css

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            {!isLoading && icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};
