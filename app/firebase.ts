import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVfP0squHn1hj7NIA9Uy6mJSIGFxODdU0",
  authDomain: "realswitch-3d586.firebaseapp.com",
  projectId: "realswitch-3d586",
  storageBucket: "realswitch-3d586.appspot.com",
  messagingSenderId: "705929187576",
  appId: "1:705929187576:web:968a940677ab23eb9c6b0d",
  measurementId: "G-6Z7RT3PN55",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { app, auth, provider, firebaseConfig };
