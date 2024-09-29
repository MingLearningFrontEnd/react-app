import { Card, Row, Col, Progress, Tag, List, Avatar, Calendar, Badge } from 'antd'
import { time } from 'console'


const data = [
    {

    }
]

const data1 =[
    {
    title:'新增账号申请',
    desciption:'新入职员工，需要新建user权限账号',
    person:'人力资源部 - 刘婷',
    date:'2024-05-02',
    progress:1
},
{
    title:'物业费催缴',
    desciption:'催促企业尽快缴纳',
    person:'总裁办 - 刘大伯',
    date:'2024-05-14',
    progress:2
},
]

const data2 = [
    {
        title:'通知企业统一试供暖',
        desciption:'即将供暖，调试阀门',
        person:'行政部 - 王伟',
        date:'2024-05-01',
        progress:34
    },
    {
        title:'账单没有审批',
        desciption:'新一季度财务账单抓紧审批完成',
        person:'总裁办 - 刘哥 ',
        date:'2024-05-11',
        progress:65
    },
    {
        title:'车位到期提醒',
        desciption:'车位续租改为按年收费',
        person:'行政部 - 王伟',
        date:'2024-05-20',
        progress:47
    },
    
]

const data3 = [
    {
        title:'文章发布',
        desciption:'发布招商文章',
        person:'网推部 - 曼曼',
        date:'2024-03-03',
        progress:100
    },
    {
        title:'新增账号申请',
        desciption:'新入职员工，需要新建user权限账号',
        person:'人力资源部 - 刘婷',
        date:'2024-04-20',
        progress:100
    },
    {
        title:'报修处理',
        desciption:'A1幢写字楼电梯维修',
        person:'行政部 - 高启强',
        date:'2024-04-21',
        progress:100
    },
]

function Personal() {

    return (
        <div className="personal">
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<>{sessionStorage.getItem('username')}-运营专员</>}
                                        description="干就完了">
                                    </List.Item.Meta>
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card className='mt'>
                        <Calendar fullscreen={false} />
                    </Card>
                </Col>
                <Col span={18}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card>
                                待处理：<Badge count={data1.length} color='#faad14'/>
                            </Card>
                            {data1.map(item=><Card title={item.title} extra={<a href='#'>详情</a>} className='mt'>
                                <p>描述：{item.desciption}</p>
                                <p className='mt'>创建人：{item.person}</p>
                                <div className='mt'>
                                    日期：<Tag>{item.date}</Tag>
                                </div>
                                <div className='mt'>
                                    进度：<Progress percent={item.progress}/>
                                </div>

                            </Card>)}
                        </Col>
                        <Col span={8}>
                        <Card>
                                处理中：<Badge count={data2.length} color='blue'/>
                            </Card>
                            {data2.map(item=><Card title={item.title} extra={<a href='#'>详情</a>} className='mt'>
                                <p>描述：{item.desciption}</p>
                                <p className='mt'>创建人：{item.person}</p>
                                <div className='mt'>
                                    日期：<Tag>{item.date}</Tag>
                                </div>
                                <div className='mt'>
                                    进度：<Progress percent={item.progress}/>
                                </div>

                            </Card>)}
                        </Col>
                        <Col span={8}>
                        <Card>
                                已完成：<Badge count={data3.length} color='green'/>
                            </Card>
                            {data3.map(item=><Card title={item.title} extra={<a href='#'>详情</a>} className='mt'>
                                <p>描述：{item.desciption}</p>
                                <p className='mt'>创建人：{item.person}</p>
                                <div className='mt'>
                                    日期：<Tag>{item.date}</Tag>
                                </div>
                                <div className='mt'>
                                    进度：<Progress percent={item.progress}/>
                                </div>

                            </Card>)}
                        </Col>

                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Personal