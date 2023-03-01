// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb43v1cOmpubJVNU1V2oo8eiF5c0THamg",
  authDomain: "login02-391e7.firebaseapp.com",
  projectId: "login02-391e7",
  storageBucket: "login02-391e7.appspot.com",
  messagingSenderId: "760833086594",
  appId: "1:760833086594:web:d43b86206d293a8440d09b",
  measurementId: "G-TWQ43FJ0TR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

export const auth = getAuth();