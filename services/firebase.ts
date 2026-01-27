import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6p_WYxNBbCM1CLCVQbTewRtFvswTHt6A",
  authDomain: "mealgo-bd8e2.firebaseapp.com",
  projectId: "mealgo-bd8e2",
  storageBucket: "mealgo-bd8e2.firebasestorage.app",
  messagingSenderId: "115839080323",
  appId: "1:115839080323:web:7f2eab7f5627686d5448b6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
