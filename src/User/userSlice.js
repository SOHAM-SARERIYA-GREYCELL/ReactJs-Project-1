import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users = [...action.payload];
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload)
        }
    }
})

export const { addUser, deleteUser } = userSlice.actions

export default userSlice.reducer
