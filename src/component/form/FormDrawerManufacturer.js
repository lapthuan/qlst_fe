
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, Row, Space } from "antd";

const FormDrawerManufacturer = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="mansx"
                            label="Mã NSX"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã nhà sản xuất',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã nhà sản xuất" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="tennsx"
                            label="Tên nhà sản xuất"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy Nhập tên nhà sản xuất',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên nhà sản xuất" />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="sdt"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập số điện thoại',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="Địa chỉ"
                            label="Tên loại hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập địa chỉ',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập địa chỉ" />
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

export default FormDrawerManufacturer;