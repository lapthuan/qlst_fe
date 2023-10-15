
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;

const FormDrawerDeliveryReceipt = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="maphieunhap"
                            label="Mã phiếu nhập"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã phiếu nhập',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã phiếu nhập" />
                        </Form.Item>
                    </Col>
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
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="makho"
                            label="Kho"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn kho',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn kho">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="dvt"
                            label="Đơn vị tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đơn vị tính',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập đơn vị tính" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="ngaylapphieu"
                            label="Ngày lập phếu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày lập phiếu',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{
                                    width: "100%"
                                }}

                                placeholder="Nhập ngày lập phiếu" />
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

export default FormDrawerDeliveryReceipt;