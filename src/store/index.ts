import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import userSlice from "./user/userSlice";
import tenementSlice from "./tenement/tenementSlice";
import  contractSlice  from "./finance/contract";

export const store  = configureStore({
    reducer:{
        authSlice,
        userSlice,
        tenementSlice,
        contractSlice,
     
    }
})