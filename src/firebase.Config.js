import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDw4M2_JsywWwYEYnz2B2XkPfnN1MvlQEM",
  authDomain: "node-82.firebaseapp.com",
  databaseURL: "https://node-82-default-rtdb.firebaseio.com",
  projectId: "node-82",
  storageBucket: "node-82.appspot.com",
  messagingSenderId: "485055687502",
  appId: "1:485055687502:web:1ec67a4bcf2f65169c8c1f",
  measurementId: "G-P0LCC85XX8",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default firebaseConfig;

export { db };
