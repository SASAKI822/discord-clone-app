import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAT7yHlPBJw8paveqjxwlv0bzgj23lzjMI",
  authDomain: "port-1af70.firebaseapp.com",
  projectId: "port-1af70",
  storageBucket: "port-1af70.appspot.com",
  messagingSenderId: "295699882208",
  appId: "1:295699882208:web:175967a9fc40152deaf085",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
