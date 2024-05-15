import React, { createContext, useContext, useState,useEffect } from 'react';
import { app } from '../config/firebase-config';
import { getAuth } from 'firebase/auth';
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();  // Clean up the listener on unmount
  }, [navigate]);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log("login succ")
        navigate('/home')

      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };
  

  const logout = () => {
    signOut(auth)  // Call signOut from Firebase auth
        .then(() => {
            setUser(null);  // Clear user from context
            navigate('/login');  // Redirect to login page
        })
        .catch((error) => {
            console.error("Logout failed:", error.message);
        });
    };
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // You can handle redirections or local state updates here
      alert('Google sign in successful');
      navigate('/home')
    } catch (error) {
      console.error('Google sign in failed:', error.message);
      alert('Google sign in failed: ' + error.message);
    }
  };

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // This is where you might want to set user state or do post-signup tasks
        setUser(userCredential.user);
        navigate('/home')
      })
      .catch((error) => {
        console.error("Signup failed:", error.message);
        // Optionally, handle errors in state or inform the user via UI
      });
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, signup, handleGoogleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
