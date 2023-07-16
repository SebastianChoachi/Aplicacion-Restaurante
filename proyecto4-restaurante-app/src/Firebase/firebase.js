
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
 

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "proyecto-restaurante-db.firebaseapp.com",
  projectId: "proyecto-restaurante-db",
  storageBucket: "proyecto-restaurante-db.appspot.com",
  messagingSenderId: "738627142520",
  appId: "1:738627142520:web:acba93aab478807f343e8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export{db}