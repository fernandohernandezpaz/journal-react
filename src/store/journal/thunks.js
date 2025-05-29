import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { fireBaseDB } from "../../core/firebase/config";
import { addNewEmptyNote, setSaving, setActiveNote, setNotes, updateNote, deleteNoteById } from "./journalSlide";
import { loadNote } from "../../core/helpers";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

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

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid:userId } = getState().auth;
        const { activeNote } = getState().journal;

        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        const document = doc( fireBaseDB, `${userId}/journal/notes/${activeNote.id}` );

        await setDoc( document, noteToFirestore, { merge: true } );

        dispatch( updateNote( activeNote ) );
        dispatch( setActiveNote( activeNote ) );

    };
}

export const startDeleteNote = () => {
    return async( dispatch, getState ) => {

        const { uid:userId } = getState().auth;
        const { activeNote } = getState().journal;

        const document = doc( fireBaseDB, `${userId}/journal/notes/${activeNote.id}` );

        await deleteDoc( document );

        dispatch( deleteNoteById( activeNote ) );
    };
}
