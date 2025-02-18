// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGpkv1OGm-9jkAR1kibhz3iiy5dgZIis0",
  authDomain: "commuplacee.firebaseapp.com",
  projectId: "commuplacee",
  storageBucket: "commuplacee.firebasestorage.app",
  messagingSenderId: "74643029569",
  appId: "1:74643029569:web:21c807fe0be6ba578850c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;