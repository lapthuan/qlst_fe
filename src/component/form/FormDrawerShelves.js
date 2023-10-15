
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
                            name="mamh"
                            label="Mã mặt hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã mặt hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã mặt hàng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenmh"
                            label="Tên mặt hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên mặt hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mặt hàng" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="malh"
                            label="Loại hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn loại hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn loại hàng">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="mansx"
                            label="Nhà sản xuất"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhà sản xuất',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhà sản xuất">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="magiamgia"
                            label="Mã giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn mã giảm giá',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mặt hàng" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
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
                    <Col span={12}>
                        <Form.Item
                            name="giamgia"
                            label="Giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập giá mặt hàng" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="mota"
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mô tả',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
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