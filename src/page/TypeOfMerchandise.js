
import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerTypeOfMerchandise from '../component/form/FromDrawerTypeOfMerchandise';



const TypeOfMerchandise = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã Loại hàng',
            dataIndex: 'malh',
            key: 'malh',
        },
        {
            title: 'Tên loại hàng',
            dataIndex: 'tenlh',
            key: 'tenlh',
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
            <FormDrawerTypeOfMerchandise open={open} setOpen={setOpen} title={"Thêm loại hàng"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                <Breadcrumb.Item>Loại mặt hàng</Breadcrumb.Item>

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

export default TypeOfMerchandise;