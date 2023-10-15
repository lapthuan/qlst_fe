import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';

const Order = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'magiamgia',
            key: 'magiamgia',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'tennhanvien',
            key: 'tennhanvien',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenkhachhang',
            key: 'tenkhachhang',
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'hinhthucthanhtoan',
            key: 'hinhthucthanhtoan',
        },
        {
            title: 'Sản phẩm',
            key: 'sanpham',
            render: (_, record) => (
                <Button type="primary" >Xem</Button>
            ),
        },
        {
            title: 'Công cụ',
            key: 'congcu',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" danger>Xóa</Button>
                </Space >
            ),
        },
    ];

    let data = []
    return (
        <>

            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >

                <Breadcrumb.Item>Hóa đơn</Breadcrumb.Item>

            </Breadcrumb>
            <div className='page-container'>


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

export default Order;