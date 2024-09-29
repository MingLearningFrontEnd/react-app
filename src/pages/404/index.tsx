import { Button, Empty, Typography } from 'antd';
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div className='notfound' style={{ marginTop: '200px' }}>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 200 }}
                description={
                    <Typography.Text>
                        温馨提示 <a href="#API">页面走丢了</a>
                    </Typography.Text>
                }
            >
                <Button type="primary"><Link to='/dashboard'>回到首页</Link></Button>
            </Empty>
        </div>
    )

}

export default NotFound