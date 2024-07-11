import {configureStore} from '@reduxjs/toolkit';
import authService from '../appwrite/auth';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
       auth: authSlice
    }
})

export default store;