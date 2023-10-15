
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, Row, Space } from "antd";
import dayjs from "dayjs";

const FormDrawerCoupon = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="magiamgia"
                            label="Mã giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã giảm giá',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã giảm giá" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="tenmgg"
                            label="Tên mã giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên mã giảm giá',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mã giảm giá" />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="sdt"
                            label="Giá trị giảm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá trị giảm',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập giá trị giảm" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="ngày"
                            label="Ngày"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày ',
                                },
                            ]}
                        >
                            <DatePicker.RangePicker
                                style={{ width: '80%' }}
                                placeholder={["Ngày áp dụng", "Ngày hết hạn"]}
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="DD-MM-YYYY HH:mm" />
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

export default FormDrawerCoupon;