import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYNRqweViggW6P0RAZEF6qKrdAaFi2sNA",
  authDomain: "productframework-b0ef7.firebaseapp.com",
  projectId: "productframework-b0ef7",
  storageBucket: "productframework-b0ef7.appspot.com",
  messagingSenderId: "20684946172",
  appId: "1:20684946172:web:ce64ef7f47552e06fcf579",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
