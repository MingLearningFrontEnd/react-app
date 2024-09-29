import { Card, Table, Row, Col, Input, Button, Pagination, Tag } from 'antd'
import type { TableProps } from 'antd'
import useDatalist from '../../hooks/useDataList'
import { getEquipmentList } from '../../api/equipment'

interface SearchType {//input数据类型
    name: string,
    person: string
}
interface DataType {//列表数据类型
    id: number
    no: string,
    name: string;
    person: string;
    tel: number;
    time: string;
    rest: string;
    status: string;
    last: string;
    type: string;
    from: string
}





function Equipment() {
    const {
        dataList,
        page,
        pageSize,
        loading,
        total,
        formData,
        setDataList,
        setPage,
        setPagesize,
        setTotal,
        setLoading,
        setFormData,
        loadData,
        onChange,
        handleChange,
        reset
    } = useDatalist<SearchType, DataType>({ name: '', person: '' }, getEquipmentList)


  
    const columns: TableProps<DataType>["columns"] = [ //列表表头数据
        {
            title: "No.",
            key: "index",
            render: (text, record, index) => index + 1,
            width:80
        },
        {
            title: '设备名称',
            dataIndex: 'name',
            key: 'name',
            width:170
        },
        {
            title: '设备编号',
            dataIndex: 'no',
            key: 'no',
            width:150
        },
        {
            title: '负责人',
            dataIndex: 'person',
            key: 'person',
            width:80
        },
        {
            title: '负责人电话',
            dataIndex: 'tel',
            key: 'tel',
            width:150
        },
        {
            title: '理论寿命',
            dataIndex: 'time',
            key: 'time',
            width:100
        },
        {
            title: '剩余寿命',
            dataIndex: 'rest',
            key: 'rest',
            width:100
        },
        {
            title: '使用状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                if (text == 1) {
                    return <Tag color="green">使用中</Tag>
                } else if (text == 2) {
                    return <Tag color="yellow">维护中</Tag>
                } else {
                    return <Tag color="red">已损坏</Tag>
                }
            }
        },
        {
            title: '最近保养日期',
            dataIndex: 'last',
            key: 'last',
            width:200
        },
        {
            title: '规格型号',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '生产厂家',
            dataIndex: 'from',
            key: 'from',
            width:200
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: () => {
                return <Button type="primary" size="small">详细</Button>
            },
            fixed:'right'
        },
    ]
    return (
        <div className='Equipment'>
            <Card className='search'>
                <Row gutter={16}>
                    <Col span={7}>
                        <p>设备名称：</p>
                        <Input name='name' value={formData.name} placeholder='请输入设备名称或编号' onChange={handleChange} />
                    </Col>
                    <Col span={7}>
                        <p>负责人：</p>
                        <Input name='person' value={formData.person} placeholder='请输入负责人姓名' onChange={handleChange} />
                    </Col>
                    <Col span={3}>
                        <Button type='primary' onClick={loadData}>查询</Button>
                        <Button className='ml' onClick={reset}>重置</Button>
                    </Col>
                </Row>
            </Card>
            <Card className='mt'>

                <Table
                    dataSource={dataList}
                    columns={columns}
                    pagination={false}
                    loading={loading}
                    rowKey={(record) => record.id}
                    scroll={{x:1500}}
                />

                <Pagination className='fr mt'
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

export default Equipment