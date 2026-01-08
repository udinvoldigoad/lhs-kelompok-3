import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjS2fgshE2uU4_3gBZx18g1DECH6bWY7s",
  authDomain: "lhs3-221c8.firebaseapp.com",
  projectId: "lhs3-221c8",
  storageBucket: "lhs3-221c8.firebasestorage.app",
  messagingSenderId: "38096395846",
  appId: "1:38096395846:web:504211e1054a7475ca7447",
  measurementId: "G-D1SBT3KCYP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);