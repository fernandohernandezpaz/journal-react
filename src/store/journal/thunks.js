import { collection, doc, setDoc } from "firebase/firestore/lite";
import { fireBaseDB } from "../../core/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlide";
import { loadNote } from "../../core/helpers";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid:userId } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        };

        const document = doc( collection( fireBaseDB, `${userId}/journal/notes` ) );

        await setDoc( document, newNote );
        
        newNote.id = document.id;

        dispatch( addNewEmptyNote( newNote ) );
        
        dispatch( setActiveNote( newNote ) );
        
    };
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid:userId } = getState().auth;

        const notes = await loadNote( userId );
        
        dispatch( setNotes( notes ) );

    };
}