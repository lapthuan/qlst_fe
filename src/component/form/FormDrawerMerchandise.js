
import CustomDrawer from "../drawer/CustomDrawer";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import useAsync from "../../hook/useAsync";
import ServicesMerchandise from "../../service/ServiceMerchandise";
import { useEffect, useState } from "react";
import ServiceTypeOfMerchandise from "../../service/ServiceTypeOfMerchandise";
import ServiceManufacturer from "../../service/ServiceManufacturer";
import ServiceCoupon from "../../service/ServiceCoupon";
const { Option } = Select;

const FormDrawerMerchandise = ({ open, setOpen, title, id, setId }) => {
    const [form] = Form.useForm();
    const { data: typeOfMerchandise } = useAsync(() => ServiceTypeOfMerchandise.getAllTypeOfMerchandise())
    const { data: Manufacturer } = useAsync(() => ServiceManufacturer.getAllManufacturer())
    const { data: Coupon } = useAsync(() => ServiceCoupon.getAllCoupon())

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await ServicesMerchandise.getAMerchandise(id)
                if (res) {
                    form.setFieldsValue({
                        mamh: res[0].MaMH,
                        tenmh: res[0].TenMH,
                        malh: res[0].MaLH,
                        mansx: res[0].MaNSX,
                        mota: res[0].MoTa,
                        giamgia: res[0].GiamGia,
                        magiamgia: res[0].MaGiamGia,
                        dvt: res[0].DVT,
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
                "reqMaLH": values.malh,
                "reqMaNSX": values.mansx,
                "reqMaGiamGia": values.magiamgia,
                "reqTenMH": values.tenmh,
                "reqGiamGia": values.giamgia,
                "reqMoTa": values.mota,
                "reqDVT": values.dvt,
            }

            const res = await ServicesMerchandise.editMerchandise(body, id)

            if (res.message) {
                message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }

        } else {
            const body = {
                "reqMaMH": values.mamh,
                "reqMaLH": values.malh,
                "reqMaNSX": values.mansx,
                "reqMaGiamGia": values.magiamgia,
                "reqTenMH": values.tenmh,
                "reqGiamGia": values.giamgia,
                "reqMoTa": values.mota,
                "reqDVT": values.dvt,
            }

            const res = await ServicesMerchandise.createMerchandise(body)
            
            if (res.message == "mặt hàng đã tồn tại") {
                message.warning("Mã mặt hàng đã tồn tại!")
            } else if (res.message == "Đồng bộ thêm mặt hàng thành công") {
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
                            name="mamh"
                            label="Mã mặt hàng"

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mã mặt hàng',
                                },
                            ]}
                        >
                            <Input disabled={id ? true : false} placeholder="Nhập mã mặt hàng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tenmh"
                            label="Tên mặt hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên mặt hàng',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên mặt hàng" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="malh"
                            label="Loại hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn loại hàng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn loại hàng">
                                {typeOfMerchandise?.map((item, i) => (
                                    <Option key={i + 1} value={item.MaLH}>{item.TenLH}</Option>

                                ))}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="magiamgia"
                            label="Mã giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn mã giảm giá',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn mã giảm giá">
                                {Coupon?.map((item, i) => (
                                    <Option key={i + 1} value={item.MaGiamGia}>{item.TenMaGG}</Option>

                                ))}

                            </Select>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="mansx"
                            label="Nhà sản xuất"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn nhà sản xuất',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhà sản xuất">
                                {Manufacturer?.map((item, i) => (
                                    <Option key={i + 1} value={item.MaNsx}>{item.TenNsx}</Option>

                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="dvt"
                            label="Đơn vị tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập đơn vị tính',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập đơn vị tính" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="giamgia"
                            label="Giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá mặt hàng" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="mota"
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mô tả',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
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

export default FormDrawerMerchandise;