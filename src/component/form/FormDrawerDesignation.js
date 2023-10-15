
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;

const FormDrawerDesignation = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="machucvu"
                            label="Mã chức vụ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã chức vụ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã chức vụ" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="tencongviec"
                            label="Tên công việc"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên công việc',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên công việc" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="mabophan"
                            label="Bộ phận"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn bộ phận',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn bộ phận">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
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

export default FormDrawerDesignation;