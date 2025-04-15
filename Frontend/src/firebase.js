// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1sZ0wOa3HGRP78WvglSzgHHDjNQu4IJ8",
  authDomain: "cab-servi.firebaseapp.com",
  projectId: "cab-servi",
  storageBucket: "cab-servi.appspot.com",
  messagingSenderId: "600750036998",
  appId: "1:600750036998:web:3c1969ae496aacc2c3cb87",
  measurementId: "G-G7D7EGP2DP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
