import { Carousel, Card, Row, Col, List, Avatar, Statistic } from "antd"
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import pic1 from '../../assets/1.jpg'
import pic2 from '../../assets/2.jpg'
import pic3 from '../../assets/3.jpg'

const data = [
    {
        title: '非时科技有限公司',
        description: 'A1幢写字楼5楼，没有附属车位，新媒体行业'
    },
    {
        title: '有新网络科技有限公司',
        description: '续签两年，长期稳定客户'
    },
    {
        title: '非时科技有限公司',
        description: 'A1幢写字楼5楼，没有附属车位，新媒体行业'
    },
    {
        title: '有新网络科技有限公司',
        description: '续签两年，长期稳定客户'
    },
];
function Merchants() {

    return (
        <div className="merchants">
            <Card>
                <div style={{ width: '1100px', margin: 'auto' }}>
                    <Carousel autoplay arrows>
                        <div>
                            <img src={pic1} alt="" />
                        </div>
                        <div>
                            <img src={pic2} alt="" />
                        </div>
                        <div>
                            <img src={pic3} alt="" />
                        </div>
                    </Carousel>
                </div>
            </Card>

            <Row gutter={16} className="mt">
                <Col span={12}>
                    <Card>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={item.title}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="新签客户"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                        <Statistic
                            title="续签客户"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                        <Statistic
                            title="退租客户"
                            value={5.16}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                        <Statistic
                            title="意向客户"
                            value={13.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>



        </div>
    )
}

export default Merchants