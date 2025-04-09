
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcLAnP5QRsI6wAbsRh6WEtuRpOnEY7C3E",
  authDomain: "ohlura-ai-interviewer.firebaseapp.com",
  projectId: "ohlura-ai-interviewer",
  storageBucket: "ohlura-ai-interviewer.firebasestorage.app",
  messagingSenderId: "749577230163",
  appId: "1:749577230163:web:a22c7d0bd4e8d7469d33a6",
  measurementId: "G-ZXGMEGYHWZ"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
