import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import useAsync from '../hook/useAsync';
import ServiceManufacturer from '../service/ServiceManufacturer';
import ModalDelete from '../component/modal/modalDelete';


const Manufacturer = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: Manufacturer } = useAsync(() => ServiceManufacturer.getAllManufacturer())
    const [openModal, setOpenModal] = useState(false);
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
            dataIndex: 'mansx',
            render: (id) => (
                <Space size="middle">
                    <Button type="dashed" onClick={() => handleEditClick(id)}>Sửa</Button>
                    <Button type="primary" danger onClick={() => handleDeleteClick(id)}>Xóa</Button>

                </Space >
            ),
        },
    ];

    const handleDeleteClick = (id) => {
        setId(id)
        setOpenModal(true)
    };
    const handleEditClick = (id) => {
        setId(id)
        setOpen(true)
    };

    let data = []
    if (Manufacturer.message) {

    } else {
        Manufacturer?.map((Item, i) => {
            data.push({
                key: i + 1,
                mansx: Item.MaNsx,
                tennsx: Item.TenNsx,
                diachi: Item.Diachi,
                sdt: Item.Sdt,
            })

        })
    }
    const submitModalDelete = async () => {
        const res = await ServiceManufacturer.deleteManufacturer(id)

        if (res.message == "Lỗi khi xóa nhà sản xuất ở SQL Server") {
            message.success("Dữ liệu này là khóa chính cần xóa các bảng phụ thuộc trước !")
            setOpenModal(false)
        } else if (res.message) {
            message.success("Xóa dữ liệu thành công")
            setOpenModal(false)
            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
        }

    }

    return (
        <>
            <ModalDelete openModal={openModal} setOpenModal={setOpenModal} submitModal={submitModalDelete} />
            <FormDrawerManufacturer open={open} setOpen={setOpen} title={" nhà sản xuất"} id={id} setId={setId} />
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