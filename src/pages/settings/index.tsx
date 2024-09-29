import { Card, Input, Row, Col, Table, Button, Pagination, Popconfirm, Tree } from 'antd'
import type { TableProps, TreeDataNode, TreeProps } from 'antd'
import { getAccountList } from '../../api/user'
import useDatalist from '../../hooks/useDataList'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import withPermissions from '../../utils/http/withPermissions'
import SettingForm from './settingForm'




interface MenuType{ //menu的数据类型
    label:string,
    icon:string,
    key:string,
    children?:MenuType[]
}

interface DataType { //列表数据类型
    id: number,
    accountName: string,
    auth: string,
    person: string,
    tel: string,
    department: string,
}

interface SearchType { //input数据类型
    accountName: string,
}


const treeData: TreeDataNode[] = [ //树形图所有菜单的静态数据
    {
        title: '工作台',
        key: '/dashboard',
    },
    {
        title: '租户管理',
        key: '/users',
    },
    {
        title: '物业管理',
        key: '/estate',
        children: [
            {
                title: "楼宇管理",
                key: "/estate/tenement"
            },
            {
                title: "房间管理",
                key: "/estate/room"
            },
            {
                title: "车辆信息",
                key: "/estate/car"
            }

        ]
    },
    {
        title: '报修管理',
        key: '/repair',
    },
    {
        title: '财务管理',
        key: '/finance',
        children: [
            {
                title: "合同管理",
                key: "/finance/contract"
            },
            {
                title: "账单管理",
                key: "/finance/bill"
            }
        ]
    },
    {
        title: '招商管理',
        key: '/merchants',
    },
    {
        title: '运营管理',
        key: '/operation',
        children: [
            {
                title: "运营总览",
                key: "/operation/all"
            },
            {
                title: "文章发布",
                key: "/operation/article"
            },
            {
                title: "内容评论",
                key: "/operation/comments"
            }
        ]
    },
    {
        title: '设备管理',
        key: '/equipment',
    },
    {
        title: '能源消耗',
        key: '/energy',
    },
    {
        title: '系统设置',
        key: "/settings",
    },
    {
        title: '个人中心',
        key: "/personal",
    },
];

function handleKeys(data: any) { //将redux中的用户菜单权限处理成需要的格式，只取出里面的key，返回一个keys是需要的类型
    let keys: string[] = []
    data.forEach((item: any) => {
        if (item.children && item.children.length > 0) {
            const childKey: string[] = handleKeys(item.children)
            keys = keys.concat(childKey)
        } else {
            keys.push(item.key)
        }
    })
    return keys
}



function Settings() {
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]) //定义选中的keys
    const { menuList } = useSelector((state: any) => state.authSlice) //从redux中取出每个账号权限的菜单
    const [accountName, setAccountName] = useState<string>('当前用户')//显示更改谁的权限
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    useEffect(() => {//挂载数据
        setCheckedKeys(handleKeys(menuList)) //这里不能直接将redux中的menulist传入，必须先处理成需要的格式
    }, [])


    const { //调用自定义hooks
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
    } = useDatalist<SearchType, DataType>({ accountName: '' }, getAccountList)

   

    const edit = (menu:MenuType[],accountName:string) => {  //更改权限事件，接收menu和accountname两个参数
        setAccountName(accountName) //变更网页显示的需要更改权限的账户名
        const newCheckedKeys=handleKeys(menu)//用handlekey函数处理menu
        setCheckedKeys(newCheckedKeys)//将处理好的menu传入更改选择的key
    }
 
    const onCheck:TreeProps['onCheck'] =(checkedKeys)=>{ //tree让自己可选择打勾的事件
        setCheckedKeys(checkedKeys as React.Key[]) //将自己选中的key传入key里
    }

    const handleConfirm = () => { //确认提交修改事件
        console.log(checkedKeys,accountName)
        
    }

    const hideModal = ()=>{
        setIsModalOpen(false)

    }
    const add = ()=>{
        setIsModalOpen(true)
    }
    
    //按钮权限
    const AuthBotton:React.FC<any> = withPermissions(JSON.parse(sessionStorage.getItem('btnAuth') as string),['delete'])(Button)
    
    const columns = [ //列表表头
        {
            title: 'No.',
            key: 'index',
            render(value: any, record: any, index: any) {
                return index + 1
            }
        },
        {
            title: '账号名称',
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: '所属权限',
            dataIndex: 'auth',
            key: 'auth',
        },
        {
            title: '使用人',
            dataIndex: 'person',
            key: 'person',
        },
        {
            title: '使用人电话',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '操作',
            key: 'operate',
            render(value: MenuType, record: any) {
                return <>
                    <Button size='small' type='primary' onClick={() => edit(record.menu , record.accountName)}>修改权限</Button>
                    <Popconfirm
                        title='操作提示'
                        description='确认要删除当前账号吗？'
                        okText='是'
                        cancelText='否'
                    // onConfirm={}
                    >
                        <AuthBotton size='small' type='primary' danger className='ml'>删除账号</AuthBotton>
                        {/* <Button size='small' type='primary' danger className='ml'>删除账号</Button> */}
                    </Popconfirm>
                </>
            }
        }

    ]
    return (
        <div className="settings">
            <SettingForm visible={isModalOpen} hideModal={hideModal} loadData={loadData}/>
            <Card>
                <Row gutter={16} >
                    <Col span={8}>
                        <Input placeholder='请输入账户名' value={formData.accountName} name='accountName' onChange={handleChange} />
                    </Col>
                    <Col span={8}>
                        <Button type='primary' onClick={loadData}>查询</Button>
                    </Col>
                    <Col span={8} className='tr'>
                        <Button type='primary' onClick={add}>新增账号</Button>
                    </Col>
                </Row>
            </Card>

            <Row gutter={16} className='mt'>
                <Col span={8}>
                    <Card title={accountName + ':所拥权限' } >
                        <Tree
                            checkable
                            treeData={treeData}
                            checkedKeys={checkedKeys} //选择上的key
                            onCheck={onCheck}
                        />
                    </Card>
                    <Card className='mt'>
                        <Popconfirm
                            title='操作提示'
                            okText='是'
                            cancelText='否'
                            description={`您确认要修改${accountName}用户的权限吗？`}
                            onConfirm={handleConfirm}
                        >   <Button type='primary'>提交修改</Button>
                        </Popconfirm>

                    </Card>
                </Col>
                <Col span={16}>
                    <Card>
                        <Table
                            dataSource={dataList}
                            columns={columns}
                            pagination={false}
                            loading={loading}
                            rowKey={record => record.id}
                        />

                        <Pagination
                            className='fr mt'
                            showQuickJumper
                            showSizeChanger
                            total={total}
                            current={page}
                            pageSize={pageSize}
                            showTotal={(total) => `共${total}条`}
                            onChange={onChange}
                        />
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default Settings