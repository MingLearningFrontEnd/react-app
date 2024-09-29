import { post } from "../utils/http/request";


//获取房间列表
export function getRoomList(roomid:string){
return post('/roomList',{roomid})
}