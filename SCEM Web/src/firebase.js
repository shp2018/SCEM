import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAgEgiA2vB6Z4xV0cYdvXxtWkooDq1qGUo",
    authDomain: "scem-ef60b.firebaseapp.com",
    projectId: "scem-ef60b",
    storageBucket: "scem-ef60b.appspot.com",
    messagingSenderId: "915273599876",
    appId: "1:915273599876:web:9ebf23d09527ca2c65ebd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);