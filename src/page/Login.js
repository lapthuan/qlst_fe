import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import ServiceEmployee from '../service/ServiceEmployee';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const body = {
            taikhoan: values.username,
            matkhau: values.password
        }
        const res = await ServiceEmployee.loginEmployee(body)
        console.log('res', res[0])
        if (res.message) {
            message.warning("Sai tài khoản hoặc mật khẩu")
        } else {
            message.success("Đăng nhập thành công")
            localStorage.setItem("user", JSON.stringify(res[0]));
            navigate("/")
        }
    };


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "gray"
            }}
        >
            <Card style={{ width: 500 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Title level={2}>Đăng nhập Siệu Thị</Title>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Hãy nhập tài khoản!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Nhập tài khoản"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />

                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                        >
                            Đăng nhập
                        </Button>

                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login