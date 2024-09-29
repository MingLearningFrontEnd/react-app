import {useCallback, useEffect, useState} from'react'
type MyFormData={
    [key:string]:any
}


interface DataFetcher<T>{
   (arg:T&{page:number;pageSize:number}):Promise<any>
}

function useDatalist<T extends MyFormData,U>(initialFormData:T,fetchData:DataFetcher<T>){
    const [dataList, setDataList] = useState<U[]>([])//列表数据
    const [page, setPage] = useState<number>(1) //页码的数据
    const [pageSize, setPagesize] = useState<number>(10)//一页多少条数据
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false) //表格加载
    const [formData, setFormData] = useState<T>(initialFormData) //将搜索input写在一个usestate里

    const loadData=async()=>{
        setLoading(true)
        try {
            const {data:{list,total}} = await fetchData({page,pageSize,...formData})
            setDataList(list)
            setTotal(total)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
       
    }

    useEffect(()=>{
        loadData()
    },[page,pageSize,fetchData])

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value} = e.target
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const onChange = (page:number,pageSize:number)=>{
        setPage(page)
        setPagesize(pageSize)
    }

    const reset = () => {
        setPage(1)
        setPagesize(10)
        setFormData(initialFormData)

    }

    return{dataList,page,pageSize,loading,total,formData,setDataList,setPage,setPagesize,setTotal,setLoading,setFormData,loadData,onChange,handleChange,reset}
}

export default useDatalist