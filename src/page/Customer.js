import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerCustomer from '../component/form/FormDrawerCustomer';
import ServiceCustomer from '../service/ServiceCustomer';
import useAsync from '../hook/useAsync';
import dayjs from 'dayjs';
import ModalDelete from '../component/modal/modalDelete';

const Customer = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const [openModal, setOpenModal] = useState(false);
    const { data: customer } = useAsync(() => ServiceCustomer.getAllCustomer())
    const columns = [
        {
            title: 'Mã KH',
            dataIndex: 'makh',
            key: 'makh',
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'machinhanh',
            key: 'machinhanh',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoten',
            key: 'hoten',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaysinh',
            key: 'ngaysinh',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioitinh',
            key: 'gioitinh',
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
            dataIndex: 'makh',
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
    customer?.map((Item, i) => {

        const ngaysinh = dayjs(Item.NgaySinh).format('DD/MM/YYYY');

        data.push(
            {
                key: i + 1,
                makh: Item.MaKH,
                machinhanh: Item.TenCN,
                hoten: Item.TenKH,
                ngaysinh: ngaysinh,
                gioitinh: Item.GioiTinh,
                diachi: Item.Diachi,
                sdt: Item.Sdt,

            }
        );
    }
    )
    const submitModalDelete = async () => {
        const res = await ServiceCustomer.deleteCustomer(id)

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
            <FormDrawerCustomer open={open} setOpen={setOpen} title={" khách hàng"} id={id} setId={setId} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản trị</Breadcrumb.Item>
                <Breadcrumb.Item>Khách hàng</Breadcrumb.Item>

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

export default Customer;