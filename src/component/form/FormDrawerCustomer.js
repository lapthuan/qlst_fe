
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import useAsync from "../../hook/useAsync";
import ServiceBranch from "../../service/ServiceBranch";
import dayjs from "dayjs";
import ServiceCustomer from "../../service/ServiceCustomer";
import { useEffect } from "react";
const { Option } = Select;

const FormDrawerCustomer = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    const { data: branch } = useAsync(() => ServiceBranch.getAllBranch())
    useEffect(() => {

        if (id) {
            (async () => {
                const res = await ServiceCustomer.getACustomer(id)

                if (res) {

                    const ngaysinhfm = dayjs(res[0].NgaySinh, 'YYYY-MM-DD');

                    form.setFieldsValue({
                        makh: res[0].MaKH,
                        machinhanh: res[0].MaCN,
                        tenkh: res[0].TenKH,
                        gioitinh: res[0].GioiTinh,
                        diachi: res[0].Diachi,
                        sdt: res[0].Sdt,
                        ngaysinh: ngaysinhfm
                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id) {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD HH:mm:ss')
            const body = {
                "reqTenKH": values.tenkh,
                "reqMaCN": values.machinhanh,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiaChi": values.diachi,
                "reqSdt": values.sdt,
            }

            const res = await ServiceCustomer.editCustomer(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD HH:mm:ss')

            const body = {
                "reqMaKH": values.makh,
                "reqTenKH": values.tenkh,
                "reqMaCN": values.machinhanh,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiaChi": values.diachi,
                "reqSdt": values.sdt,
            }

            const res = await ServiceCustomer.createCustomer(body)

            if (res.message == "Khách hàng đã tồn tại!") {
                message.warning("Mã khách hàng đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm khách hàng thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        }


    };
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={(id ? "Sửa " : "Thêm ") + title} setId={setId} >
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="makh"
                            label="Mã khách hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã khách hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã mặt hàng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenkh"
                            label="Tên khách hàng"
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
                                {
                                    Array.isArray(branch) &&
                                    branch.map((item, i) => (
                                        <Option key={i + 1} value={item.MaCN}>{item.TenCN}</Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
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

                    <Col span={8}>
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
                            <Select placeholder="Chọn giới tính" >
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

export default FormDrawerCustomer;