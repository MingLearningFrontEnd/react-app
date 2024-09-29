import './index.scss'
import logo from '../../assets/logo.png'
import bg from '../../assets/bg.jpg'
import lgbg from '../../assets/lgbg.jpg'
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../api/user'; //user.ts里面封装的login方法
import { setToken } from '../../store/login/authSlice';
import { useDispatch} from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const [loading,setLoding]=useState<boolean>(false)
    const [form] = Form.useForm() //拿到表单实例，才可以拿到表单的内容

    function handleLogin() {
        //validateField是form实例内的方法，用来校验表单 
        form.validateFields().then(async (res) => {
            setLoding(true)
            const {data:{token,username,btnAuth}} = await login(res) //调用login接口 这里是需要获取data里面的token，username值所以解构赋值token，username
            setLoding(false)
            dispatch(setToken(token)) //派发redux action记录保存token
            sessionStorage.setItem('username',username) //本地存储存上username
            sessionStorage.setItem('btnAuth',JSON.stringify(btnAuth)) 
            navigate('/',{replace:true})//跳转首页
        }).catch((err) => {
            setLoding(false)
            console.log(err)
        })
    }



    return (
        <div className='login' style={{ backgroundImage: `url(${bg})` }}>
            <div className='lgbg' style={{ backgroundImage: `url(${lgbg})` }}>
                <div className='part'>
                    <div className='title'>
                        <div className='logo'>
                            <img src={logo} alt="" width={90} />
                        </div>
                        <h1>朋远智慧园区管理平台</h1>
                    </div>
                    <Form
                        form={form} //实例表单，便于拿数据和校验
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                            <Input placeholder='请输入用户名' prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '密码不能为空!' }]}
                        >
                            <Input.Password placeholder='请输入密码' prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                style={{ width: '100%' }}
                                onClick={handleLogin}
                                loading={loading}
                                >

                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </div>
    )
}
export default Login