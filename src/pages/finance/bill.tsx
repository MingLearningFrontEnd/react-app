import { Card, Row, Col, Input, Table, Pagination, Statistic, DatePicker, Select, Button, Tag, message, Popconfirm } from 'antd'
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { getBillList, deleteBill, batchDeleteBill ,refundBill} from '../../api/contract'
import { useEffect, useMemo, useState } from 'react'
import { exportToExcel } from '../../utils/exportToExcel/exportToExcel'

const { RangePicker } = DatePicker

interface DataType { //列表表头数据类型
    key: string,
    accountNo: string,
    status: string,
    roomNo: string,
    carNo: string,
    tel: string,
    costName1: string,
    costName2: string,
    costName3: string,
    startDate: string,
    endDate: string,
    preferential: number,
    money: number,
    pay: string

}
interface SearchType {
    date: string[],
    no: string,
    status: string,
    page: number,
    pageSize: number,
}
function Bill() {
    const [dataList, setDataList] = useState<DataType[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [loading, setLoding] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [formData, setFormData] = useState<SearchType>({ date: [], no: '', status: '', page: 1, pageSize: 10 })
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedRows, setSelectedRows] = useState<any>()
    const header = ["accountNo", "status", 'roomNo', 'carNo', 'tel', 'costName1', 'costName2', 'costName3', 'startDate', 'endDate', 'preferential', 'money', 'pay'] //倒出excel的表头


    useEffect(() => { //挂载数据
        loadData()
    }, [page, pageSize])

    const loadData = async () => {  //获取加载数据
        setLoding(true)
        const { data: { list, total } } = await getBillList({ page, pageSize, startDate: formData.date[0], endDate: formData.date[1], no: formData.no, status: formData.status })//因为后端定义了开始日期和结束日期， 但是date组件返回的是一个数组，所以得拆开，不能直接写formData 
        setLoding(false)
        setDataList(list)
        setTotal(total)
    }


    //因为这次三个表单不是三个input,不可以统一做
    const handleChange = (value: any, dateString: any) => {  //时间选择事件  
        setFormData(prevState => ({
            ...prevState,
            date: dateString
        }))
    }
    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => { //input事件
        const { value } = e.target
        setFormData(prevState => ({
            ...prevState,
            no: value
        }))

    }
    const handleChange2 = (value: string) => {  //select下拉框事件
        setFormData(prevState => ({
            ...prevState,
            status: value
        }))
    }


    const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: any) => {   //勾选表格事件
        console.log(selectedRowKeys, selectedRows)
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
    }
    const rowSelection = { //表格勾选
        selectedRowKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true //跨页勾选

    }

    const onChange = (page: number, pageSize: number) => {  //分页onchange事件
        setPage(page)
        setPageSize(pageSize)
    }

    const handleDelete = async (accountNo: string) => { //单个删除
        const { data } = await deleteBill(accountNo)
        message.success(data)
        loadData()
    }

    const disabled = useMemo(() => { //倒出excel和批量删除按钮disabled功能
        return selectedRowKeys.length?false:true
    }, [selectedRowKeys])

    const batchDelete = async () => { //批量删除
        const {data} = await batchDeleteBill(selectedRowKeys)
       message.success(data)
       loadData()
    }

    const handleRefund= async (accountNo:string)=>{
        const {data} =   await refundBill(accountNo)
        message.success(data)
        loadData()
    }


    //表格表头
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            key: 'index',
            render(value, record, index) {
                return index + 1
            },
            width: 80,
            fixed: 'left'

        },
        {
            title: '账单号',
            dataIndex: 'accountNo',
            key: 'accountNo',
            width: 150,
        },
        {
            title: '缴费状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render(value) {
                return value == 1 ? <Tag color='green'>已缴费</Tag> : <Tag color='red' >未缴费</Tag>
            }
        },
        {
            title: '房屋号',
            dataIndex: 'roomNo',
            key: 'roomNo',
            width: 100,

        },
        {
            title: '车位号',
            dataIndex: 'carNo',
            key: 'carNo',
            width: 100,

        },
        {
            title: '手机号',
            dataIndex: 'tel',
            key: 'tel',
            width: 150,

        },
        {
            title: '物业费（年）',
            dataIndex: 'costName1',
            key: 'costName1',
            width: 150,
        },
        {
            title: '车位费',
            dataIndex: 'costName2',
            key: 'costName2',
            width: 150,
        },
        {
            title: '房屋租金',
            dataIndex: 'costName3',
            key: 'costName3',
            width: 150,
        },
        {
            title: '开始时间',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 150,
        },
        {
            title: '优惠金额',
            dataIndex: 'preferential',
            key: 'preferential',
            width: 150,
        },
        {
            title: '合计应收金额',
            dataIndex: 'money',
            key: 'money',
            width: 150,
        },
        {
            title: '支付方式',
            dataIndex: 'pay',
            key: 'pay',
            width: 100,
        },
        {
            title: '操作',
            key: 'operate',
            width: 230,
            fixed: 'right',
            render(value, record) {
                return <>
                    <Button type='primary' size='small' onClick={() => exportToExcel([record], header)} >打印</Button>
                    <Popconfirm
                        title='删除'
                        description="确认删除？"
                        okText='是'
                        cancelText='否'
                        onConfirm={() => handleDelete(record.accountNo)}>
                        <Button type='primary' size='small' danger className='ml mr'>账单作废</Button>
                    </Popconfirm>
                    <Button type='primary' size='small'  onClick={()=>handleRefund(record.accountNo)}>退款</Button>
                </>
            }
        },
    ]
    return (
        <div className='bill'>
            <Card >
                <Row gutter={16}>

                    <Col span={6}>
                        <Statistic
                            title='应收账单金额'
                            value='16,876.38' />
                    </Col>

                    <Col span={6}>
                        <Statistic
                            title='已缴账单金额'
                            value='6,952.00' />
                    </Col>

                    <Col span={6}>
                        <Statistic
                            title='已退账单金额'
                            value='2,355.23' />
                    </Col>

                    <Col span={6}>
                        <Statistic
                            title='未缴账单金额'
                            value='9,962.00' />
                    </Col>
                </Row>
            </Card>

            <Card className='mt search' >
                <Row gutter={16}>
                    <Col span={6}>
                        <p>账单日期：</p>
                        <RangePicker style={{ width: '100%' }} onChange={handleChange} />
                    </Col>
                    <Col span={6}>
                        <p>房/车号：</p>
                        <Input placeholder='请输入门牌号或车位号' onChange={handleChange1} value={formData.no} />
                    </Col>
                    <Col span={6}>
                        <p>缴费情况：</p>
                        <Select style={{ width: '100%' }}
                            onChange={handleChange2}
                            options={[
                                { value: '1', label: '全部' },
                                { value: '2', label: '已缴费' },
                                { value: '3', label: '未缴费' }
                            ]}>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Button type='primary' onClick={loadData}>查询</Button>
                        <Button className='ml'>重置</Button>

                    </Col>
                </Row>
            </Card>

            <Card className='mt'>
                <Button type='primary' icon={<DownloadOutlined />} disabled={disabled} onClick={() => exportToExcel(selectedRows, header)}>导出为Excel</Button>
                <Button type='primary' danger icon={<DeleteOutlined />} className='ml' disabled={disabled} onClick={batchDelete}> 批量作废</Button>

            </Card>

            <Card className='mt'>
                <Table
                    dataSource={dataList}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 1800 }}
                    loading={loading}
                    rowKey={(record) => record.accountNo}
                    rowSelection={rowSelection}
                />



                <Pagination
                    className='fr mt'
                    showQuickJumper
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={onChange}
                />
            </Card>
        </div>
    )
}

export default Bill