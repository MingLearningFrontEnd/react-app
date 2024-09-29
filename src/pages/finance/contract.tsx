import { Card, Row, Col, Table, Button, Input, Tag, Pagination} from 'antd'
import { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import { getContractList } from '../../api/contract'
import { setData,setTotal,setFormList,setCurrent,setSize} from '../../store/finance/contract'
import { useDispatch,useSelector} from 'react-redux'
import { PaginationProps } from 'antd'
import { useNavigate, useSearchParams} from 'react-router-dom'




interface SearchType{ //定义三个input的数据类型
    contractNo:string,
    person:string,
    tel:string
}

interface DataType{
    key:string,
    contractNo:string,
    type:string,
    name:string,
    startDate:string,
    endDate:string,
    jia:string,
    yi:string,
    status:string
}
function Contract() {
    const [formData,setFormData] =useState<SearchType>({contractNo:'', person:'', tel:''})//统一给三个input加上动态值 初始值位空
    const [page, setPage] = useState<number>(1)
    const [pageSize,setPageSize] = useState<number>(10)
    const [loading,setLoading] = useState<boolean>(false)
    // const [total,setTotal]=useState<number>()
    const dispatch = useDispatch()
    const {data,total,formList,current,size} = useSelector((state:any)=>state.contractSlice) //从redux中取值，解构出列表数据，数据总条数，3个input值，具体哪一页，和一页多少条数据
    const navigate = useNavigate()
    const [searchParams] = useSearchParams() //拿到从router问号后到值
    const isReturn = searchParams.get('return')//将问号后的值存进isReturn


    useEffect(()=>{
        if(!isReturn ||!data.length){     //判断是否从合同详情页回来和redux中有没有数据
            loadData(page,pageSize)   //接收page，pagesize
        }
        if(isReturn){ //判断如果从详情页返回，从redux中读取这些数据  缓存功能
            setFormData(formList)
            setPage(current)
            setPageSize(size)
        }
    },[])  //因为做了缓存处理，前面加了渲染数据的条件，page和pagesize不可以作为依赖项

    const loadData = async(page:number,pageSize:number)=>{ //因为每次页码变化要重新加载数据，要传入页码，和一页多少条数据
        setLoading(true)
       const {data:{list,total}} = await getContractList({...formData,page,pageSize}) //获取数据，并解构出list和total
       setLoading(false)
       dispatch(setData(list))  //用redux做缓存，将list和total存入redux
        dispatch(setTotal(total))  //用redux做缓存，将list和total存入redux
    }

    //三个input值
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{ //拿到三个input的值
        const {name, value} = e.target //e.target中解构处 name和value属性
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }))
        dispatch(setFormList({ //同步redux和页面中的数据 目的是从详情页返回时缓存的
            ...formData,
            [name]:value
        }))
}
    //页码分页
    const onChange:PaginationProps['onChange'] = (page,pageSize)=>{
        setPage(page)
        setPageSize(pageSize)
        dispatch(setCurrent(page))
        dispatch(setSize(pageSize))
        loadData(page,pageSize) //因为做了缓存，在页码变换的时候一定要重新加载数据
    }

    //跳转合同详情
    const detail=(record:DataType)=>{
     navigate('/finance/surrender' ,{state:{
        contractNo:record.contractNo,
        type:record.type,
        name:record.name,
        startDate:record.startDate,
        endDate:record.endDate,
        jia:record.jia,
        yi:record.yi,
        status:record.status
     }})


        
    }

    //重置
    const reset = ()=>{
        setFormData({contractNo:'', person:'', tel:''})
        setPage(1)
        setPageSize(10)
        loadData(1,10)
    }

    //表格表头
    const columns:TableProps<DataType>['columns'] = [
        {
            title:'No.',
            key:'index',
            render(value,record,index){
                return index+1
            },
            fixed:'left'
        },
        {
            title:'合同编号',
            dataIndex:'contractNo',
            key:'contractNo'
        },
        {
            title:'合同类别',
            dataIndex:'type',
            key:'type'
        },
        {
            title:'合同名称',
            dataIndex:'name',
            key:'name'
        },
        {
            title:'合同开始日期',
            dataIndex:'startDate',
            key:'startDate'
        },
        {
            title:'合同结束日期',
            dataIndex:'endDate',
            key:'endDate'
        },
        {
            title:'甲方',
            dataIndex:'jia',
            key:'jia'
        },
        {
            title:'乙方',
            dataIndex:'yi',
            key:'yi'
        },
        {
            title:'审批状态',
            dataIndex:'status',
            key:'status',
            render(value){
                if(value ==1){
                    return <Tag>未审批</Tag>
                }else if (value ==2){
                    return<Tag color='green'>审批通过</Tag>
                }else{
                    return<Tag color='red'>审批拒绝</Tag>
                }
          }
        },
        {
            title:'操作',
            key:'operate',
            fixed:'right',
            render(record){
                return<Button type='primary' size='small' onClick={()=>detail(record)}>合同详情</Button>
            }
        }

    ]
    return (
        <div>
            <Card className='search mb'>
                <Row gutter={16}>
                    <Col span={7}>
                        <p>合同编号:</p>
                        <Input name='contractNo' value={formData.contractNo} onChange={handleChange}/>
                    </Col>
                    <Col span={7}>
                        <p>联系人：</p>
                        <Input name='person' value={formData.person} onChange={handleChange}/>
                    </Col>
                    <Col span={7}>
                        <p>联系电话</p>
                        <Input name='tel' value={formData.tel} onChange={handleChange}/>
                    </Col>
                    <Col span={3}>
                           <Button type='primary' onClick={()=>loadData(page,pageSize)}>查询</Button>
                           <Button className='ml' onClick={reset}>重置</Button>

                        </Col>
                </Row>
            </Card>

            <Card>
                <Table 
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={loading}
                rowKey={(record)=>record.contractNo}
                scroll={{x:1200}}
                />
                <Pagination className='mt fr'
                showQuickJumper
                defaultCurrent={1}
                total={total}
                onChange={onChange}
                current={page}
                pageSize={pageSize}
                />
            </Card>

        </div>
    )
}

export default Contract