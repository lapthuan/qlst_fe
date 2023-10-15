import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';


const DeliveryReceipt = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã phiếu nhập',
            dataIndex: 'maphieunhap',
            key: 'maphieunhap',
        },
        {
            title: 'Nhân viên',
            dataIndex: 'nhanvien',
            key: 'nhanvien',
        },
        {
            title: 'Kho',
            dataIndex: 'kho',
            key: 'kho',
        },
        {
            title: 'ĐVT',
            dataIndex: 'dvt',
            key: 'dvt',
        },
        {
            title: 'Ngày lập phiếu',
            dataIndex: 'ngaylapphieu',
            key: 'ngaylapphieu',
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
            <FormDrawerManufacturer open={open} setOpen={setOpen} title={"Thêm phiếu nhập"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Chức năng</Breadcrumb.Item>
                <Breadcrumb.Item>Phiếu nhập</Breadcrumb.Item>

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

export default DeliveryReceipt;