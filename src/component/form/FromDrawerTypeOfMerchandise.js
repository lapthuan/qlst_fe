
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, Row, Space } from "antd";

const FormDrawerTypeOfMerchandise = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="malh"
                            label="Mã loại hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy Nhập mã loại hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã loại hàng" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="tenlh"
                            label="Tên loại hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên loại hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mặt hàng" />
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

export default FormDrawerTypeOfMerchandise;