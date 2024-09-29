import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        token:sessionStorage.getItem('token')||null,
        menuList:[]
    },
    reducers:{
        //设置存储token
        setToken:(state,action)=>{
            state.token = action.payload//把token存到redux中
            sessionStorage.setItem('token',action.payload) //把token存到本地存储
        },
        //清除token
        clearToken:state=>{
            state.token=null;
            sessionStorage.removeItem('token')
        },
        //存菜单数据
        setMenu:(state,action)=>{
            state.menuList=action.payload
        }
    }
})

export const{setToken,clearToken,setMenu} = authSlice.actions
export default authSlice.reducer
