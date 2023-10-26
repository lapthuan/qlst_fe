import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerDesignation from '../component/form/FormDrawerDesignation';
import useAsync from '../hook/useAsync';
import ServiceDesignation from '../service/ServiceDesignation';
import ModalDelete from '../component/modal/modalDelete';


const Designation = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const { data: designation } = useAsync(() => ServiceDesignation.getAllDesignation())
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
            dataIndex: 'machucvu',
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
    if (designation.message) {

    } else {
        designation?.map((Item, i) => {

            data.push(
                {
                    key: i + 1,
                    machucvu: Item.MaCV,
                    bophan: Item.TenBP,
                    tencongviec: Item.TenCV,
                }
            );
        }
        )
    }
    const submitModalDelete = async () => {
        const res = await ServiceDesignation.deleteDesignation(id)

        if (res.message == "Lỗi khi xóa chức vụ ở SQL Server") {
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
            <FormDrawerDesignation open={open} setOpen={setOpen} title={" chức vụ"} id={id} setId={setId} />
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