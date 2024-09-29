import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { message } from 'antd'
import { store } from "../../store";
//统一封装自定义axios实例 
const http: AxiosInstance = axios.create({
    baseURL: 'https://www.demo.com',
    timeout: 5000
})


//请求拦截器 用http实例 发请求的时候做一些统一的处理 比如在每个请求里统一加上一个参数 在请求发送之前发送
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { token } = store.getState().authSlice
    if(token){
        //Authorization 专门用来携带认证信息
        //Bearar表示一种认证类型，表示后面携带是一个令牌
        config.headers['Authorization'] =`Bearer${token}`
    }
    return config
})


//响应拦截器 数据回来之前
http.interceptors.response.use((response: AxiosResponse) => {
    // console.log(response)
    const res = response.data
    if (res.code !== 200) {
        message.error(res.code + ':' + res.message)
        return Promise.reject(new Error(res.message))
    }

    return response.data
})

export default http


