import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addFeed : (state, action) => {
            return action.payload;
        }, 
        removeUserFromFeed : (state, action) => {
            const newFeed = state.filter((r)=> r._id != action.payload) // r is every user in my feed and this filter function will keep all the users whose id is not equal to action.payload
            return newFeed;
        },
        resetFeed : () => null
    }
})

export const {addFeed, removeUserFromFeed, resetFeed} = feedSlice.actions;
export default feedSlice.reducer;