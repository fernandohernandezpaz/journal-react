import { collection, getDocs } from "firebase/firestore/lite";
import { fireBaseDB } from "../firebase/config";

export const loadNote = async( uid = '' ) => {
    if (!uid) throw new Error('The uid is required');

    const collectionRef = collection( fireBaseDB, `${uid}/journal/notes` );
    const docs = await getDocs(collectionRef);
    const notes = [];
    docs.forEach(doc=> notes.push({
        id: doc.id,
        ...doc.data(),
    }));
    return notes;

}