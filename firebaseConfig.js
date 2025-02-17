// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB80mEp4YC6VrBAdV4OGcd0Dh8ctR0SXs4",
  authDomain: "commuplace.firebaseapp.com",
  projectId: "commuplace",
  storageBucket: "commuplace.firebasestorage.app",
  messagingSenderId: "816851589118",
  appId: "1:816851589118:web:ad126ece5de55e1b9692af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;