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
    addNewEmptyNote: (state, { payload }) => {
        state.notes.push(payload);
        state.isSaving = false;
        state.actionMessage = 'Note saved successfully';
    },
    setActiveNote: (state, { payload }) => {
        state.activeNote = payload;
    },
    setNotes: (state, { payload: notes }) => {
        state.notes = notes;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });
      state.actionMessage = 'Note updated successfully';
    },
    deleteNoteById: (state, { payload }) => {
      state.activeNote = null;
      state.notes = state.notes.filter(note => note.id !== payload.id);
      state.isSaving = false;
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
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlide.actions;
