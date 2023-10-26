
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import ServiceEmployee from "../../service/ServiceEmployee";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
import dayjs from "dayjs";
import ServiceCustomer from "../../service/ServiceCustomer";
import ServiceOrder from "../../service/ServiceOrder";
import ServicesMerchandise from "../../service/ServiceMerchandise";
const { Option } = Select;

const FormDrawerOrderDetail = ({ open, setOpen, title, id, setId, idhd, idMaMH }) => {
    const [form] = Form.useForm();

    const { data: Merchandise } = useAsync(() => ServicesMerchandise.getAllMerchandise())

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await ServiceOrder.getAOrderDetails(idMaMH, id)
                if (res) {


                    form.setFieldsValue({
                        mamh: res[0].MaMH,
                        soluong: res[0].SoLuong,
                        dongia: res[0].DonGia,

                    });

                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id) {

            const thanhtien = values.dongia * values.soluong

            const body = {
                "id": idhd,
                "idmamh": idMaMH,
                "reqMaMH": values.mamh,
                "reqSoLuong": values.soluong,
                "reqDonGia": values.dongia,
                "reqThanhTien": thanhtien
            }
            const res = await ServiceOrder.editOrderDetail(body)
            if (res.message === "Trùng chi tiết hóa đơn") {
                message.success("Sản phẩm trong hóa đơn đã tồn tại!")
            } else if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {
            const thanhtien = values.dongia * values.soluong

            const body = {
                "reqMaHD": idhd,
                "reqMaMH": values.mamh,
                "reqSoLuong": values.soluong,
                "reqDonGia": values.dongia,
                "reqThanhTien": thanhtien
            }

            const res = await ServiceOrder.createOrderDetail(body)

            if (res.message == "chi tiết hóa đơn đã tồn tại") {
                message.warning("Mã chi tiết hóa đơn đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm chi tiết hóa đơn thành công") {
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
                                {Merchandise?.map((item, i) => (
                                    <Option key={i + 1} value={item.MaMH}>{item.TenMH}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="soluong"
                            label="Số lượng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập số lượng',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập số lượng" />

                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="dongia"
                            label="Đơn giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn đơn giá',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập đơn giá" />

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

export default FormDrawerOrderDetail;