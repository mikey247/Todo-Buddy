// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhRvU_uFcT5b3TbEZcYcjpTVLspD5zQiU",
  authDomain: "auth-project-9851a.firebaseapp.com",
  projectId: "auth-project-9851a",
  storageBucket: "auth-project-9851a.appspot.com",
  messagingSenderId: "79938670932",
  appId: "1:79938670932:web:18dff47d1485efa3b6b8c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
