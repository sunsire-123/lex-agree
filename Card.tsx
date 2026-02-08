import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
    return (
        <div className={`glass-panel p-6 rounded-2xl ${className}`}>
            {title && <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>}
            {children}
        </div>
    );
};
