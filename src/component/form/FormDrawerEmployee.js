
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import useAsync from "../../hook/useAsync";
import ServiceDesignation from "../../service/ServiceDesignation";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceCustomer from "../../service/ServiceCustomer";
import dayjs from "dayjs";
import ServiceEmployee from "../../service/ServiceEmployee";
import { useEffect } from "react";
const { Option } = Select;

const FormDrawerEmployee = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    const { data: designation } = useAsync(() => ServiceDesignation.getAllDesignation())
    const { data: branch } = useAsync(() => ServiceBranch.getAllBranch())
    useEffect(() => {

        if (id) {
            (async () => {
                const res = await ServiceEmployee.getAEmployee(id)

                if (res) {

                    const ngaysinhfm = dayjs(res[0].NgaySinh, 'YYYY-MM-DD');

                    form.setFieldsValue({

                        manv: res[0].MaNV,
                        machinhanh: res[0].MaCN,
                        macv: res[0].MaCV,
                        tennv: res[0].TenNV,
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

                "reqMaCN": values.machinhanh,
                "reqMaCV": values.macv,
                "reqTenNV": values.tennv,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiachi": values.diachi,
                "reqSdt": values.sdt,


            }

            const res = await ServiceEmployee.editEmployee(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }
          
        } else {
            const ngaysinh = dayjs(values.ngaysinh).format('YYYY-MM-DD HH:mm:ss')

            const body = {
                "reqMaNV": values.manv,
                "reqMaCN": values.machinhanh,
                "reqMaCV": values.macv,
                "reqTenNV": values.tennv,
                "reqNgaySinh": ngaysinh,
                "reqGioiTinh": values.gioitinh,
                "reqDiachi": values.diachi,
                "reqSdt": values.sdt,


            }

            const res = await ServiceEmployee.createEmployee(body)
          
            if (res.message == "Lỗi khi thêm nhân viên vào SQL Server") {
                message.warning("Mã nhân viên đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm nhân viên thành công!") {
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
                            name="manv"
                            label="Mã nhân viên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã nhân viên',
                                },
                            ]}
                        >
                            <Input disabled={id ? true : false} placeholder="Nhập mã nhân viên" />
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
                                format="DD-MM-YYYY"
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
                                <Option value="Nu">Nữ</Option>
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
                                {branch.map((item, i) => (
                                    <Option key={i + 1} value={item.MaCN}>{item.TenCN}</Option>
                                ))}


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
                                {designation.map((item, i) => (
                                    <Option key={i + 1} value={item.MaCV}>{item.TenCV}</Option>
                                ))}
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

export default FormDrawerEmployee;