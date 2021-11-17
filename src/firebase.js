// Aqui va el driver de conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3WajZM0BXEVLmEtNZYA9RTTAldEEmTwM",

    authDomain: "trabajopokemon-bc7b0.firebaseapp.com",
  
    projectId: "trabajopokemon-bc7b0",
  
    storageBucket: "trabajopokemon-bc7b0.appspot.com",
  
    messagingSenderId: "210980692089",
  
    appId: "1:210980692089:web:22cb946bbf1fc73d24f4a8"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();