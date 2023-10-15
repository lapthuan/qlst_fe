
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;

const FormDrawerEmployee = ({ open, setOpen, title }) => {
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={title} >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="manv"
                            label="Mã nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã nhân viên',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tennv"
                            label="Họ tên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên nhân viên',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên nhân viên" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="ngaysinh"
                            label="Ngày sinh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày sinh',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày sinh" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="gioitinh"
                            label="Giới tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn giới tính',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn giới tính">
                                <Option value="Nam">Nam</Option>
                                <Option value="Nữ">Nữ</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="diachi"
                            label="Địa chỉ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập địa chỉ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    <Col span={12}>
                        <Form.Item
                            name="machinhanh"
                            label="Chi nhánh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn chi nhánh',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn chi nhánh">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="macv"
                            label="Chức vụ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn chức vụ',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn chức vụ">
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

export default FormDrawerEmployee;