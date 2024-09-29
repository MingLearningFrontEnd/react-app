import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


export function exportToExcel(data:any,header:string[]){//接收两个形参，一个数据，一个表头
    const ws = XLSX.utils.json_to_sheet(  //创建一个工作表，json_to_sheet接收两个参数，第一个是选中列的数据，第二个是表头
        data, {header} //es6写法，对象里key和value一样直接写一个
    )

    const wb = XLSX.utils.book_new() //创建一个excel工作簿
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')  //将ws工作表，加到wb工作簿中，sheet1是工作表名

   const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }) //把数据转换成二进制

    saveAs(new Blob([buf],{type:'application/octet-stream'}),'selected-data.xlsx') //保存与下载
}