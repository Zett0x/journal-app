// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEmYsStAOKhHvYCFJkoyKRtkkb08OjaT0",
  authDomain: "react-app-courses-ef2c6.firebaseapp.com",
  projectId: "react-app-courses-ef2c6",
  storageBucket: "react-app-courses-ef2c6.appspot.com",
  messagingSenderId: "1006561623721",
  appId: "1:1006561623721:web:b649401a6273fbeeb1f3b8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();

export {
  auth,
  db,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  googleAuthProvider,
};
