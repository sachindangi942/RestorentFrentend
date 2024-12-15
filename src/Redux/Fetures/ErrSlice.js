import { createSlice } from "@reduxjs/toolkit";

const ErrSlice = createSlice({
    name:"err",
    initialState:{
        err: {}
    },
    reducers:{
        setErr : ((state,actions)=>{
            state.err = actions.payload
        })
    }
});

export const {setErr} = ErrSlice.actions;
export default ErrSlice.reducer;