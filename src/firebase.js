import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
    apiKey: "AIzaSyD1HUcvmYv6rpgCIJHfHoYEhXCgEIbnSFQ",
    authDomain: "sela-238dc.firebaseapp.com",
    databaseURL: "https://sela-238dc-default-rtdb.firebaseio.com",
    projectId: "sela-238dc",
    storageBucket: "gs://sela-238dc.appspot.com",
    messagingSenderId: "195049554939",
    appId: "1:195049554939:android:178e412da41a791124815e"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;