// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  appId: import.meta.env.VITE_APPID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
