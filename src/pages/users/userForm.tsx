import { Modal, Form, Row, Col, Input, Radio, message } from "antd"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { editUser } from "../../api/userList"

interface FromProps {
    visible: boolean,
    hideModal: () => void,
    title: string,
    loadData:()=> void
}
function UserForm(props: FromProps) {
    const [form] = Form.useForm()//实例form
    const { visible, hideModal, title ,loadData} = props //从props中解构出来这三个属性
    const { userData } = useSelector((state: any) => state.userSlice) //从redux中取被选中要编辑的数据 userdata是redux里定义的数据

    useEffect(()=>{
        title=='新增企业'?form.resetFields():form.setFieldsValue(userData)  //form实例后，判断是新增企业还是编辑企业，新增resetvalue，编辑用setFieldsValue方法
    },[visible])//依赖于visible这个值
    
    const handleOk=()=>{  //modal点击确定按钮事件 新增或编辑
        form.validateFields().then(async(res)=>{
            const{data} = await editUser(res)
            message.success(data)
            hideModal()
            loadData() //新增或编辑后更新数据
        }).catch((err)=>{
            console.log(err)  //验证不通过的处理
        })
    }
    return <>
        <Modal
            title={title} //也是由父组件决定的
            open={visible}  //visible是父组件传来的只能父组件来改
            onCancel={hideModal}  //是父组件定义的关闭弹窗的函数
            width={800}
            onOk={handleOk}

        >
            <Form
                form={form} //想要拿到表单内容，就得先实例表单
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='客户名称'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: '客户名称不能为空'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='联系电话'
                            name='tel'
                            rules={[
                                {
                                    required: true,
                                    message: '联系电话不能为空'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='经营状态'
                            name='status'
                            rules={[
                                {
                                    required: true,
                                    message: '经营状态不能为空'
                                }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={'1'}>营业中</Radio>
                                <Radio value={'2'}>暂停营业</Radio>
                                <Radio value={'3'}>已关闭</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='邮箱'
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: '邮箱不能为空'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='统一信用代码'
                            name='creditCode'
                            rules={[
                                {
                                    required: true,
                                    message: '统一信用代码不能为空'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='工商注册号'
                            name='industryNum'
                            rules={[
                                {
                                    required: true,
                                    message: '工商注册号不能为空'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='组织机构代码'
                            name='organizationCode'
                            rules={[
                                {
                                    required: true,
                                    message: '组织机构代码不能为空'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='法人名'
                            name='legalPerson'
                            rules={[
                                {
                                    required: true,
                                    message: '法人名不能为空'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Modal>
    </>
}
export default UserForm