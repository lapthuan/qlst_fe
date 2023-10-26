import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerWarehouse from '../component/form/FormDrawerWarehouse';
import ServiceWarehouse from '../service/ServiceWarehouse';
import useAsync from '../hook/useAsync';
import ModalDelete from '../component/modal/modalDelete';

const Warehouse = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const { data: warehouse } = useAsync(() => ServiceWarehouse.getAllWarehouse())
    const columns = [
        {
            title: 'Mã kho',
            dataIndex: 'makho',
            key: 'makho',
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'chinhanh',
            key: 'chinhanh',
        },
        {
            title: 'Tên kho',
            dataIndex: 'tenkho',
            key: 'tenkho',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diachi',
            key: 'diachi',
        },
        {
            title: 'Công cụ',
            key: 'congcu',
            dataIndex: 'makho',

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
    if (warehouse.message) {

    } else {
        warehouse?.map((Item, i) => {
            data.push({
                key: i + 1,
                makho: Item.MaKho,
                chinhanh: Item.TenCN,
                tenkho: Item.TenKho,
                diachi: Item.DiaChi,
            })
        })
    }
    const submitModalDelete = async () => {
        const res = await ServiceWarehouse.deleteWarehouse(id)

        if (res.message == "Lỗi khi xóa kho ở SQL Server") {
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
            <FormDrawerWarehouse open={open} setOpen={setOpen} title={" kho"} id={id} setId={setId} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Chức năng</Breadcrumb.Item>
                <Breadcrumb.Item>Kho</Breadcrumb.Item>

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

export default Warehouse;