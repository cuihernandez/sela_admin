import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyD1HUcvmYv6rpgCIJHfHoYEhXCgEIbnSFQ",
  authDomain: "sela-238dc.firebaseapp.com",
  databaseURL: "https://sela-238dc-default-rtdb.firebaseio.com",
  projectId: "sela-238dc",
  storageBucket: "gs://sela-238dc.appspot.com",
  messagingSenderId: "195049554939",
  appId: "1:195049554939:android:178e412da41a791124815e"
};
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
