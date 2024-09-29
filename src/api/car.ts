import { post } from "../utils/http/request";

interface SearchType{ //
    page:number,
    pageSize:number,
    carPlate?:string,
}


export function getCarCharge(data:SearchType){ //获取充电记录列表
    return post('/car1',data)
} 

export function getCarData(data:SearchType){ //园内车辆列表
    return post('/car2',data)
}


export function deleteCar(id:string){ //删除园内车辆
    return post('/deleteCar',{id})
}

