import { createSlice } from "@reduxjs/toolkit";

const ErrSlice = createSlice({
    name:"err",
    initialState:{
        setErr: null
    },
    reducers:{
        setErr : ((state,action)=>{
            state.setErr = action.payload
        })
    }
});

export const {setErr} = ErrSlice.actions;
export default ErrSlice.reducer;