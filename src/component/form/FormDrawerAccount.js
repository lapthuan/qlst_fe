
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServiceAccount from "../../service/ServiceAccount";
import { useEffect } from "react";
import useAsync from "../../hook/useAsync";
import ServiceEmployee from "../../service/ServiceEmployee";
const { Option } = Select;

const FormDrawerAccount = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    const { data: Employee } = useAsync(() => ServiceEmployee.getAllEmployee())
    useEffect(() => {

        if (id) {
            (async () => {
                const res = await ServiceAccount.getAccount(id)

                if (res) {
                    form.setFieldsValue({
                        tentk: res[0].TenTK,
                        manv: res[0].MaNV,
                        matkhau: res[0].Matkhau,
                        quyen: res[0].Quyen,
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])

    const onFinish = async (values) => {
        if (id) {

            const body = {

                "reqMaNV": values.manv,
                "reqMatKhau": values.matkhau,
                "reqQuyen": values.quyen,

            }

            const res = await ServiceAccount.editAccount(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {


            const body = {
                "reqTenTk": values.tentk,
                "reqMaNV": values.manv,
                "reqMatKhau": values.matkhau,
                "reqQuyen": values.quyen,
            }

            const res = await ServiceAccount.createAccount(body)

            if (res.message == "Tài khoản đã tồn tại") {
                message.warning("Tài khoản đã tồn tại")
            } else if (res.message == "Đồng bộ thêm tài khoản thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        }


    };

    return (
        <CustomDrawer open={open} setOpen={setOpen} title={(id ? "Sửa " : "Thêm ") + title} setId={setId}>
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
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
                            <Input disabled={id ? true : false} placeholder="Nhập tên tài khoản" />
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
                                {
                                    Array.isArray(Employee) &&
                                    Employee?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaNV}>{item.TenNV}</Option>
                                    ))}
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
                            {id ? "Sửa" : " Thêm"}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </CustomDrawer >

    );
}

export default FormDrawerAccount;