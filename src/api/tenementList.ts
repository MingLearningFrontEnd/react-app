//楼宇管理有关的接口
import { DataType } from '../pages/estate/tenement/interface'
import { post } from '../utils/http/request'


interface searchType {
    page: number,
    pageSize: number,
    bulidingName?: string,
    person?: string,
}

//获取数据
export function getTenementList(data: searchType) {
    return post('/tenementList', data)
}


//删除
export function deleteTenement(id: string) {
    return post('/deleteTenement', { id }) //对象形式 属性名和值是一样
}

//编辑

export function editTenement(data:DataType){
    return post('/editTenement',data )
}