import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCSt4WbLwzGBB3Vz1UyKqL3bIi7jX_5TN4",
  authDomain: "noted-6f764.firebaseapp.com",
  databaseURL:
    "https://noted-6f764-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "noted-6f764",
  storageBucket: "noted-6f764.appspot.com",
  messagingSenderId: "256507730149",
  appId: "1:256507730149:web:a1423ccc96734355551c0c",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
