
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;

const FormDrawerHRDepartment = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="mabophan"
                            label="Mã bộ phận"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã bộ phận',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã bộ phận" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenbophan"
                            label="Tên bộ phận"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên bộ phận',
                                },
                            ]}
                        >

                            <Input placeholder="Nhập tên bộ phận" />

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

export default FormDrawerHRDepartment;