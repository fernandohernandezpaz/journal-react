import { configureStore } from '@reduxjs/toolkit';
import { authSlide } from './auth';
import { journalSlide } from './journal';

export const store = configureStore({
    reducer: {
        auth: authSlide.reducer,
        journal: journalSlide.reducer,
    },
});