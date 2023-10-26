
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, DatePicker, Form, Input, message, Row, Space } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import ServiceManufacturer from "../../service/ServiceManufacturer";
import ServiceCoupon from "../../service/ServiceCoupon";

const FormDrawerCoupon = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();


    useEffect(() => {

        if (id) {
            (async () => {
                const res = await ServiceCoupon.getACoupon(id)
            
                if (res) {

                    const startDate = dayjs(res[0].NgayApDung, 'YYYY-MM-DD HH:mm');
                    const endDate = dayjs(res[0].NgayHetHan, 'YYYY-MM-DD HH:mm');
                    form.setFieldsValue({

                        magiamgia: res[0].MaGiamGia,
                        tenmgg: res[0].TenMaGG,
                        giatrigiam: res[0].GiaTriGiam,
                        ngay: [startDate, endDate],

                    });

                }
            })();
        } else {
            form.resetFields()
        }
    }, [id])
    const onFinish = async (values) => {
        if (id) {
            const ngayapdung = dayjs(values.ngay[0]).format('YYYY-MM-DD HH:mm:ss')
            const ngayhethan = dayjs(values.ngay[1]).format('YYYY-MM-DD HH:mm:ss')
            const body = {
                "reqTenMaGG": values.tenmgg,
                "reqGiaTriGiam": values.giatrigiam,
                "reqNgayApDung": ngayapdung,
                "reqNgayHetHan": ngayhethan

            }

            const res = await ServiceCoupon.editCoupon(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {

            const ngayapdung = dayjs(values.ngay[0]).format('YYYY-MM-DD HH:mm:ss')
            const ngayhethan = dayjs(values.ngay[1]).format('YYYY-MM-DD HH:mm:ss')

            const body = {
                "reqMaGiamGia": values.magiamgia,
                "reqTenMaGG": values.tenmgg,
                "reqGiaTriGiam": values.giatrigiam,
                "reqNgayApDung": ngayapdung,
                "reqNgayHetHan": ngayhethan

            }

            const res = await ServiceCoupon.createCoupon(body)

            if (res.message == "phiếu giảm giá đã tồn tại") {
                message.warning("Mã phiếu giảm giá đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm phiếu giảm giá thành công") {
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
                    <Col span={8}>
                        <Form.Item
                            name="magiamgia"
                            label="Mã giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã giảm giá',
                                },
                            ]}
                        >
                            <Input disabled={id ? true : false} placeholder="Nhập mã giảm giá" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="tenmgg"
                            label="Tên mã giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên mã giảm giá',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mã giảm giá" />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="giatrigiam"
                            label="Giá trị giảm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá trị giảm',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập giá trị giảm" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="ngay"
                            label="Ngày"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày ',
                                },
                            ]}
                        >
                            <DatePicker.RangePicker

                                style={{ width: '80%' }}
                                placeholder={["Ngày áp dụng", "Ngày hết hạn"]}
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="DD-MM-YYYY HH:mm" />
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

export default FormDrawerCoupon;