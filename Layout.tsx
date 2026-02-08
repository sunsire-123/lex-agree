import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto">
                {children}
            </main>
            <footer className="py-8 bg-white border-t border-slate-100 mt-auto">
                <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
                    © 2024 LexAgree. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
