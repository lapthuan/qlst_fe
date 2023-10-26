
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Space } from "antd";
import { useEffect } from "react";
import ServiceTypeOfMerchandise from "../../service/ServiceTypeOfMerchandise";

const FormDrawerTypeOfMerchandise = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();


    useEffect(() => {

        if (id) {
            (async () => {
                const res = await ServiceTypeOfMerchandise.getALTypeOfMerchandise(id)
               
                if (res) {
                    form.setFieldsValue({

                        malh: res[0].MaLH,
                        tenlh: res[0].TenLH,

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
                "reqMaLH": values.malh,
                "reqTenLH": values.tenlh,

            }

            const res = await ServiceTypeOfMerchandise.editTypeOfMerchandise(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {

            const body = {
                "reqMaLH": values.malh,
                "reqTenLH": values.tenlh,

            }

            const res = await ServiceTypeOfMerchandise.createTypeOfMerchandise(body)
          
            if (res.message == "loại hàng đã tồn tại") {
                message.warning("Mã loại hàng đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm loại hàng thành công") {
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
                    <Col span={24}>
                        <Form.Item
                            name="malh"
                            label="Mã loại hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy Nhập mã loại hàng',
                                },
                            ]}
                        >
                            <Input disabled={id ? true : false} placeholder="Nhập mã loại hàng" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="tenlh"
                            label="Tên loại hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên loại hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mặt hàng" />
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

export default FormDrawerTypeOfMerchandise;