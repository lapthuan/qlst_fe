
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect } from "react";
import ServiceHRDepartment from "../../service/ServiceHRDepartment";


const FormDrawerHRDepartment = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await ServiceHRDepartment.getHRDepartment(id)
                if (res) {
                    form.setFieldsValue({
                        mabophan: res[0].MaBP,
                        tenbophan: res[0].TenBP,

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

                "reqTenBP": values.tenbophan,
            }

            const res = await ServiceHRDepartment.editHRDepartment(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {

            const body = {
                "reqMaBP": values.mabophan,
                "reqTenBP": values.tenbophan,
            }

            const res = await ServiceHRDepartment.createHRDepartment(body)
            console.log('res', res)
            if (res.message == "Bộ phận đã tồn tại") {
                message.warning("Mã bộ phận đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm bộ phận thành công") {
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
                            {id ? "Sửa " : "Thêm "}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </CustomDrawer >

    );
}

export default FormDrawerHRDepartment;