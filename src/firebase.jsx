import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA50UZ-W1MTm-bcSf1cqwxEhnjGDnhwANE",
  authDomain: "movie-project-firestore.firebaseapp.com",
  projectId: "movie-project-firestore",
  storageBucket: "movie-project-firestore.appspot.com",
  messagingSenderId: "870723903548",
  appId: "1:870723903548:web:6961a3583186b09e14a339",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };

