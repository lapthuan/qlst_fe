

import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomDrawer from '../component/drawer/CustomDrawer';
import FormDrawerProduct from '../component/form/FormDrawerProduct';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';


const Home = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã MH',
            dataIndex: 'mamh',
            key: 'mamh',
        },
        {
            title: 'Loại hàng',
            dataIndex: 'malh',
            key: 'mamh',
        },
        {
            title: 'Năm SX',
            dataIndex: 'mansx',
            key: 'mansx',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'magiamgia',
            key: 'magiamgia',
        }, {
            title: 'Tên mặt hàng',
            dataIndex: 'tenmh',
            key: 'tenmh',
        }, {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Mô tả',
            dataIndex: 'mota',
            key: 'mota',
        },
        {
            title: 'ĐVT',
            dataIndex: 'dvt',
            key: 'dvt',
        },
        {
            title: 'Action',
            key: 'action',
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
            <FormDrawerProduct open={open} setOpen={setOpen} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>

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

export default Home;
