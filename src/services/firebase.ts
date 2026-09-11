import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL5Gb3qImI9OZ6pWErW_D3EvBuptWnkGs",
  authDomain: "adaptive-e-learning-b063b.firebaseapp.com",
  projectId: "adaptive-e-learning-b063b",
  storageBucket: "adaptive-e-learning-b063b.firebasestorage.app",
  messagingSenderId: "438100676526",
  appId: "1:438100676526:web:328f1b69b38207ccb2c23f",
  measurementId: "G-RRXNVFBMM9"
};

let app;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

// Initialize Firebase only if config is present (basic check)
try {
    if (firebaseConfig.apiKey) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
    } else {
        console.warn("Firebase Config missing (VITE_FIREBASE_API_KEY not set). Firebase Auth disabled.");
    }
} catch (e) {
    console.error("Firebase Initialization Error:", e);
}

export { auth, googleProvider };
