import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import searchReducer from '../store/SearchSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        search: searchReducer

    }
});


export default store;