import { Card, Row, Col, Table, Input, Button, Tabs, Image, Pagination, Popconfirm, message } from 'antd'
import type { TabsProps, TableProps } from 'antd';
import come from '../../../assets/come.jpg'
import { getCarCharge, getCarData, deleteCar } from '../../../api/car';
import { useEffect, useState } from 'react';
import type { PaginationProps } from 'antd'




interface DataType { //充电记录的数据类型
    key: string;
    orderNo: string;
    date: string;
    carNo: string;
    type: string;
    startDate: string;
    time: string;
    count: string;
    cost: string;
}
interface DataType2 {//园内车辆管理数据类型
    id: string,
    key: string;
    carNo: string;
    name: string;
    tel: string;
    type: string;
    rest: string;
    time: string;
    pic: string;
}




function Car() {
    const [chargeData, setChargeData] = useState<DataType[]>([])
    const [carData, setCarData] = useState<DataType2[]>([])
    const [carPlate, setCarPlate] = useState<string>('')
    const [page, setPage] = useState<number>(1) //页码的数据
    const [pageSize, setPagesize] = useState<number>(10)//一页多少条数据
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [isChargeData, setIsChargeData] = useState<boolean>()





    useEffect(() => { //挂载数据
        loadChargeData()
        loadCarData()
    }, [page, pageSize])

    const loadChargeData = async () => { //加载充电记录列表数据
        setLoading(true)
        const { data: { list, total } } = await getCarCharge({ page, pageSize, carPlate })
        setLoading(false)
        setChargeData(list)
        setTotal(total)
        setIsChargeData(true)
    }

    const loadCarData = async () => { //加载充电记录列表数据
        setLoading(true)
        const { data: { list, total } } = await getCarData({ page, pageSize, carPlate })
        setLoading(false)
        setCarData(list)
        setTotal(total)
        setIsChargeData(false)
    }


    const onChange: PaginationProps['onChange'] = (page, pageSize) => {//页码onchange事件
        setPage(page)
        setPagesize(pageSize)
        loadChargeData()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //input值
        setCarPlate(e.target.value)
    }

    const handleClick = () => {//查询按钮
        if (isChargeData) {
            console.log('充电记录', loadChargeData())
        } else {
            console.log('园内车辆', loadCarData())
        }
    }

    const confirm = async (id: string) => { //删除事件
        const { data } = await deleteCar(id)
        message.success(data) //提示操作成功
        loadCarData()
    }




    const columns: TableProps<DataType>['columns'] = [ //充电记录表头
        {
            title: "No.",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',

        },
        {
            title: '订单日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '车牌号码',
            dataIndex: 'carNo',
            key: 'carNo',
        },
        {
            title: '车辆类型',
            dataIndex: 'type',
            key: 'type',

        },
        {
            title: '充电开始时间',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: '充电时长',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '充电量',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '充电费用',
            dataIndex: 'cost',
            key: 'cost',
        },
    ];

    const columns2: TableProps<DataType2>['columns'] = [ //园内车辆管理表头
        {
            title: "No.",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: '车牌号',
            dataIndex: 'carNo',
            key: 'carNo',

        },
        {
            title: '车主姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '车主电话',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: '租赁类型',
            dataIndex: 'type',
            key: 'type',

        },
        {
            title: '租期剩余',
            dataIndex: 'rest',
            key: 'rest',
        },
        {
            title: '超期天数',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '入场照片',
            dataIndex: 'pic',
            key: 'pic',
            render: (value) => <Image
                src={come}
                width={50}
                placeholder={
                    <Image
                        preview={false}
                        src={come}
                        width={150}
                    />
                }
            />
        },

        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (value, record, index) => {
                return <>
                    <Popconfirm
                        title='删除'
                        description="确认删除？"
                        okText='是'
                        cancelText='否'
                        onConfirm={() => confirm(record.id)} //将选中的一行的id传入
                    >
                        <Button type="primary" size="small" danger >删除</Button>
                    </Popconfirm>

                </>
            }
        },

    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '充电记录',
            children: <>
                <Table
                    columns={columns}
                    dataSource={chargeData}
                    loading={loading}
                    pagination={false}
                    rowKey={record => record.orderNo}
                />
                <Pagination
                    className='fr mt'
                    showQuickJumper
                    showSizeChanger
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={onChange}
                />
            </>
        },
        {
            key: '2',
            label: '园内车辆列表',
            children: <>
                <Table columns={columns2}
                    dataSource={carData}
                    loading={loading}
                    pagination={false}
                    rowKey={record => record.name}

                />
                <Pagination
                    className='fr mt'
                    showQuickJumper
                    showSizeChanger
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={onChange}
                />
            </>,
        },
    ];
    return (
        <div className='car'>
            <Card>
                <Row>
                    <Col span={8}>
                        <Input placeholder='请输入车牌号' name='carPlate' value={carPlate} onChange={handleChange} />
                    </Col>
                    <Col span={8}>
                        <Button type='primary' className='ml' onClick={handleClick}>查询</Button>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Tabs
                    items={items}
                >
                </Tabs>
            </Card>
        </div>
    )
}

export default Car