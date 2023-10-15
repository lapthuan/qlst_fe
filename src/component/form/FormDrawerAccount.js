
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;

const FormDrawerAccount = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="tentk"
                            label="Tên tài khoản"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên tài khoản',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên tài khoản" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="matkhau"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="manv"
                            label="Nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhân viên',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhân viên">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="quyen"
                            label="Quyền"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn quyền',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn quyền" defaultValue={"0"}>
                                <Option value="1">Admin</Option>
                                <Option value="0">Nhân viên</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                >
                    <Space align="end">
                        <Button onClick={() => setOpen(!open)}>Hủy</Button>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </CustomDrawer >

    );
}

export default FormDrawerAccount;