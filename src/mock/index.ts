import Mock from 'mockjs'

//登录接口
Mock.mock('https://www.demo.com/login', 'post', (options: any) => {  //options里面是前端传来的数据 结构赋值结出来username和password
    const { username, password } = JSON.parse(options.body)
    if (username === 'admin' && password === 'admin123123') {
        return {
            code: 200,
            message: '登录成功',
            data: {
                username: '赵铁柱',
                token: 'mocktoken123456admin',
                btnAuth: ['add', 'edit', 'delete']
            }
        }
    } else if (username === 'manager' && password === 'manager123123') {
        return {
            code: 200,
            message: '登录成功',
            data: {
                username: 'manager',
                token: 'mocktoken123456manager',
                btnAuth: ['add', 'edit']

            }
        }
    } else if (username === 'user' && password === 'user123123') {
        return {
            code: 200,
            message: '登录成功',
            data: {
                username: 'user',
                token: 'mocktoken123456user',
                btnAuth: ['add']

            }
        }
    } else {
        return {
            code: 401,
            message: '用户名或密码有误',
            data: ''
        }
    }
})



//菜单数据
const menuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "财务管理",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "合同管理",
                "key": "/finance/contract",

            },
            // {
            //     "icon": "FrownOutlined",
            //     "label": "合同详情",
            //     "key": "/finance/surrender",
            // },
            {
                "icon": "FileTextOutlined",
                "label": "账单管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const userMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const managerMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const customizeMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {
                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",
            },

        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

//菜单项接口
Mock.mock('https://www.demo.com/menu', "get", (options: any) => {
    const token = sessionStorage.getItem("token");
    if (token == "mocktoken123456admin") {
        return {
            code: 200,
            message: '请求成功',
            data: menuList
        }
    } else if (token == "mocktoken123456user") {
        return {
            code: 200,
            message: '请求成功',
            data: userMenuList
        }
    } else if (token == "mocktoken123456manager") {
        return {
            code: 200,
            message: '请求成功',
            data: managerMenuList
        }
    } else {
        return {
            code: 200,
            message: "失败",
            data: []
        }
    }
})


//工作台数字接口
Mock.mock('https://www.demo.com/overAll', 'get', () => {
    return {
        code: 200,
        message: '请求成功',
        data: [
            { name: '园区总面积(平方米)', number: '13479', icon: 'RadarChartOutlined', color: '#7da1f7' },
            { name: '总租赁面积(平方米)', number: '8635', icon: 'SnippetsOutlined', color: '#81c452' },
            { name: '园区总产值(万元)', number: '38764', icon: 'DollarOutlined', color: '#62c9cb' },
            { name: '入住企业总数(家)', number: '2874', icon: 'LaptopOutlined', color: '#e49362' },


        ]
    }
})


//工作台里 图表接口
Mock.mock('https://www.demo.com/energyData', 'get', () => {
    return {
        code: 200,
        message: '请求成功',
        data: [
            { name: '煤', data: [120, 132, 101, 80, 90, 230, 210] },
            { name: '气', data: [220, 182, 191, 234, 290, 330, 310] },
            { name: '油', data: [150, 232, 201, 154, 190, 330, 410] },
            { name: '电', data: [320, 332, 301, 334, 390, 330, 320] },
            { name: '热', data: [820, 932, 901, 934, 1290, 1330, 1320] }

        ]
    }
})


//随机生成电话 在下面用
Mock.Random.extend({
    phone: function () {
        var phonePrefixs = ['13', '14', '15', '16', '17', '18', '19'] // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{9}/) //Number()
    }
})

//租户企业列表接口
Mock.mock("https://www.demo.com/userList", "post", (options: any) => {
    const { pageSize, page, companyName, contact, phone } = JSON.parse(options.body)
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [
                {
                    "id": "@string('number',6)",//随机生成一个六位数字id
                    "name": "@cname",//随机生成一个人名
                    "status|1": ["1", "2", "3"], //从中选一个
                    "tel": '@phone',
                    "business|1": ['制造业', '互联网', '新媒体', '美业', '新能源', '物流', '电商'], //从中随机选一个
                    "email": "@email",
                    "creditCode": "@string('number',18)", //得到一个随机18个数字的字符串
                    "industryNum": "@string('number',15)",
                    "organizationCode": "@string('upper',9)",//得到9个大写字母
                    "legalPerson": "@cname",
                },
            ],
            total: 78
        })
    }
})


