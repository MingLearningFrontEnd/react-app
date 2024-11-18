import {createSlice} from '@reduxjs/toolkit'

//存token使用redux和本地存储配合使用，初始数据在登陆请求完后收到后端的token数据将它存到redux和本地存储中
//redux刷新数据会丢失，所以就在从本地存储中获取token

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
