//关于用户的接口
import { post ,get } from "../utils/http/request" 



interface LoginData{
username:string,
password:string,
}

interface AccountData{
    accountName:string
}


//用户登录
export function login(data:LoginData){
    return post('/login',data )
}

//用户菜单
export function getMenu(){
    return get('/menu')
}



//用户菜单权限
export function getAccountList(data:AccountData){
    return post('/accountList',data )
}
