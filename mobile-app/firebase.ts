// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: "dine-app-408db.firebaseapp.com",
    projectId: "dine-app-408db",
    storageBucket: "dine-app-408db.firebasestorage.app",
    messagingSenderId: "689152009486",
    appId: "1:689152009486:web:3fb0fa88bc27d6312e635f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// create db once so we can use it anywhare
export const db = getFirestore(app);