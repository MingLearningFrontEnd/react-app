import { Row, Col, Card, Progress, Statistic, Timeline, Tag } from 'antd'
import { RadarChartOutlined, SnippetsOutlined, DollarOutlined, LaptopOutlined } from '@ant-design/icons'
import './index.scss'
import ReactECharts from 'echarts-for-react'
import { getOverAll, getEnegryData } from '../../api/dashborad'
import { useEffect, useState } from 'react';
import icons from '../../components/navLeft/iconList'
const option2 = {   //柱状图静态数据
  title: {
    text: '企业资质情况(家)'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: [0, 0.01],
    data: ['2014', '2016', '2018', '2020', '2022', "2024"]
  },
  yAxis: {
    type: 'value',

  },
  series: [
    {
      name: '科技企业',
      type: 'bar',
      data: [40, 220, 378, 658, 1122, 1200]
    },
    {
      name: '高新企业',
      type: 'bar',
      data: [20, 39, 443, 490, 559, 762]
    },
    {
      name: '国营企业',
      type: 'bar',
      data: [78, 167, 229, 330, 380, 420]
    }
  ]
};

const option3 = {  //饼状图静态数据
  legend: {
    top: '10px'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [30, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: '在营' },
        { value: 38, name: '已租' },
        { value: 32, name: '出租' },
        { value: 30, name: '续签' },
        { value: 28, name: '新签' },
        { value: 26, name: '待租' },
        { value: 22, name: '退租' },
      ]
    }
  ]
};



function DashBoard() {
  const [overall, setOverAll] = useState([]) //顶部数据

  const initalOption = {//图表数据
    title: {
      text: '当日能源消耗'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
    ]
  };

  const [data, setData] = useState(initalOption)

  useEffect(() => {
    const loadData = async () => {
      const { data: apiData } = await getEnegryData()//异步方式调用接口 解构接口数据里的data数据重新命名为apidata
      const dataList = apiData.map((item: any) => ({  //遍历apidata，处理数据series里的数据，将其改成需要的格式
        name: item.name,
        data: item.data,
        type: 'line',
        stack: 'Total'
      }))
      const updatedOption = { //这里将最终的数据处理成需要的格式
        ...data,
        legend: {
          data: dataList.map((item: any) => item.name)
        },
        series: dataList
      }
      setData(updatedOption)
    }
    const loadOverAll = async () => {
      const { data } = await getOverAll()
      const overAllList = data.map((item: any) => (
        {
          name: item.name,
          number: item.number,
          icon: icons[item.icon],
          color: item.color
        }
      ))
      setOverAll(overAllList)
    }

    loadOverAll()
    loadData()
  }, [])


  return (
    <div className="dashboard" >
      <Row gutter={16}>
        {
          overall.map((item: any) => (
            <Col span={6} key={item.name}>
              <Card className='clearfix' >
                <div className='fl area' >
                  <h2>{item.number}</h2>
                  <p>{item.name}</p>
                </div>
                <div className='fr icon' style={{ color: item.color }} >
                  {item.icon}
                </div>
              </Card>
            </Col>
          ))
        }
      </Row>

      <Row gutter={16} className='mt'>
        <Col span={12}>
          <Card title='能源消耗情况'> {/**动态生成的 */}
            <ReactECharts option={data}></ReactECharts>  {/** data是usestate的 */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title='企业资质情况（家）'>
            <ReactECharts option={option2}></ReactECharts>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className='mt'>
        <Col span={12}>
          <Card title='租赁情况'>
            <ReactECharts option={option3}></ReactECharts>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='充电桩空闲统计'>
            <div className='wrap '>
              <Progress type='circle' percent={75} />
              <Statistic title="总充电桩数" value={75} suffix='/100' className='mt' />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='实时车辆信息' style={{ height: 404 }}>
            <Timeline items={[
              {
                children: <><Tag color='green'>进场</Tag>08:24 车辆 京A66666</>
              },
              {
                children: <><Tag color="red">出场</Tag>09:15 车辆 京A66666  </>,
                color: 'red',
              },
              {
                children: <><Tag color="green">进场</Tag>09:22 车辆 京A23456  </>,
              },
              {
                children: <><Tag color="red">出场</Tag>10:43 车辆 京A18763  </>,
                color: 'red',
              },
              {
                children: <><Tag color="green">进场</Tag>13:38 车辆 京A88888  </>,
              },
              {
                children: <><Tag color="green">进场</Tag>14:46 车辆 京A23456  </>,

              },
            ]} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashBoard