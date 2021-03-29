
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_VQtJ9bnaR-Pra7LOLNbYMPPWmtYVuqg",
  authDomain: "react-app-cursos-b939b.firebaseapp.com",
  projectId: "react-app-cursos-b939b",
  storageBucket: "react-app-cursos-b939b.appspot.com",
  messagingSenderId: "6864380027",
  appId: "1:6864380027:web:a150ec6d34e6b2090d02de"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}