import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Card, DatePicker, Radio} from 'antd';

type FieldType = {
    username?: string;
    title?: string;
    subtitle?: string;
    time?:string;
    range?:string;
    content?:string
};


const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
function Articles(){

    return(
        <div className="articles">
         <Card>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="文章标题"
                    name="title"
                    rules={[{ required: true, message: '请输入文章标题' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="副标题"
                    name="subtitle"
                    rules={[{ required: true, message: '请输入副标题' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="发布时间"
                    name="time"
                    rules={[{ required: true, message: '请选择发布时间' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item<FieldType>
                    label="可见范围"
                    name="range"
                    rules={[{ required: true, message: '请选择可见范围' }]}
                >
                    <Radio.Group >
                        <Radio value={1}>所有</Radio>
                        <Radio value={2}>物业</Radio>
                        <Radio value={3}>公司</Radio>

                    </Radio.Group>
                </Form.Item>
                <Form.Item<FieldType>
                    label="文章内容"
                    name="content"
                    rules={[{ required: true, message: '请发布文章内容' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        </div>
    )
}

export default Articles