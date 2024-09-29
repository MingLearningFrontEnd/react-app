import { createSlice } from "@reduxjs/toolkit";

export const tenementSlice = createSlice({
    name:'tenement',

    initialState:{
        tenementData:{}
    },

    reducers:{
        setTenementData:(state,action)=>{
            state.tenementData= action.payload
        }
    }
})

export const {setTenementData} = tenementSlice.actions

export default tenementSlice.reducer