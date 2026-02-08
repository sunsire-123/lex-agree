import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// @ts-ignore
import { Home } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                        <Home className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                        LexAgree
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" active={isActive('/')}>Home</NavLink>
                    <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
                    <NavLink to="/generator" active={isActive('/generator')}>Generator</NavLink>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <Button variant="secondary" size="sm">Sign In</Button>
                    </Link>
                    <Link to="/signup">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const NavLink: React.FC<{ to: string; active: boolean; children: React.ReactNode }> = ({ to, active, children }) => (
    <Link
        to={to}
        className={`text-sm font-medium transition-colors hover:text-blue-600 ${active ? 'text-blue-600' : 'text-slate-600'
            }`}
    >
        {children}
    </Link>
);
