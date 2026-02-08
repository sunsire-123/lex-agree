import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { LogIn, User } from 'lucide-react';

export const Login: React.FC = () => {
    const { signInWithGoogle, signInAsDemo, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            <Card title="Welcome Back" className="w-full max-w-md text-center">
                <p className="mb-8 text-slate-500">
                    Sign in to access your dashboard to upload agreements or generate new documents.
                </p>

                <div className="space-y-4">
                    <Button
                        className="w-full relative justify-center"
                        isLoading={loading && !user}
                        onClick={signInWithGoogle}
                        icon={<LogIn className="w-4 h-4" />}
                    >
                        Sign in with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">Or continue as guest</span>
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full justify-center"
                        onClick={signInAsDemo}
                        icon={<User className="w-4 h-4" />}
                    >
                        Try Demo Mode
                    </Button>
                </div>

                <p className="mt-8 text-xs text-slate-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </Card>
        </div>
    );
};
