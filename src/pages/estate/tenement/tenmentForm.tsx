import { Modal, Row, Col, Form, Input, Radio, message } from "antd";
import { useSelector } from "react-redux";
import { editTenement } from "../../../api/tenementList";
import { useEffect } from "react";
interface FormProps {
    visible: boolean,
    hideModal: () => void,
    loadData: () => void
}


function TenementForm(props: FormProps) {
    const [form] = Form.useForm()
    const { visible, hideModal, loadData } = props
    const {tenementData} = useSelector((state:any)=>state.tenementSlice)

    useEffect(()=>{
        form.setFieldsValue(tenementData)
    },[visible])


    const handleOk = () => {
        form.validateFields().then(async (res) => {
            const { data } = await editTenement(res)
            message.success(data)
            hideModal()
            loadData()
        }).catch((err) => {
            console.log(err)
        })
      
    }
    return <Modal
        title='编辑楼宇'
        open={visible}
        width={800}
        onCancel={hideModal}
        onOk={handleOk}

    >
        <Form
           form={form} 
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label='楼宇名称'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '楼宇名称不能为空'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='负责人'
                        name='person'
                        rules={[
                            {
                                required: true,
                                message: '负责人不能为空'
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
                        label='负责人电话'
                        name='tel'
                        rules={[
                            {
                                required: true,
                                message: '负责人电话不能为空'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='使用状态'
                        name='status'
                        rules={[
                            {
                                required: true,
                                message: '负责人不能为空'
                            }
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={'1'}>建设中</Radio>
                            <Radio value={'2'}>已竣工</Radio>
                            <Radio value={'3'}>使用中</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label='空置率'
                        name='vacancyRate'
                        rules={[
                            {
                                required: true,
                                message: '空置率不能为空'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='物业费率'
                        name='propertyFee'
                        rules={[
                            {
                                required: true,
                                message: '物业费率不能为空'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>

    </Modal>
}

export default TenementForm