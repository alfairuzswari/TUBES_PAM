// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_zGX6Ab1qYsz5BhXJ7BMlMDsgh3zuc2Y",
    authDomain: "tubespam-2b3b9.firebaseapp.com",
    projectId: "tubespam-2b3b9",
    storageBucket: "tubespam-2b3b9.appspot.com",
    messagingSenderId: "926811738477",
    appId: "1:926811738477:web:10effe181c41d8391b8a64",
    measurementId: "G-MR0LT3H491"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;