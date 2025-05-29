import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    actionMessage: '',
    notes: [],
    activeNote: null,
    // activeNote: {
    //     id: null,
    //     title: null,
    //     body: null,
    //     date: null,
    //     imageUrls: []
    // },
};

const reducers = {
    savingNewNote: (state, action) => {
        state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
        state.notes.push(payload);
        state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
        state.active = payload;
    },
    setNotes: (state, { payload: notes }) => {
        state.notes = notes;
    },
    setSaving: (state, action) => {

    },
    updateNote: (state, action) => {

    },
    deleteNoteById: (state, action) => {

    }
}

export const journalSlide = createSlice({
    name: 'journal',
    initialState,
    reducers,
});


export const {
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlide.actions;
