import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import mySlice from '../reducers/mySlice';

const store = configureStore({
    reducer: {
        slice: mySlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;