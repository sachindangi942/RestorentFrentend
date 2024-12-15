import { createSlice }  from "@reduxjs/toolkit";

const FormSlice = createSlice({
    name: "form",
    initialState: {
        formData: {}
    },
    reducers: {
        setFormData: ((state, action) => {
            const {id,value} = action.payload;
            return {...state,[id]:value}
        })
    }
});

export const {setFormData} = FormSlice.actions;
export default FormSlice.reducer;