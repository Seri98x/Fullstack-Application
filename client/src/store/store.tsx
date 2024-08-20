import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import prodReducer from "./productSlice"

export const store = configureStore({
    reducer : {
        auth: authReducer,
        prod: prodReducer
    }
})



export type AppDispatch = typeof store.dispatch;


export default store;
console.log(store.getState());
