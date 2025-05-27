// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9YAXhF3LF4prQPNwFo_EADObtI0JZXks",
  authDomain: "devnest-bab17.firebaseapp.com",
  projectId: "devnest-bab17",
  storageBucket: "devnest-bab17.appspot.com",
  messagingSenderId: "723333068614",
  appId: "1:723333068614:web:9f195ddc2926ea17a35747",
  measurementId: "G-T78970FSEK",
};

const app = initializeApp(firebaseConfig); // ✅ só uma vez!

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app; // exporta o app se precisar
