import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

interface AuthContextType {
    user: User | null; // Using Firebase User type
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInAsDemo: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!auth) {
            console.log("AuthContext: Firebase Auth not initialized (config missing). Skipping listener.");
            setLoading(false);
            return;
        }

        try {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.warn("AuthContext: Error setting up auth listener.", error);
            setLoading(false);
            return () => { };
        }
    }, []);

    const signInWithGoogle = async () => {
        if (!auth || !googleProvider) {
            alert("Configuration Missing: Google Sign-In requires Firebase API keys. Please use 'Demo Mode' instead.");
            return;
        }

        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Sign In Error:", error);
            alert("Google Sign In failed. Check console for details.");
        }
    };

    const signInAsDemo = async () => {
        // Mock user object matching minimal Firebase User interface
        const demoUser = {
            uid: 'demo-123',
            displayName: 'Demo User',
            email: 'demo@example.com',
            photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: null,
            delete: async () => { },
            getIdToken: async () => 'mock-token',
            getIdTokenResult: async () => ({} as any),
            reload: async () => { },
            toJSON: () => ({}),
            phoneNumber: null,
            providerId: 'firebase'
        } as unknown as User;

        setUser(demoUser);
    };

    const logout = async () => {
        try {
            if (auth) {
                await firebaseSignOut(auth);
            }
            setUser(null);
        } catch (e) {
            // If mock user or error
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInAsDemo, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
