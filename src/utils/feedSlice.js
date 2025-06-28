import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addFeed : (state, action) => {
            return action.payload;
        }, 
        removeUserFromFeed : (state, action) => {
            const newFeed = state.filter((r)=> r._id != action.payload) // r is every user in my feed and this filter function will remove the user that has id equals to the id provided in action.payload
            return newFeed;
        }
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;