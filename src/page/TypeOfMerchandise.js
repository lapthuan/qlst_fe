
import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerTypeOfMerchandise from '../component/form/FromDrawerTypeOfMerchandise';
import useAsync from '../hook/useAsync';
import ServiceTypeOfMerchandise from '../service/ServiceTypeOfMerchandise';
import ModalDelete from '../component/modal/modalDelete';



const TypeOfMerchandise = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: typeOfMerchandise } = useAsync(() => ServiceTypeOfMerchandise.getAllTypeOfMerchandise())
    const [openModal, setOpenModal] = useState(false);
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
            dataIndex: 'malh',
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

    typeOfMerchandise?.map((Item, i) => {
        data.push({
            key: i + 1,
            malh: Item.MaLH,
            tenlh: Item.TenLH,
        })
    })

    const submitModalDelete = async () => {
        const res = await ServiceTypeOfMerchandise.deleteTypeOfMerchandise(id)
        if (res.message == "Lỗi khi xóa loại hàng ở SQL Server") {
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
            <FormDrawerTypeOfMerchandise open={open} setOpen={setOpen} title={" loại hàng"} id={id} setId={setId} />
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