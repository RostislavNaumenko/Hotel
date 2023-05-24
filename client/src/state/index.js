import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"))
console.log("initial", user);
const initialState = {
    mode: "dark",
    user: user
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUser: (state, axtion) => {
            state.user = axtion.payload;
            localStorage.setItem('user', JSON.stringify(axtion.payload))
        },
        clearUser: (state, axtion) => {
            state.user = undefined;
            localStorage.removeItem('user');
        }

    }
})

export const { setMode, setUser, clearUser } = globalSlice.actions;
export default globalSlice.reducer;