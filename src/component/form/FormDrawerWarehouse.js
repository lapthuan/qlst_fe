
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import { useEffect } from "react";
import ServiceBranch from "../../service/ServiceBranch";
import useAsync from "../../hook/useAsync";
const { Option } = Select;

const FormDrawerWarehouse = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    const { data: branch } = useAsync(() => ServiceBranch.getAllBranch())
    useEffect(() => {
        if (id) {
            (async () => {
                const res = await ServiceWarehouse.getWarehouse(id)
                if (res) {
                    form.setFieldsValue({
                        makho: res[0].MaKho,
                        machinhanh: res[0].MaCN,
                        tenkho: res[0].TenKho,
                        diachi: res[0].DiaChi,

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
                "reqMaCN": values.machinhanh,
                "reqTenKho": values.tenkho,
                "reqDiaChi": values.diachi,
            }

            const res = await ServiceWarehouse.editWarehouse(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {

            const body = {
                "reqMaKho": values.makho,
                "reqMaCN": values.machinhanh,
                "reqTenKho": values.tenkho,
                "reqDiaChi": values.diachi,
            }

            const res = await ServiceWarehouse.createWarehouse(body)
       
            if (res.message == "Kho đã tồn tại") {
                message.warning("Mã kho đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm kho thành công") {
                message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        }
    };
    return (
        <CustomDrawer open={open} setOpen={setOpen} title={(id ? "Sửa " : "Thêm ") + title} setId={setId}  >
            <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="makho"
                            label="Mã kho"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã kho',
                                },
                            ]}
                        >
                            <Input disabled={id ? true : false} placeholder="Nhập mã kho" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenkho"
                            label="Tên kho"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên kho',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên kho" />
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

export default FormDrawerWarehouse;