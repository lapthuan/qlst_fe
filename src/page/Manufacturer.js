import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import useAsync from '../hook/useAsync';
import ServiceManufacturer from '../service/ServiceManufacturer';


const Manufacturer = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: Manufacturer } = useAsync(() => ServiceManufacturer.getAllManufacturer())
  
    const columns = [
        {
            title: 'Mã NSX',
            dataIndex: 'mansx',
            key: 'mansx',
        },
        {
            title: 'Tên NSX',
            dataIndex: 'tennsx',
            key: 'tennsx',
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
    console.log(Manufacturer);
    Manufacturer?.map((Item, i) => {
        data.push({
            key: i + 1,
            mansx: Item.MaNsx,
            tennsx: Item.TenNsx,
            diachi: Item.Diachi,
            sdt: Item.Sdt,
        })

    })


    return (
        <>
            <FormDrawerManufacturer open={open} setOpen={setOpen} title={"Thêm nhà sản xuất"} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                <Breadcrumb.Item>Nhà sản xuất</Breadcrumb.Item>

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

export default Manufacturer;