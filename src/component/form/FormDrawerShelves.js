
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServiceShelves from "../../service/ServiceShelves";
import { useEffect } from "react";
import ServicesMerchandise from "../../service/ServiceMerchandise";
import useAsync from "../../hook/useAsync";
const { Option } = Select;

const FormDrawerShelves = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    const { data: Merchandise } = useAsync(() => ServicesMerchandise.getAllMerchandise())
    useEffect(() => {
        if (id) {
            (async () => {
                const res = await ServiceShelves.getShelves(id)
                if (res) {
                    form.setFieldsValue({
                        make: res[0].MaKe,
                        mamh: res[0].MaMH,
                        tenke: res[0].TenKe,
                        vitri: res[0].Vitri,

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
                "reqMaMH": values.mamh,
                "reqTenKe": values.tenke,
                "reqVitri": values.vitri,
            }

            const res = await ServiceShelves.editShelves(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {

            const body = {
                "reqMaKe": values.make,
                "reqMaMH": values.mamh,
                "reqTenKe": values.tenke,
                "reqVitri": values.vitri,
            }

            const res = await ServiceShelves.createShelves(body)

            if (res.message == "kệ hàng đã tồn tại") {
                message.warning("Mã kệ đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm kệ hàng thành công") {
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
                            name="make"
                            label="Mã kệ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã kệ',
                                },
                            ]}
                        >
                            <Input disabled={id ? true : false} placeholder="Nhập mã kệ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenke"
                            label="Tên kệ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên kệ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên kệ" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="mamh"
                            label="Mặt hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn mặt hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn mặt hàng">
                                {
                                    Array.isArray(Merchandise) &&
                                    Merchandise?.map((item, i) => (
                                        <Option key={i + 1} value={item.MaMH}>{item.TenMH}</Option>
                                    ))}


                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="vitri"
                            label="Vị trí"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập vị trí',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập vị trí" />
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

export default FormDrawerShelves;