import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../auth/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

export default store;