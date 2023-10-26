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
import { Link, useParams } from 'react-router-dom';
import FormDrawerOrderDetail from '../component/form/FormDrawerOrderDetail';


const OrderDetail = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const [idMaMH, setIdMaMH] = useState();
    const { idhd } = useParams();

    const { data: order } = useAsync(() => ServiceOrder.getAOrderDetail(idhd))
    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'mahd',
            key: 'mahd',
        },
        {
            title: 'Mặt hàng',
            dataIndex: 'mamh',
            key: 'mamh',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soluong',
            key: 'soluong',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'dongia',
            key: 'dongia',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'thanhtien',
            key: 'thanhtien',
        },

        {
            title: 'Công cụ',
            key: 'congcu',

            render: (record) => (
                <Space size="middle">
                    <Button type="dashed" onClick={() => handleEditClick(record.mahd)}>Sửa</Button>
                    <Button type="primary" danger onClick={() => handleDeleteClick(record.mahd, record.mamh)}>Xóa</Button>

                </Space >
            ),
        },
    ];

    const handleDeleteClick = (mahd, mamh) => {
        setId(mahd)
        setIdMaMH(mamh)
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

            data.push({
                key: i + 1,
                mahd: Item.MaHD,
                mamh: Item.MaMH,
                soluong: Item.SoLuong,
                dongia: Item.DonGia,
                thanhtien: Item.ThanhTien,

            })

        })
    }
    const submitModalDelete = async () => {
        const body = {
            "id": id,
            "reqMaMH": idMaMH
        }

        const res = await ServiceOrder.deleteOrderDetail(body)

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

            <FormDrawerOrderDetail open={open} setOpen={setOpen} title={" hóa đơn"} id={id} setId={setId} idhd={idhd} />

            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >

                <Breadcrumb.Item><Link to={"/hoadon"}>Hóa đơn</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{idhd}</Breadcrumb.Item>
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

export default OrderDetail;