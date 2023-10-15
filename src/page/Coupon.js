import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerCoupon from '../component/form/FormDrawerCoupon';


const Coupon = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã giảm giá',
            dataIndex: 'magiamgia',
            key: 'magiamgia',
        },
        {
            title: 'Tên mã giảm giá',
            dataIndex: 'tenmagg',
            key: 'tenmagg',
        },
        {
            title: 'Giá trị giảm',
            dataIndex: 'giatrigiam',
            key: 'giatrigiam',
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'ngayapdung',
            key: 'ngayapdung',
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'ngayhethan',
            key: 'ngayhethan',
        },
        {
            title: 'Công cụ',
            key: 'congcu',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="dashed" >Sửa</Button>
                    <Button type="primary" danger>Xóa</Button>
                </Space >
            ),
        },
    ];

    let data = []

    return (
        <>
            <FormDrawerCoupon open={open} setOpen={setOpen} title={"Thêm phiếu giảm giá"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                <Breadcrumb.Item>Phiếu giảm giá</Breadcrumb.Item>
            </Breadcrumb>
            <div className='page-container'>

                <Space direction="vertical">
                    <Space wrap>
                        <Button icon={<AiOutlinePlus />} type="primary" onClick={() => setOpen(!open)}>
                            Thêm
                        </Button>
                    </Space>

                </Space>
                <Divider orientation="left" plain>
                    Danh sách
                </Divider>
                <div>
                    <CustomTable columns={columns} data={data} />
                </div>
            </div>
        </>
    );
}

export default Coupon;