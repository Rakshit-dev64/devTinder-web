import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionSlice"
import requestsReducer from "./requestSlice"


const store = configureStore({
    reducer : {
    user : userReducer,
    feed : feedReducer,
    connections : connectionsReducer,
    requests : requestsReducer
    },

})

export default store