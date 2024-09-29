import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import icons from './iconList';
import logo from'../../assets/logo.png'
import'./index.scss'
import {useSelector} from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';

interface MenuItem{
    key:string,
    label:string,
    icon?: React.ReactNode,
    children?:MenuItem[]
}


function NavLeft() {
    const { menuList } = useSelector((state: any) => state.authSlice)
    const [menuData,setMenuData] = useState<MenuItem[]>([]) //设置state准备用来存菜单数据
    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(()=>{  //页面第一次进入，挂载菜单数据
        configMenu()  
    },[menuList])

    async function configMenu(){
       const mappedMenuItems = mapMenuItems(menuList) //用下面处理菜单的函数处理后的菜单数据
       setMenuData(mappedMenuItems) //更改菜单数据
    }

    //将返回的菜单数据转换成需要的格式
    function mapMenuItems(item:any):any{
        return item.map((item:any)=>({
            key:item.key,
            label:item.label,
            icon:icons[item.icon],//icons是在外面定义了一个iconlist映射的数据，将它转换成了reactnode
            children:item.children?mapMenuItems(item.children):null //递归
        }))
    }
        function handleClick({key}:{key:string}){
            navigate(key)
        }

    return <div className='navleft'>
        <div className='logo'>
            <img src={logo} alt="" width={18}/>
            <h1>朋远智慧园区</h1>
        </div>
        <Menu
            defaultSelectedKeys={['/dashboard']}
            mode="inline"
            theme="dark"
            items={menuData} //data数据
            onClick={handleClick}
            selectedKeys={[location.pathname]}
        />
    </div>
}

export default NavLeft