//租户列表企业删除接口
Mock.mock('https://www.demo.com/deleteUser', 'post', (options: any) => {
    const { id } = JSON.parse(options.body);
    console.log("删除租户id", id)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})



//批量删除租户企业
Mock.mock('https://www.demo.com/batchDeleteUser', 'post', (options: any) => {
    const { ids } = JSON.parse(options.body);
    console.log("批量删除租户ids", ids)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})

//编辑和新增租户企业
Mock.mock('https://www.demo.com/editUser', 'post', (options: any) => {
    console.log("编辑企业收到参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})


//楼宇管理列表接口
Mock.mock('https://www.demo.com/tenementList', 'post', (options: any) => {
    const { pageSize } = JSON.parse(options.body)

    return {
        code: 200,
        message: '成功',
        data: Mock.mock({  //mock.mock后跟一个对象 可以给随机生成数据
            [`list|${pageSize}`]: [
                {
                    'id': "@string('number',6)", //意思是随机生成6个字符串类型的数字
                    'name|1': ['A1幢写字楼', 'A2幢写字楼', 'B1幢写字楼', 'B2幢写字楼', 'C1幢写字楼', 'C2幢写字楼', '天汇国际大厦a座', '时代金融广场'],
                    'person': '@cname', //随机生成负责人名
                    'tel': '@phone',
                    'status|1': ['1', '2', '3'], //｜1意思是在1，2，3里随机选择一个
                    'vacancyRate': '@integer(40, 100)', //随机生成40-100整数
                    'propertyFee': '@float(40,100,1,1)'

                }
            ],
            total: 78
        })
    }
})

//楼宇管理列表删除
Mock.mock('https://www.demo.com/deleteTenement', 'post', (options: any) => {
    const { id } = JSON.parse(options.body);
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})

//编辑楼宇
Mock.mock('https://www.demo.com/editTenement', 'post', (options: any) => {
    console.log("编辑楼宇收到参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})


//获取房间列表
function generateRooms() {
    const rooms = [];
    for (let i = 0; i < 50; i++) {
        const floor = 1 + Math.floor(i / 6); // 每6个房间一层
        const roomNumber = floor * 100 + (101 + (i % 6)); // 计算房间号
        rooms.push({
            roomNumber,
            decorationType: Mock.Random.pick(['毛坯', '精装']),
            area: Mock.Random.integer(70, 300),
            unitPrice: Mock.Random.integer(1, 3),
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        });
    }
    return rooms;
}
Mock.mock('https://www.demo.com/roomList', 'post', (options: any) => {
    console.log("收到房间id", JSON.parse(options.body).roomid)
    return {
        code: 200,
        message: "成功",
        data: {
            rooms: generateRooms()
        }
    };
});

//车辆信息
//1.充电记录
Mock.mock('https://www.demo.com/car1', 'post', (options: any) => {
    const { page, pageSize } = JSON.parse(options.body)
    console.log("后端充电记录的参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'orderNo': '@string("upper", 6)@string("number",4)',
                'date|1': ['2024-07-11', '2024-04-15', '2024-05-15', '2024-08-16', '2024-08-12', '2024-05-20', '2024-01-03'],
                'carNo|1': ["陕A353V8", "陕AX6P58", "陕ASU428", '陕A223DI', '川A23J4U', '陕A88888', '京AF0236', '陕A046E8', '陕A2B4V9', '陕A8983E'],
                "type|1": ['私有车辆', '物业管理车辆', '巡逻车辆', '安保车辆', '企业公有车', '园区参观车'],
                "startDate|1": ['2024-07-11 13:01:29', '2024-04-15 14:23:20', '2024-05-15 08:59:05', '2024-08-16 10:45:23', '2024-08-12 13:24:56', '2024-05-20 19:23:40', '2024-01-03 21:34:54',],
                'time|1': ['2小时25分钟', '1小时30分钟', '1小时10分钟', '58分钟', '1小时32分钟', '49分钟', '1小时7分钟', '1小时58分钟'],
                'count|1': ['30kw', '85kw', '43kw', '36kw', '75kw', '63kw', '57kw', '55kw'],
                'cost|1': ["¥40,51", "¥90,56", "¥44.78", "¥85.21", "¥73.58", "¥68.13", "¥64.72", "¥54.19"],
            }],
            "total": 83
        })

    };
});
//2.园内车辆列表
Mock.mock('https://www.demo.com/car2', 'post', (options: any) => {
    const { page, pageSize } = JSON.parse(options.body)
    console.log("后端园内车辆管理的参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                "id": "@string('number',6)",
                'carNo|1': ["陕A353V8", "陕AX6P58", "陕ASU428", '陕A223DI', '川A23J4U', '陕A88888', '京AF0236', '陕A046E8', '陕A2B4V9', '陕A8983E'],
                'name': '@cname',
                'tel': '@phone',
                "type|1": ['物业管理车辆', '巡逻车辆', '安保车辆', '园区参观车', '长租车', '短租车'],
                'rest|1': ['135天', '190天', '62天', '31天', '240天', '100天'],
                'time': '0天',
                'pic': '',
            }],
            "total": 24
        })

    };
});
//车辆删除
Mock.mock('https://www.demo.com/deleteCar', 'post', (options: any) => {
    const { id } = JSON.parse(options.body);
    console.log("车辆删除id",id)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})


