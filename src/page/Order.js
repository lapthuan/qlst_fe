import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import ServiceOrder from '../service/ServiceOrder';
import useAsync from '../hook/useAsync';
import FormDrawerOrder from '../component/form/FormDrawerOrder';
import dayjs from 'dayjs';
import ModalDelete from '../component/modal/modalDelete';
import { Link } from 'react-router-dom';


const Order = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const { data: order } = useAsync(() => ServiceOrder.getAllOrder())
    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'mahd',
            key: 'mahd',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'tennhanvien',
            key: 'tennhanvien',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenkhachhang',
            key: 'tenkhachhang',
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'hinhthucthanhtoan',
            key: 'hinhthucthanhtoan',
        },
        {
            title: 'Ngày lập',
            dataIndex: 'ngaylap',
            key: 'ngaylap',
        },
        {
            title: 'Sản phẩm',
            key: 'sanpham',
            dataIndex: 'mahd',
            render: (idhd) => (
                <Link to={`/hoadon/${idhd}`}><Button type="primary" >Xem</Button></Link>
            ),
        },
        {
            title: 'Công cụ',
            key: 'congcu',
            dataIndex: 'mahd',
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
    if (order.message) {

    } else {
        order?.map((Item, i) => {
            const ngaylap = dayjs(Item.NgayLap).format('DD/MM/YYYY HH:mm')
            data.push({
                key: i + 1,
                mahd: Item.MaHD,
                tennhanvien: Item.TenNV,
                tenkhachhang: Item.TenKH,
                hinhthucthanhtoan: Item.HinhThucTT,
                ngaylap: ngaylap
            })

        })
    }
    const submitModalDelete = async () => {
        const res = await ServiceOrder.deleteOrder(id)
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

            <FormDrawerOrder open={open} setOpen={setOpen} title={" hóa đơn"} id={id} setId={setId} />

            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >

                <Breadcrumb.Item>Hóa đơn</Breadcrumb.Item>

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

export default Order;