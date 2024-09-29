import { get } from "../utils/http/request" 


export function getOverAll(){ 
   return get('/overAll')
}

export function getEnegryData(){
    return get('/energyData')
}
