import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
  name:"alert",
  initialState:{
    loading:false,
  },
  reducers:{
    showloading:(state=>{
      state.loading = true;
    }),
    hideloading:(state=>{
      state.loading = false;
    }),
 
  }
})
export default AlertSlice.reducer
export const {showloading,hideloading} = AlertSlice.actions