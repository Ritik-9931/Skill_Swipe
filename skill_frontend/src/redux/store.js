import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import skillReducer from "./slices/skillSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        skill: skillReducer,
    },
})