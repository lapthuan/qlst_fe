import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerAccount from '../component/form/FormDrawerAccount';
import useAsync from '../hook/useAsync';
import ServiceAccount from '../service/ServiceAccount';
import ModalDelete from '../component/modal/modalDelete';


const Account = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: account } = useAsync(() => ServiceAccount.getAllAccount())
    const [openModal, setOpenModal] = useState(false);

    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'tentk',
            key: 'tentk',
        },
        {
            title: 'Tên NV',
            dataIndex: 'tennv',
            key: 'tennv',
        },
        {
            title: 'Quyền',
            dataIndex: 'quyen',
            key: 'quyen',
        },
        {
            title: 'Công cụ',
            dataIndex: 'tentk',
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
    account?.map((Item, i) => {

        data.push(
            {
                key: i + 1,
                tentk: Item.TenTK,
                tennv: Item.TenNV,
                quyen: Item.Quyen == 1 ? "Admin" : "Nhân viên",
            }
        );
    }
    )
    const submitModalDelete = async () => {
        const res = await ServiceAccount.deleteAccount(id)

        if (res.message) {
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
            <FormDrawerAccount open={open} setOpen={setOpen} title={" tài khoản"} id={id} setId={setId} />
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