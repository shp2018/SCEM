import { getFirestore, doc, getDoc } from "@firebase/firestore";

export async function getData(userKey){
    const db = getFirestore();
    const docRef = doc(db, "users", userKey);
    const docSnap = await getDoc(docRef);
    return docSnap
}

export async function getDocRef(userKey){
    const db = getFirestore();
    const docRef = doc(db, "users", userKey);
    return docRef
}
