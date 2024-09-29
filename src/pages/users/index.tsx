import { Card, Row, Col, Input, Button, Table, Pagination, Tag, Popconfirm, message } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TableProps } from 'antd';
import type { DataType } from "./interface";
import { getUserList, deleteUser, batchDeleteUser } from "../../api/userList";
import type { PaginationProps } from 'antd';
import UserForm from "./userForm";
import React from "react";
import { useDispatch} from "react-redux"; 
import { setuserData } from "../../store/user/userSlice";






interface SearchType { //这个是三个input的数据类型
    companyName: string,
    contact: string,
    phone: string,
}

function Users() {
    const [dataList, setDataList] = useState<DataType[]>([])//列表数据
    const [page, setPage] = useState<number>(1) //页码的数据
    const [pageSize, setPagesize] = useState<number>(10)//一页多少条数据
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false) //表格加载
    const [formData, setFormData] = useState<SearchType>({ companyName: '', contact: '', phone: '' }) //将搜索input的三个值直接写在一个usestate里
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) //选中的列表
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false) //弹窗打没打开
    const [title, setTitle] = useState<string>('') //弹窗title
    const dispatch = useDispatch() //编辑按钮选中该条数据并存入redux中

    //第一次加载，挂载数据
    useEffect(() => {
        loadData()
    }, [page, pageSize])


    //调用接口，获取数据
    const loadData = async () => {
        setLoading(true)  //数据没回来的时候 表格显示加载动画
        const { data: { list, total } } = await getUserList({ ...formData, page, pageSize }) //将formdata拆开，然后和page，pagesize一起的数据一起传入
        setLoading(false) //数据回来了不现实加载动画
        setDataList(list)
        setTotal(total)
    }


    //拿到页面上面三个input的值
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value  //[name]是因为input的name和interface里面的属性名一样
        }))
    }

    //列表打勾
    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,

    }

    //页码事件
    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setPage(page)
        setPagesize(pageSize)
        loadData()
    }

    //重置方法
    const reset = () => {
        setFormData({ companyName: '', contact: '', phone: '' })
        setSelectedRowKeys([])
        setPage(1)
        setPagesize(10)
        loadData()
    }

    //删除confirm事件
    const confirm = async (id: string) => { //接收要删除那一行的id
        const { data } = await deleteUser(id)
        message.success(data) //提示操作成功
        loadData()
    }

    //批量删除按钮disabled 
    const disabled = useMemo(() => {
        return selectedRowKeys.length ? false : true //有选中的row就false
    }, [selectedRowKeys])

    //批量删除
    const batchDelete = async () => {
        const { data } = await batchDeleteUser(selectedRowKeys)
        message.success(data)
        loadData()
    }

    //编辑
    const edit = (record: DataType) => {
        setIsModalOpen(true)
        setTitle('编辑企业')
        dispatch(setuserData(record)) //点击编辑按钮，将这个row的数据存入redux中

    }

    //新增
    const add = () => {
        setIsModalOpen(true)
        setTitle('新增企业')
        dispatch(setuserData({}))
    }

    //关闭弹窗函数，传入modal子组件
    // const hideModel=()=>{
    //     setIsModalOpen(false)
    // }

    //关闭弹窗函数，传入modal子组件 用usecallback优化
    const hideModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])


    

    //列表数据
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            key: 'index',
            render(value, record, index) {
                return index + 1
            },
            fixed:'left',
            width:70
        },

        {
            title: '客户名称',
            key: 'name',
            dataIndex: 'name',
            width:100

        },
        {
            title: '经营状态',
            key: 'status',
            dataIndex: 'status',
            render(value) {

                if (value == 1) {
                    return <Tag color='green'>营业中</Tag>
                } else if (value == 2) {
                    return <Tag color='#f50'>暂停营业</Tag>
                } else {
                    return <Tag color='red'>已关闭</Tag>
                }

            },
            width:120

        },
        {
            title: '联系电话',
            key: 'tel',
            dataIndex: 'tel',
            width:150


        },
        {
            title: '所属行业',
            key: 'business',
            dataIndex: 'business',
            width:100

        },
        {
            title: '邮箱',
            key: 'email',
            dataIndex: 'email',
            width:210

        },
        {
            title: '统一信用代码',
            key: 'creditCode',
            dataIndex: 'creditCode',
            width:210

        },
        {
            title: '工商注额号',
            key: ' industryNum',
            dataIndex: 'industryNum',
            width:210

        },
        {
            title: '组织机构代码',
            key: ' organizationCode',
            dataIndex: 'organizationCode',
            width:210

        },
        {
            title: '法人名',
            key: 'legalPerson',
            dataIndex: 'legalPerson',
            width:100

        },
        {
            title: '操作',
            key: 'operate',
            fixed:'right',
            width:150,
            render(value, record, index) {
                return <>
                    <Button type='primary' size="small" onClick={() => edit(record)}>编辑</Button>
                    <Popconfirm
                        title='删除'
                        description="确认删除？"
                        okText='是'
                        cancelText='否'
                        onConfirm={() => confirm(record.id)} //将整个一行的数据的id传入
                    >
                        <Button type='primary' danger size='small' className="ml">删除</Button>
                    </Popconfirm>


                </>
            },

        },
    ];

    return (
        <div className="users" >
            <MyUserFrom visible={isModalOpen} hideModal={hideModal} title={title} loadData={loadData}/> {/**用了react.memo优化 */}
            <Card className="search">
                <Row gutter={16}>
                    <Col span={7}>
                        <p>企业名称：</p>
                        <Input name='companyName' value={formData.companyName} onChange={handleChange}></Input>
                    </Col>
                    <Col span={7}>
                        <p>联系人：</p>
                        <Input name='contact' value={formData.contact} onChange={handleChange}></Input>
                    </Col>
                    <Col span={7}>
                        <p>联系电话：</p>
                        <Input name='phone' value={formData.phone} onChange={handleChange}></Input>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={loadData}>查询</Button>
                        <Button className="ml" onClick={reset}>重置</Button>
                    </Col>
                </Row>
            </Card>

            <Card className="mt tr">
                <Button type="primary" onClick={add}>新增企业</Button>
                <Button type="primary" danger className="ml" disabled={disabled} onClick={batchDelete}>批量删除</Button>
            </Card>

            <Card className="mt">
                <Table
                    dataSource={dataList}
                    columns={columns}
                    rowKey={(record) => record.id}
                    loading={loading}
                    rowSelection={rowSelection}
                    pagination={false}
                    scroll={{x:1500}}
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
const MyUserFrom = React.memo(UserForm) 
export default Users