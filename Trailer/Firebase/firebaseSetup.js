// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYmDQnbotqY9tiwm6GZ_YbPbuH2t6hfmU",
  authDomain: "edward-44c28.firebaseapp.com",
  projectId: "edward-44c28",
  storageBucket: "edward-44c28.appspot.com",
  messagingSenderId: "24032945572",
  appId: "1:24032945572:web:a8f636c681e44af475cd31",
  measurementId: "G-Y0WG641G0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;