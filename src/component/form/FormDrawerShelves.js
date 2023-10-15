
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;

const FormDrawerShelves = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="make"
                            label="Mã kệ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã kệ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã kệ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenke"
                            label="Tên kệ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên kệ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên kệ" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="mamh"
                            label="Mặt hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn mặt hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn mặt hàng">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="vitri"
                            label="Vị trí"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập vị trí',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập vị trí" />
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

export default FormDrawerShelves;