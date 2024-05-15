// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB3KWUlJ7I_lwKHV_uPJKgCkNyHDEt3cxU",
  authDomain: "skill-tracker-383d9.firebaseapp.com",
  projectId: "skill-tracker-383d9",
  storageBucket: "skill-tracker-383d9.appspot.com",
  messagingSenderId: "231184450076",
  appId: "1:231184450076:web:041fb9ab4d59b714d615d9",
  measurementId: "G-0SDPRLZ8Q6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = getFirestore(app);

export default db;