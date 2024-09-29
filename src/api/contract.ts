import { post } from '../utils/http/request'

interface SearchData { //合同页需要给后端返回的数据
    contractNo: string,
    person: string,
    tel: string,
    page: number,
    pageSize: number
}

interface SearchData2 { //账单页需要给后端返回的数据
    page: number,
    pageSize: number,
    no: string,
    status: string,
    startDate: string,
    endDate: string
}


//获取合同列表数据
export function getContractList(data: SearchData) {
    return post('/contractList', data)
}



//获取账单列表数据
export function getBillList(data: SearchData2) {
    return post('/billList', data)
}

//删除账单
export function deleteBill(accountNo: string) {
    return post('/deleteBill', { accountNo })
}

//批量删除账单
export function batchDeleteBill(accountNos:React.Key[]) {
    return post('/batchDeleteBill', { accountNos })
}

//退款账单
export function refundBill(accountNo: string) {
    return post('/refundBill', { accountNo })
}
