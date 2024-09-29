import { Dropdown, Space } from 'antd';
import { UserOutlined,PoweroffOutlined,DownOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { clearToken } from '../../store/login/authSlice';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" >
         个人中心
        </a>
      ),
      icon:<UserOutlined/>
    },
    {
      key: '2',
      label: (
        <a target="_blank" >
          退出登录
        </a>
      ),
      icon: <PoweroffOutlined/>
    
    }
]
function MyHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onClick:MenuProps['onClick'] =({key})=>{
        if(key==='1'){
            //跳转个人中心
          navigate('/personal')

        }else{
            dispatch(clearToken())
            sessionStorage.clear() //清除所有本地存储的

        }
    }
    return (
        <div className="dropdown">
            <Dropdown menu={{ items,onClick}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                       你好,{sessionStorage.getItem('username')}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}

export default MyHeader