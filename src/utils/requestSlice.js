import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "requests",
    initialState : null,
    reducers : {
        addRequest : (state, action) => action.payload,
        removeRequest : (state, action) => {
            const newArray = state.filter((r) => r._id != action.payload); // action.payload is the id to be deleted and r is the each element in the array (current state of store)
            return newArray;
        }
    }
})

export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;