// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCoxDD59Xk4NhlVHbvzn_KJPM6Aa8a9Oc",
  authDomain: "sudharshan-cloud-project.firebaseapp.com",
  projectId: "sudharshan-cloud-project",
  storageBucket: "sudharshan-cloud-project.firebasestorage.app",
  messagingSenderId: "154263678232",
  appId: "1:154263678232:web:d01198f7be4a4e16e3026d",
  measurementId: "G-45414WM60C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const AuthProvider=new GoogleAuthProvider()
export const db=getFirestore(app);