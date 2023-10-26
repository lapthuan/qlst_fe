import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerShelves from '../component/form/FormDrawerShelves';
import useAsync from '../hook/useAsync';
import ServiceShelves from '../service/ServiceShelves';
import ModalDelete from '../component/modal/modalDelete';

const Shelves = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const { data: shelves } = useAsync(() => ServiceShelves.getAllShelves())
    const columns = [
        {
            title: 'Mã kệ',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Tên kệ',
            dataIndex: 'tenke',
            key: 'tenke',
        },
        {
            title: 'Mặt hàng',
            dataIndex: 'mathang',
            key: 'mathang',
        },
        {
            title: 'Vị trí',
            dataIndex: 'vitri',
            key: 'ngayapdung',
        },
        {
            title: 'Công cụ',
            dataIndex: 'make',
            key: 'congcu',
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

    shelves?.map((Item, i) => {
        data.push({
            key: i + 1,
            make: Item.MaKe,
            mathang: Item.TenMH,
            tenke: Item.TenKe,
            vitri: Item.Vitri,


        })

    })
    const submitModalDelete = async () => {
        const res = await ServiceShelves.deleteShelves(id)

        if (res.message == "Lỗi khi xóa kệ ở SQL Server") {
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
            <FormDrawerShelves open={open} setOpen={setOpen} title={" kệ"} id={id} setId={setId} />
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