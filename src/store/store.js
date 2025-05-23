import { configureStore } from '@reduxjs/toolkit';
import { authSlide } from './auth';

export const store = configureStore({
    reducer: {
        auth: authSlide.reducer,
    },
});