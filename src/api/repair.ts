import { post, get } from "../utils/http/request";

interface SearchType {
    page: number,
    pageSize: number,
    orderNo?: string,
}

export function getRepairList(data: SearchType) { //获取列表数据
    return post('/repairlist', data)
}

export function repairFinish(id: string) { //完成后删除
    return post('/repairFinish', { id })
}

export function repairPerson() { //指派人员维修
    return get('/repairPerson')
}

export function repairAssigned(no: string) { //完成后删除
    return post('/repairAssigned', { no })
}