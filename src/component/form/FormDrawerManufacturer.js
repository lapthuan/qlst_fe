
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServiceTypeOfMerchandise from "../../service/ServiceTypeOfMerchandise";
import ServiceManufacturer from "../../service/ServiceManufacturer";
import { useEffect } from "react";
const { Option } = Select;

const FormDrawerManufacturer = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    useEffect(() => {

        if (id) {
            (async () => {
                const res = await ServiceManufacturer.getAManufacturer(id)

                if (res) {
                    form.setFieldsValue({

                        mansx: res[0].MaNsx,
                        sdt: res[0].Sdt,
                        tennsx: res[0].TenNsx,
                        diachi: res[0].Diachi,

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
                "reqTenNsx": values.tennsx,
                "reqDiachi": values.diachi,
                "reqSdt": values.sdt

            }

            const res = await ServiceManufacturer.editManufacturer(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {

            const body = {
                "reqMaNsx": values.mansx,
                "reqTenNsx": values.sdt,
                "reqDiachi": values.tennsx,
                "reqSdt": values.diachi,

            }

            const res = await ServiceManufacturer.createManufacturer(body)

            if (res.message == "nhà sản xuất đã tồn tại") {
                message.warning("Mã nhà sản xuất đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm nhà sản xuất thành công") {
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
                            name="mansx"
                            label="Mã NSX"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã nhà sản xuất',
                                },
                            ]}
                        >
                            <Input disabled={id ? true : false} placeholder="Nhập mã nhà sản xuất" />
                        </Form.Item>
                    </Col>

                    <Col span={12} >
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
                <Row >
                    <Col span={24}>
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
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
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
                            <Input.TextArea rows={4} placeholder="Nhập địa chỉ" />
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

export default FormDrawerManufacturer;