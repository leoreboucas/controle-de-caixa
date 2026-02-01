// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyGNP4dEi9Oxw-Yj08qPJz_meQMB4uzHg",
    authDomain: "controle-de-caixa-be853.firebaseapp.com",
    projectId: "controle-de-caixa-be853",
    storageBucket: "controle-de-caixa-be853.firebasestorage.app",
    messagingSenderId: "860930428738",
    appId: "1:860930428738:web:753ce3d4c3f9cee8c642db",
    measurementId: "G-2ZBMXD58J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();