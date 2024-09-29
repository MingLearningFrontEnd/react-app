import { Card, Button, Table, Row, Col, Input, Tag, Progress, Badge, Popconfirm, message, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { TableProps, PaginationProps } from 'antd';
import { getTenementList } from '../../../api/tenementList';
import { deleteTenement } from '../../../api/tenementList';
import TenementForm from './tenmentForm';
import { useDispatch } from 'react-redux';
import { DataType } from './interface';
import { setTenementData } from '../../../store/tenement/tenementSlice';

interface searchType { //这个是两个input的数据类型
    bulidingName: string,
    person: string,
}

function Tenement() {
    const [dataList, setDataList] = useState<DataType[]>([]) //列表数据
    const [page, setPage] = useState<number>(1) //页码的数据
    const [pageSize, setPagesize] = useState<number>(10)//一页多少条数据
    const [total, setTotal] = useState<number>(0)
    const [formData, setFromData] = useState<searchType>({ bulidingName: '', person: '' }) //解构出这两个值
    const [loading, setLoading] = useState<boolean>(false) //表格加载
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    useEffect(() => {
        loadData()
    }, [page, pageSize])

    //加载列表数据
    const loadData = async () => {
        setLoading(true)
        const { data: { list, total } } = await getTenementList({ ...formData, page, pageSize })  //getTenementList这个接口需要传入bulidingName,person,page,pageSize这几个数据，这里用fromdata解构出前两个
        setLoading(false)
        setDataList(list)
        setTotal(total)
    }

    //删除列表数据 confirm
    const confirm = async (id: string) => { //接收要删除的那一行的id
        const { data } = await deleteTenement(id)
        message.success(data)
        loadData()
    }

    //拿到页面上面两个input的值
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFromData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    //页码事件
    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setPage(page)
        setPagesize(pageSize)
        loadData()

    }

    //重置
    const reset = () => {
        setFromData({ bulidingName: '', person: '' })
        setPage(1)
        setPagesize(10)
        loadData()
    }

    //编辑事件
    const edit = (record:DataType) => {
        setIsModalOpen(true)
        dispatch(setTenementData(record))
    }
    //关闭弹窗
    const hideModal = () => {
        setIsModalOpen(false)
        
    }



    const columns: TableProps<DataType>['columns'] = [  //列表数据
        {
            title: 'No.',
            key: 'index',
            render(value, record, index) {
                return index + 1
            }
        },
        {
            title: '楼宇名称',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: '负责人',
            key: 'person',
            dataIndex: 'person',
        },
        {
            title: '负责人电话',
            key: ' tel',
            dataIndex: 'tel',
        },

        {
            title: '使用状态',
            key: 'status',
            dataIndex: 'status',
            render: (value) => {
                if (value == '1') {
                    return <Tag color='#f50'>建设中</Tag>
                } else if (value == '2') {
                    return <Tag color='#2db7f5'>已竣工</Tag>
                } else if (value == '3') {
                    return <Tag color='#87d068'>使用中</Tag>
                }
            }
        },

        {
            title: '空置率',
            key: 'vacancyRate',
            dataIndex: 'vacancyRate',
            render: (value) => {
                return <Progress percent={value} status='active' />
            }
        },

        {
            title: '物业费率',
            key: ' propertyFee',
            dataIndex: 'propertyFee',
            render: (value) => {
                return <Badge color='green' text={value} />
            }
        },

        {
            title: '操作',
            key: 'operate',
            render(value, record, index) {
                return <>
                    <Button type='primary' onClick={() => edit(record)}>编辑</Button>
                    <Popconfirm
                        title='删除'
                        description="确认删除？"
                        okText='是'
                        cancelText='否'
                        onConfirm={() => confirm(record.id)} //将整个一行需要删除的数据的id传入
                    >
                        <Button type='primary' danger className='ml' >删除</Button>
                    </Popconfirm>
                </>

            }
        },
    ];


    return (
        <div className='tenement'>
            <TenementForm visible={isModalOpen} hideModal={hideModal} loadData={loadData} />
            <Card className='search'>
                <Row gutter={16}>
                    <Col span={6}>
                        <p>楼宇管理：</p>
                        <Input name='bulidingName' value={formData.bulidingName} onChange={handleChange} />
                    </Col>
                    <Col span={6}>
                        <p>负责人：</p>
                        <Input name='person' value={formData.person} onChange={handleChange} />
                    </Col>
                    <Col span={4}>
                        <Button type='primary' onClick={loadData}   >查询</Button>
                        <Button type='primary' danger className='ml' onClick={reset}>重制</Button>
                    </Col>
                </Row>
            </Card>

            <Card className='mt'>
                <Table
                    columns={columns}
                    dataSource={dataList}
                    rowKey={(record) => record.id}
                    loading={loading}
                    pagination={false}
                />
                <Pagination
                    className="fr mt"
                    total={total}
                    current={page}
                    pageSize={pageSize}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `共 ${total} 条`}
                    onChange={onChange}
                />
            </Card>
        </div>
    )
}

export default Tenement