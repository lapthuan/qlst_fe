import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';



const Branch = () => {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: 'Mã chi nhánh',
            dataIndex: 'machinhanh',
            key: 'machinhanh',
        },
        {
            title: 'Tên chi nhánh',
            dataIndex: 'tenchinhanh',
            key: 'tenchinhanh',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diachi',
            key: 'diachi',
        },
        {
            title: 'SĐT',
            dataIndex: 'sdt',
            key: 'sdt',
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
                <Breadcrumb.Item>Chi nhánh</Breadcrumb.Item>
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

export default Branch;