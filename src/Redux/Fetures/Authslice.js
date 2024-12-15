import { createSlice } from "@reduxjs/toolkit";

const Authslice = createSlice({
    name: "auth",
    initialState: {
        token: null
    },
    reducers: {
        setToken: ((state, actions) => {
            state.token = actions.payload
        }),
        clearToken: ((state) => {
            state.token = null
        })
    }
});

export const { setToken, clearToken } = Authslice.actions;
export default Authslice.reducer;
