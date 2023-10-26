import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerHRDepartment from '../component/form/FormDrawerHRDepartment';
import ServiceHRDepartment from '../service/ServiceHRDepartment';
import useAsync from '../hook/useAsync';
import ModalDelete from '../component/modal/modalDelete';

const HRDepartment = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const { data: hrdepartment } = useAsync(() => ServiceHRDepartment.getAllHRDepartment())
    const columns = [
        {
            title: 'Mã bộ phận',
            dataIndex: 'mabophan',
            key: 'mabophan',
        },
        {
            title: 'Tên bộ phận',
            dataIndex: 'tenbp',
            key: 'tenbp',
        },
        {
            title: 'Công cụ',
            key: 'congcu',
            dataIndex: 'mabophan',
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

    hrdepartment?.map((Item, i) => {
        data.push({
            key: i + 1,
            mabophan: Item.MaBP,
            tenbp: Item.TenBP,

        })
    })
    const submitModalDelete = async () => {
        const res = await ServiceHRDepartment.deleteHRDepartment(id)

        if (res.message == "Lỗi khi xóa bộ phận ở SQL Server") {
            message.warning("Dữ liệu này là khóa chính cần xóa các bảng phụ thuộc trước !")
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
            <FormDrawerHRDepartment open={open} setOpen={setOpen} title={" bộ phận"} id={id} setId={setId} />
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