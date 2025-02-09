// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration (you will get this from the Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyDtyGoAJmyWGJ_7nAbRyjeI7kgFQsixHA0",
    authDomain: "event-creation-management-app.firebaseapp.com",
    projectId: "event-creation-management-app",
    storageBucket: "event-creation-management-app.firebasestorage.app",
    messagingSenderId: "36055184667",
    appId: "1:36055184667:web:fabe7f94e5585ba3424fbe",
    measurementId: "G-27LT3G83RE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services to use in your app
export { auth,db, storage };
