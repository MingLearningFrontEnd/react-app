import { post } from "../utils/http/request";
import type { DataType } from "../pages/users/interface";

interface searchType{
    page:number,
    pageSize:number,
    compangName?:string,
    contact?:string,
    tel?:string,
}

//租户列表接口
export function getUserList(data:searchType){
 return post('/userList',data)
}



//删除租户企业列表接口
export function deleteUser(id:string){
        return post('/deleteUser',{id}) //对象形式 属性名和值是一样
}

//批量删除租户企业列表接口
export function batchDeleteUser(ids:React.Key[]){
        return post('/batchDeleteUser',{ids})
}

//编辑，新增租户企业接口
export function editUser(data:DataType){
        return post('/editUser',data)
}

