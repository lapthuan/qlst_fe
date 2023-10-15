import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerDesignation from '../component/form/FormDrawerDesignation';


const Designation = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã chức vụ',
            dataIndex: 'machucvu',
            key: 'machucvu',
        },
        {
            title: 'Bộ phận',
            dataIndex: 'bophan',
            key: 'bophan',
        },
        {
            title: 'Tên công việc',
            dataIndex: 'tencongviec',
            key: 'tencongviec',
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
            <FormDrawerDesignation open={open} setOpen={setOpen} title={"Thêm chức vụ"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản trị</Breadcrumb.Item>
                <Breadcrumb.Item>Chức vụ</Breadcrumb.Item>

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

export default Designation;