import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerAccount from '../component/form/FormDrawerAccount';


const Account = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'tentk',
            key: 'tentk',
        },
        {
            title: 'Mã NV',
            dataIndex: 'manv',
            key: 'manv',
        },
        {
            title: 'Quyền',
            dataIndex: 'quyen',
            key: 'quyen',
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
            <FormDrawerAccount open={open} setOpen={setOpen} title={"Thêm tài khoản"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản trị</Breadcrumb.Item>
                <Breadcrumb.Item>Tài khoản</Breadcrumb.Item>

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

export default Account;