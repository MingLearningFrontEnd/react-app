import { post } from "../utils/http/request";


interface SearchType {
    accountName: string,
    auth: string,
    person: string,
    tel: string,
    department: string
}

export function addAccount(data:SearchType) {
    return post('/addAcount')
}