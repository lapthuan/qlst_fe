
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServiceDesignation from "../../service/ServiceDesignation";
import ServiceHRDepartment from "../../service/ServiceHRDepartment";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;


const FormDrawerDesignation = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    const { data: HRDepartment } = useAsync(() => ServiceHRDepartment.getAllHRDepartment())


    useEffect(() => {
        if (id) {
            (async () => {
                const res = await ServiceDesignation.getADesignation(id)
                if (res) {
                    form.setFieldsValue({
                        machucvu: res[0].MaCV,
                        mabophan: res[0].MaBP,
                        tenchucvu: res[0].TenCV,
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
                "reqMaBP": values.mabophan,
                "reqTenCV": values.tenchucvu,
            }

            const res = await ServiceDesignation.editDesignation(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {

            const body = {
                "reqMaCV": values.machucvu,
                "reqMaBP": values.mabophan,
                "reqTenCV": values.tenchucvu,
            }

            const res = await ServiceDesignation.createDesignation(body)
            console.log('res', res)
            if (res.message == "Chức vụ đã tồn tại") {
                message.warning("Mã chức vụ đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm chức vụ thành công") {
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
                            <Input disabled={id ? true : false} placeholder="Nhập mã chức vụ" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="tenchucvu"
                            label="Tên chức vụ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên chức vụ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên chức vụ" />
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
                                {
                                    Array.isArray(HRDepartment) &&
                                    HRDepartment?.map((item, i) => (

                                        <Option key={i + 1} value={item.MaBP}>{item.TenBP}</Option>

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
                            {id ? "Sửa " : "Thêm "}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </CustomDrawer >

    );
}

export default FormDrawerDesignation;