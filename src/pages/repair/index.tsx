import{Card, Row ,Col , Table, Input, Button ,Tag,Pagination, message} from 'antd'
import type { TableProps } from 'antd'
import { getRepairList ,repairFinish} from '../../api/repair';
import { useEffect, useState ,useCallback} from 'react';
import RepairForm from './repairForm';



interface DataType {
    orderNo: string;
    name: string;
    tel: string;
    address: string;
    description: string;
    status: string;
    time: string;
}



function Repair(){

    const [dataList ,setDataList] = useState<DataType[]>([])
    const [page,setPage] = useState<number>(1)
    const [pageSize,setPageSize] = useState<number>(10)
    const [total,setTotal] = useState<number>(0)
    const [orderNo,setOrderNo] = useState<string>('')
    const [visible,setVisible] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false) 
   
  
    useEffect(()=>{
        loadData()
    },[])

    const loadData = async()=>{
           const {data:{list,total}} = await  getRepairList({page, pageSize, orderNo}) //前面是从后端返回的数据中解构出的，后面的是要传给后端的数据
          setDataList(list)
          setTotal(total)
    }

    const finish = async(orderNo:string)=>{
        const {data} = await repairFinish(orderNo)
        message.success(data)
        loadData()
    }


    const handleClick = ()=>{
        setIsModalOpen(true)
    }


    const hideModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

   

    const columns: TableProps<DataType>['columns'] = [  //表头
        {
            title: "No.",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: '维修单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
    
        },
        {
            title: '报修人',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '报修人电话',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: '报修地址',
            dataIndex: 'address',
            key: 'address',
    
        },
        {
            title: '故障描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '维修状态',
            dataIndex: 'status',
            key: 'status',
            render:(value,record)=>{
                if(value==1){
                    return  <Tag color="#f50" >待维修</Tag>
                }else if(value==2){
                    return  <Tag color="#2db7f5">维修中</Tag>
                }else{
                    return  <Tag color="green">已完成</Tag>
                }
            }
        },
        {
            title: '报修时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (value, record) => {
                if(record.status=="1"){
                    return <>
                    <Button type="primary" size="small" onClick={handleClick}>指派</Button>
                </>
                }else if(record.status=="2"){
                    return <>
                     <a >维修中...</a>
                </>
                }else{
                    return  <Button type="primary" size="small" onClick={()=>finish(record.orderNo)}>完成</Button>
                }
    
               
            }
        },
    
    ];
    return(
        <div className='repair'>
            <RepairForm visible={isModalOpen} hideModal={hideModal}   />
            <Card>
                <Row>
                    <Col span={8}>
                        <Input placeholder='请输入维修单号'/>
                    </Col>
                    <Col span={8}>
                    <Button type='primary' className='ml'>查询</Button>
                    </Col>
                </Row>
            </Card>

            <Card className='mt'>
                <Table
                    columns={columns}
                    dataSource={dataList}
                    pagination={false}
                />
                <Pagination 
                    className='fr mt'
                    current={page}
                    pageSize={pageSize}
                    showQuickJumper
                    showSizeChanger
                    total={total}
                />
            </Card>
        </div>
    )
}

export default Repair