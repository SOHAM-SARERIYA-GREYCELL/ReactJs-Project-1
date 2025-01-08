import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { reducer as formReducer } from 'redux-form';

const store = configureStore({
    reducer: {
        users: userReducer,
        form: formReducer,
    },
})

export default store;