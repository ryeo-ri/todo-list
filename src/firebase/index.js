import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyA7ZMCt-irD4lHL92drUn7Vf37yGJm7LSQ",
    authDomain: "react-project-d42ab.firebaseapp.com",
    projectId: "react-project-d42ab",
    storageBucket: "react-project-d42ab.appspot.com",
    messagingSenderId: "888658816531",
    appId: "1:888658816531:web:7763a20e1b6f02777c59e6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
