import React from 'react'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface Iprops{
    allowed:boolean,
    redirectTo:string,
    children:React.ReactNode

}
function RequireAuth({allowed,redirectTo,children}:Iprops) {
    const { token } = useSelector((state: any) => state.authSlice)
    const islogin = token ? true : false
    const navigate = useNavigate()
    useEffect(()=>{
        //allowed表示当前路由是否需要登录，islogin表示用户有没有登录
        if(allowed!==islogin){
            navigate(redirectTo)
        }
    },[allowed,islogin,redirectTo])

    return allowed ===islogin?<>{children}</>:<></>
}

export default RequireAuth