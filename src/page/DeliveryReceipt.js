import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerDeliveryReceipt from '../component/form/FormDrawerDeliveryReceipt';
import useAsync from '../hook/useAsync';
import ServiceDeliveryReceipt from '../service/ServiceDeliveryReceipt';
import dayjs from 'dayjs';
import ModalDelete from '../component/modal/modalDelete';
import { Link, useNavigate } from 'react-router-dom';


const DeliveryReceipt = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const { data: deliveryReceipt } = useAsync(() => ServiceDeliveryReceipt.getAllDeliveryReceipt())
    const navigate = useNavigate();


    useEffect(() => {
        const isLoggedIn = localStorage.getItem('user');
        console.log('isLoggedIn', isLoggedIn)
        if (!isLoggedIn) {
            navigate("/dangnhap")
        }
    }, [])
    const columns = [
        {
            title: 'Mã phiếu nhập',
            dataIndex: 'maphieunhap',
            key: 'maphieunhap',
        },
        {
            title: 'Nhân viên',
            dataIndex: 'nhanvien',
            key: 'nhanvien',
        },
        {
            title: 'Kho',
            dataIndex: 'kho',
            key: 'kho',
        },
        {
            title: 'ĐVT',
            dataIndex: 'dvt',
            key: 'dvt',
        },
        {
            title: 'Ngày lập phiếu',
            dataIndex: 'ngaylapphieu',
            key: 'ngaylapphieu',
        },
        {
            title: 'Chi tiết',
            dataIndex: 'maphieunhap',
            render: (id) => (
                <Space size="middle">
                    <Link to={`/phieunhap/${id}`}>
                        <Button type="primary">Xem</Button>

                    </Link>
                </Space >
            ),
        },
        {
            title: 'Công cụ',
            dataIndex: 'maphieunhap',
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
    if (deliveryReceipt.message) {

    } else {
        deliveryReceipt?.map((Item, i) => {
            const ngaylapphieu = dayjs(Item.NgayLapPhieu).format('DD/MM/YYYY HH:mm');
            data.push({
                key: i + 1,
                maphieunhap: Item.MaPhieuNhap,
                nhanvien: Item.TenNV,
                kho: Item.TenKho,
                dvt: Item.DVT,
                ngaylapphieu: ngaylapphieu,
            })

        })
    }
    const submitModalDelete = async () => {
        const res = await ServiceDeliveryReceipt.deleteDeliveryReceipt(id)

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
            <FormDrawerDeliveryReceipt open={open} setOpen={setOpen} title={" phiếu nhập"} id={id} setId={setId} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Chức năng</Breadcrumb.Item>
                <Breadcrumb.Item>Phiếu nhập</Breadcrumb.Item>

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

export default DeliveryReceipt;