//报修管理
Mock.mock('https://www.demo.com/repairlist', 'post', (options: any) => {
    const { page, pageSize } = JSON.parse(options.body);
    console.log("后端报修管理接到参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'orderNo': '@string("upper", 2)@string("number" , 7)',
                'name|1': '@cname',
                'tel': '@phone',
                "address|1": ['A1幢写字楼502', 'A2幢写字楼7楼', '天汇国际大厦B号电梯', 'A1幢写字楼1号楼梯口', 'A2幢写字楼大堂'],
                "description|1": ['空调制冷问题,间断性制冷，且制冷效果不佳', '下水管道堵塞', '电梯故障', '墙面维修', '门锁失效'],
                'jia|1': ['万物科技有限公司', '大鱼网络科技', '六六信息技术有限公司'],
                'status|1': ["1", "2", "3"],
                'time|1': ['2024-07-11', '2024-04-15', '2024-05-15', '2024-08-16', '2024-08-12', '2024-05-20', '2024-01-03']
            }],
            "total": 69
        })

    }
});

//报修管理完成删除
Mock.mock('https://www.demo.com/repairFinish', 'post', (options: any) => {
    const { orderNo } = JSON.parse(options.body);
    console.log("报修完成orderNo",orderNo)

    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})

//派指人员列表
Mock.mock('https://www.demo.com/repairPerson', 'get', () => {
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            'list': [
                {
                    'no': '@string("upper", 2)@string("number" , 7)',
                    'name|1': '@cname',
                    'tel': '@phone',
                },
                {
                    'no': '@string("upper", 2)@string("number" , 7)',
                    'name|1': '@cname',
                    'tel': '@phone',
                },
                {
                    'no': '@string("upper", 2)@string("number" , 7)',
                    'name|1': '@cname',
                    'tel': '@phone',
                },
                {
                    'no': '@string("upper", 2)@string("number" , 7)',
                    'name|1': '@cname',
                    'tel': '@phone',
                }
            ],

        })

    }
});

//指派成功 
Mock.mock('https://www.demo.com/repairAssigned', 'post', (options: any) => {
    const { orderNo } = JSON.parse(options.body);
    console.log("后端报修指派成功接到参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})

//合同管理
Mock.mock('https://www.demo.com/contractList', 'post', (options: any) => {
    const { page, pageSize } = JSON.parse(options.body);
    console.log("后端合同管理接到参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'contractNo': '@string("number", 6)',
                'type|1': ['租赁合同', '自定义合同', '购买合同'],
                'name|1': ["房屋租赁合同通用模版", "车位租赁合同通用模版", "商业房产买卖合同"],
                "startDate|1": ['2023-01-01', '2023-03-05', '2023-04-01'],
                "endDate|1": ['2024-01-01', '2024-03-05', '2024-04-01'],
                'jia|1': ['万物科技有限公司', '大鱼网络科技', '六六信息技术有限公司'],
                'yi': '天明物业有限公司',
                'status|1': ["1", "2", "3"],
            }],
            "total": 54
        })
        // 生成55条数据
    }
});

