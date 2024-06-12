// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVfP0squHn1hj7NIA9Uy6mJSIGFxODdU0",
  authDomain: "realswitch-3d586.firebaseapp.com",
  projectId: "realswitch-3d586",
  storageBucket: "realswitch-3d586.appspot.com",
  messagingSenderId: "705929187576",
  appId: "1:705929187576:web:968a940677ab23eb9c6b0d",
  measurementId: "G-6Z7RT3PN55",
};

// Initialize Firebase
const app =getApps().length?getApp(): initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth=getAuth()
export {app,auth,provider,firebaseConfig}
