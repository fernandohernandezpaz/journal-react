import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'no-authenticated',//no-authenticated,authenticated,checking
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

const reducers = {
    login: (state, {payload}) => { 
        Object.assign(state, {
            status: 'authenticated',
            uid: payload.uid,
            email: payload.email,
            displayName: payload.displayName,
            photoURL: payload.photoURL,
            errorMessage: payload?.errorMessage,
        });
    },
    logout: (state, {payload}) => {
        Object.assign(state, {
            status: 'no-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: payload?.errorMessage,
        });
    },
    checkingCredentials: (state) => {
        state.status = 'checking';
    },
};

export const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers 
});

export const { login, logout, checkingCredentials } = authSlide.actions;