//账单管理
Mock.mock('https://www.demo.com/billList', 'post', (options: any) => {
    const { page, pageSize, companyName, contact, phone } = JSON.parse(options.body);
    console.log("后端账单管理接到参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'accountNo': '@string("number", 6)',
                'status|1': ['1', '2'],
                'roomNo|1': ["A1幢写字楼-201", "B1幢写字楼-402", "B2幢写字楼-701", "C2幢写字楼-1601"],
                "carNo|1": ['B109', 'C227', 'C106', "D158"],
                "tel|1": ['@phone'],
                'costName1|1': [1278.00, 2633.00, 3698.00, 2345.00, 1532.00,2310.00,2443.00],
                'costName2': '200元/月',
                'costName3|1': ["25800/年", "19800/年" ,"20700/年"],
                'startDate|1': "2023-01-01",
                'endDate': "2024-01-01",
                'preferential': 0.00,
                'money': 26000.00,
                'pay|1': ["微信", "支付宝", "现金", "银行卡转账"]
            }],
            "total": 54
        })
        // 生成55条数据
    }
});

//账单管理删除
Mock.mock('https://www.demo.com/deleteBill', 'post', (options: any) => {
    const { accountNo } = JSON.parse(options.body);
    console.log('删除订单accountNo',accountNo)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})

//账单管理批量删除账单
Mock.mock('https://www.demo.com/batchDeleteBill', 'post', (options: any) => {
    const { accountNos } = JSON.parse(options.body);
    console.log("批量删除accountNos", accountNos)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})

//账单退款
Mock.mock('https://www.demo.com/refundBill', 'post', (options: any) => {
    const { accountNo } = JSON.parse(options.body);
    console.log('退款订单accountNo',accountNo)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})


//设备管理
Mock.mock('https://www.demo.com/equipmentList', 'post', (options: any) => {
    const { page, pageSize, companyName, contact, phone } = JSON.parse(options.body);
    console.log("后端设备管理接到参数", JSON.parse(options.body))
    return {
        code: 200,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 1001,
                'name|1': ['智能供水机组', 'A1幢写字楼供暖设备', '园区大门入口闸机', '球机摄像头', 'C1幢写字楼中央空调', 'B区充电桩', 'B1-21-电梯', '路灯设备'],
                'no|1': ['CP-ONYU-1098', 'H831-QE', 'DFE-323-FFFG', 'AFRE-224-FFR'],//设备编号
                'person': '@cname',
                'tel|1': ['@phone'],
                'time|1': ['20年', '15年', '10年'],//理论寿命
                'rest': '7年',
                'status|1': [1, 2, 3], //1使用中，2维护中，3已损坏
                'last|1': ['2024-07-11', '2024-04-15', '2024-05-15', '2024-08-16', '2024-08-12', '2024-05-20', '2024-01-03'], //最近保养日期
                'type|1': ['型号1', '型号2', '型号3'], //规格型号
                'from|1': ['上海科技股份有限公司', '武汉能源设备有限公司', '重庆某某照明有限公司']//生产厂家
            }],
            "total": 66
        })
        // 生成66条数据
    }
});


//账号管理
Mock.mock('https://www.demo.com/accountList', 'post', (options: any) => {
    //  const {page,pageSize,companyName,contact,phone}=JSON.parse(options.body);
    console.log("后端账号管理接到参数", options)
    return {
        code: 200,
        message: "成功",
        data: {
            list: [
                {
                    id: 1001, accountName: "xuchao", auth: "admin", person: "徐超", tel: "188888888888", department: "总裁办", menu: menuList
                },
                {
                    id: 1002, accountName: "user01", auth: "user", person: "王丽丽", tel: "17777777777", department: "网推部", menu: userMenuList
                },
                {
                    id: 1003, accountName: "manager01", auth: "manager", person: "刘伟", tel: "16666666666", department: "财务部", menu: managerMenuList
                },
                {
                    id: 1004, accountName: "user02", auth: "customize", person: "张安定", tel: "15555555555", department: "企划部", menu: customizeMenuList
                },
                {
                    id: 1005, accountName: "laowang", auth: "user", person: "王大大", tel: "14444444444", department: "总裁办", menu: userMenuList
                }

            ],
            total: 5
        }
    }
});

Mock.mock('https://www.demo.com/addAcount', 'post', (options: any) => {
    const res = JSON.parse(options.body);
    console.log('新增账号', res)
    return {
        code: 200,
        message: "成功",
        data: "操作成功"
    }
})