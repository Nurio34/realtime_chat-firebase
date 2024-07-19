// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "realtimechat-87470.firebaseapp.com",
    projectId: "realtimechat-87470",
    storageBucket: "realtimechat-87470.appspot.com",
    messagingSenderId: "307610132319",
    appId: "1:307610132319:web:e71beae158440fa58ba0ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
