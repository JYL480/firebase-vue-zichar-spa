import { initializeApp } from "firebase/app";
import {
  getFirestore
} from 'firebase/firestore'
import {
  getAuth
} from 'firebase/auth'
import {
  getDatabase,ref,set
} from 'firebase/database'



const firebaseConfig = {
    apiKey: "AIzaSyCa8m8RSFyN-cL__OyZXCEU8Bnslyl1AfE",
    authDomain: "zi-char-project.firebaseapp.com",
    databaseURL: "https://zi-char-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "zi-char-project",
    storageBucket: "zi-char-project.appspot.com",
    messagingSenderId: "646748018366",
    appId: "1:646748018366:web:325400ac3597ecbe4630ef",
    measurementId: "G-GP3RKLHE8D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)


export default database

