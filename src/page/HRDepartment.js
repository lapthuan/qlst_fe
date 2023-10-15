import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerHRDepartment from '../component/form/FormDrawerHRDepartment';
import ServiceHRDepartment from '../service/ServiceHRDepartment';
import useAsync from '../hook/useAsync';

const HRDepartment = () => {
    const [open, setOpen] = useState(false);
     const [id, setId] = useState();
    const { data: hrdepartment } = useAsync(() => ServiceHRDepartment.getAllHRDepartment())
    const columns = [
        {
            title: 'Mã bộ phận',
            dataIndex: 'magiamgia',
            key: 'magiamgia',
        },
        {
            title: 'Tên bộ phận',
            dataIndex: 'tenmagg',
            key: 'tenmagg',
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

    
    const handleDeleteClick = (id) => {
        setId(id)
    };
    const handleEditClick = (id) => {
        setId(id)
        setOpen(true)
    };

    let data = []
  
    hrdepartment?.map((Item, i) => {
        data.push({
            key: i + 1,
            magiamgia: Item.MaBP,
            tenmagg: Item.TenBP,
           
        })

    })
    return (
        <>
            <FormDrawerHRDepartment open={open} setOpen={setOpen} title={"Thêm bộ phận"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản trị</Breadcrumb.Item>
                <Breadcrumb.Item>Bộ phận</Breadcrumb.Item>

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

export default HRDepartment;