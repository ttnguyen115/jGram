import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../database/firebase";

const userSlice = createSlice({
    name: 'user',

    initialState: {
        current: auth.currentUser,
    },

    reducers: {
        login(state, action) {
            
        },
        
        register(state, action) {

        },
    }
});

const { actions, reducer } = userSlice;
export const { login, register } = actions;
export default reducer;