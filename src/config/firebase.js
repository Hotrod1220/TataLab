import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDO3JwUEyugDR-RHUs54lH_VX8zKfv97bQ",
  authDomain: "tatalab-17241.firebaseapp.com",
  projectId: "tatalab-17241",
  storageBucket: "tatalab-17241.appspot.com",
  messagingSenderId: "1093791276233",
  appId: "1:1093791276233:web:dae1d2b8fd42b0457e4118",
  measurementId: "G-XPZFVQ9907"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);