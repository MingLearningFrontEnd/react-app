import { Modal, Form, Row, Col, Input, Radio, message } from "antd"
import { useEffect, useState } from "react"
import { addAccount } from "../../api/settings"

interface FromProps {
    visible: boolean,
    hideModal: () => void,
    loadData:() => void,
}

interface SearchType {
    accountName: string,
    auth: string,
    person: string,
    tel: string,
    department: string
}



function SettingForm(props: FromProps) {
    const { visible, hideModal,loadData} = props
    const [form] = Form.useForm()
   

    const handleOk = ()=>{
        form.validateFields().then(async(res)=>{
            const{data} = await addAccount(res)
            message.success(data)
            hideModal()
            loadData() //新增后更新数据
        }).catch((err)=>{
            console.log(err)  //验证不通过的处理
        })
    }
   

    return (
        <Modal
            title='新增账号'
            open={visible}
            onCancel={hideModal}
            width={800}
            onOk={handleOk}

        >
            <Form
                form={form}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='账号名称'
                            name='accountName'
                            rules={[
                                {
                                    required: true,
                                    message: '账号名称不能为空'
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='所属权限'
                            name='auth'
                            rules={[
                                {
                                    required: true,
                                    message: '所属权限不能为空'
                                },
                            ]}
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='使用人'
                            name='person'
                            rules={[
                                {
                                    required: true,
                                    message: '使用人不能为空'
                                }
                            ]}
                        >
                            <Input  />

                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='使用人电话'
                            name='tel'
                            rules={[
                                {
                                    required: true,
                                    message: '使用人电话不能为空'
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
                            label='所属部门'
                            name='department'
                            rules={[
                                {
                                    required: true,
                                    message: '所属部门不能为空'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal >
    )
}

export default SettingForm