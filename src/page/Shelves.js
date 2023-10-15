import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerShelves from '../component/form/FormDrawerShelves';

const Shelves = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã kệ',
            dataIndex: 'magiamgia',
            key: 'magiamgia',
        },
        {
            title: 'Mặt hàng',
            dataIndex: 'mathang',
            key: 'mathang',
        },
        {
            title: 'Tên kệ',
            dataIndex: 'tenke',
            key: 'tenke',
        },
        {
            title: 'Vị trí',
            dataIndex: 'vitri',
            key: 'ngayapdung',
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
            <FormDrawerShelves open={open} setOpen={setOpen} title={"Thêm kệ"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Chức năng</Breadcrumb.Item>
                <Breadcrumb.Item>Kệ</Breadcrumb.Item>

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

export default Shelves;