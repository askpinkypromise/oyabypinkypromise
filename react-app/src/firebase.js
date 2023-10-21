import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuKmioQdt0sBit5aW6PL5k5Pd931I4QCM",
  authDomain: "oya-by-pinky-promise.firebaseapp.com",
  projectId: "oya-by-pinky-promise",
  storageBucket: "oya-by-pinky-promise.appspot.com",
  appId: "1:279062364276:web:c15d1dc72e39115b065121",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
