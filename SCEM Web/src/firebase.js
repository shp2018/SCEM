import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClVMzqHeGaGmWCFLcVD0aS450TKKgRhVk",
  authDomain: "scem-1dec5.firebaseapp.com",
  projectId: "scem-1dec5",
  storageBucket: "scem-1dec5.appspot.com",
  messagingSenderId: "497821850518",
  appId: "1:497821850518:web:801b1501b984370a649bb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);