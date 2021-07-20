import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbLMc5-4HFK-OjnUxcUUPYfteDTtXEDXw",
  authDomain: "todoapp-pp.firebaseapp.com",
  projectId: "todoapp-pp",
  storageBucket: "todoapp-pp.appspot.com",
  messagingSenderId: "501919549568",
  appId: "1:501919549568:web:560e0d93a4c10066113e65",
  measurementId: "G-PH6C7MF5VE"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export default db;
