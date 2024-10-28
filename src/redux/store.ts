import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../redux/slices/gameSlice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
