
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import ServiceEmployee from "../../service/ServiceEmployee";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
import dayjs from "dayjs";
import ServicesMerchandise from "../../service/ServiceMerchandise";
const { Option } = Select;

const FormDrawerDeliveryReceiptDetail = ({ open, setOpen, title, id, setId, iddr }) => {
    const [form] = Form.useForm();
    const { data: Merchandise } = useAsync(() => ServicesMerchandise.getAllMerchandise())

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await ServiceDeliveryReceipt.getDeliveryReceiptDetail(id)
                if (res) {

                    form.setFieldsValue({
                        mamh: res[0].MaMH,
                        gianhap: res[0].GiaNhap,
                        giaban: res[0].GiaBan,
                        soluong: res[0].SoLuong,

                    });
                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id) {
            const thanhtien = values.gianhap * values.soluong


            const body = {
                "reqMaMH": values.mamh,
                "reqGiaNhap": values.gianhap,
                "reqGiaBan": values.giaban,
                "reqSoLuong": values.soluong,
                "reqThanhTien": thanhtien,
            }

            const res = await ServiceDeliveryReceipt.editDeliveryReceiptDetail(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {
            const thanhtien = values.gianhap * values.soluong

            const body = {
                "reqMaPhieuNhap": iddr,
                "reqMaMH": values.mamh,
                "reqGiaNhap": values.gianhap,
                "reqGiaBan": values.giaban,
                "reqSoLuong": values.soluong,
                "reqThanhTien": thanhtien,
            }

            const res = await ServiceDeliveryReceipt.createDeliveryReceiptDetail(body)
            if (res.message == "chi tiết phiếu nhập đã tồn tại") {
                message.warning("Chi tiết phiếu nhập đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm chi tiết phiếu nhập thành công") {
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
                            name="gianhap"
                            label="Giá nhập"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá nhập',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá nhập" />

                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="giaban"
                            label="Giá bán"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá bán',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập đơn giá bán" />
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

export default FormDrawerDeliveryReceiptDetail;