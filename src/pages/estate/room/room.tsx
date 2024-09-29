import { Card, Row, Col, Image, Radio, RadioChangeEvent, Spin } from 'antd'
import './index.scss'
import { useEffect, useState } from 'react';
import { getRoomList } from '../../../api/room';
import roomPic from '../../../assets/roomPic.jpg'

interface RoomType {
    roomNumber: number,
    decorationType: '精装' | '毛坯',
    area: number,
    unitPrice: number,
    src: string
}




function Room() {
    const [visible, setVisible] = useState<boolean>(false)//动态图片显示和隐藏
    const [room, setRoom] = useState<RoomType[]>([]) //动态渲染房间
    const [src, setSrc] = useState<string>(roomPic) //动态图片src
    const [loading,setLoading]= useState<boolean>(false)

    useEffect(() => {  //挂载数据
        loadRooms('a1')
    }, [])


    const loadRooms = async (roomid: string) => {   //加载房间信息
        setLoading(true)
        const { data: { rooms } } = await getRoomList(roomid)
        setLoading(false)
        setRoom(rooms)
    }

    const showImage = (src: string) => {  //获取图片
        setSrc(src)
        setVisible(true)
    }

    const handleChange = (e: RadioChangeEvent) => {  //改变楼宇信息
        const roomid: string = e.target.value
        loadRooms(roomid)
    }

    return (
        <div className='room'>
            <Image
                width={200}
                style={{ display: 'none' }}
                preview={{
                    visible,
                    src: src,
                    onVisibleChange: (value) => {
                        setVisible(value);
                    },
                }}
            />
            <Card className='mb'>
                <Radio.Group defaultValue='a1' buttonStyle='solid' onChange={handleChange}>
                    <Radio.Button value='a1'>A1幢写字楼</Radio.Button>
                    <Radio.Button value='a2'>A2幢写字楼</Radio.Button>
                    <Radio.Button value='b1'>B1幢写字楼</Radio.Button>
                    <Radio.Button value='b2'>B2幢写字楼</Radio.Button>
                    <Radio.Button value='c1'>C1幢写字楼</Radio.Button>
                    <Radio.Button value='c2'>C2幢写字楼</Radio.Button>
                    <Radio.Button value='d1'>天汇国际大厦</Radio.Button>
                    <Radio.Button value='d2'>时代金融广场</Radio.Button>
                </Radio.Group>
            </Card>

            <Spin spinning={loading}>
                <Row gutter={16} >
                    {/* <Col span={6} className='item'>
                    <Card title='房间号' extra={<a onClick={()=>{setVisible(true)}}>户型图</a>}>
                        <h1>201</h1>
                        <div className='clearfix mt'>
                            <p className='fl'>装修情况</p>
                            <p className='fr'>毛坯</p>
                        </div>
                        <div className='clearfix mt'>
                            <p className='fl'>房间面积</p>
                            <p className='fr'>100</p>
                        </div>
                        <div className='clearfix mt'>
                            <p className='fl'>出租单价</p>
                            <p className='fr'>100</p>
                        </div>

                    </Card>
                </Col> */}
                    {
                        room.map((item) => {
                            return <>
                                <Col span={6} className='item'>
                                    <Card title='房间号' extra={<a onClick={() => { showImage(item.src) }}>户型图</a>}>
                                        <h1>{item.roomNumber}</h1>
                                        <div className='clearfix mt'>
                                            <p className='fl'>装修情况</p>
                                            <p className='fr'>{item.decorationType}</p>
                                        </div>
                                        <div className='clearfix mt'>
                                            <p className='fl'>房间面积</p>
                                            <p className='fr'>{item.area}平米</p>
                                        </div>
                                        <div className='clearfix mt'>
                                            <p className='fl'>出租单价</p>
                                            <p className='fr'>{item.unitPrice}元/平/日</p>
                                        </div>

                                    </Card>
                                </Col>
                            </>
                        })
                    }
                </Row>
            </Spin>
        </div>
    )
}

export default Room