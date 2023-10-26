import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerDeliveryReceipt from '../component/form/FormDrawerDeliveryReceipt';
import useAsync from '../hook/useAsync';
import ServiceDeliveryReceipt from '../service/ServiceDeliveryReceipt';
import dayjs from 'dayjs';
import ModalDelete from '../component/modal/modalDelete';
import { Link, useParams } from 'react-router-dom';
import FormDrawerDeliveryReceiptDetail from '../component/form/FormDrawerDeliveryReceiptDetail';


const DeliveryReceiptDetail = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const [idMaMH, setIdMaMH] = useState();
    const { iddr } = useParams();

    const { data: DeliveryReceiptDetail } = useAsync(() => ServiceDeliveryReceipt.getDeliveryReceiptDetail(iddr))
    const columns = [
        {
            title: 'Mã phiếu nhập',
            dataIndex: 'maphieunhap',
            key: 'maphieunhap',
        },
        {
            title: 'Mặt hàng',
            dataIndex: 'mamh',
            key: 'mamh',
        },
        {
            title: 'Giá nhập',
            dataIndex: 'gianhap',
            key: 'gianhap',
        },
        {
            title: 'Giá bán',
            dataIndex: 'giaban',
            key: 'giaban',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soluong',
            key: 'soluong',
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
                    <Button type="dashed" onClick={() => handleEditClick(record.maphieunhap, record.mamh)}>Sửa</Button>
                    <Button type="primary" danger onClick={() => handleDeleteClick(record.maphieunhap, record.mamh)}>Xóa</Button>

                </Space >
            ),
        },
    ];

    const handleDeleteClick = (maphieunhap, mamh) => {
        setId(maphieunhap)
        setIdMaMH(mamh)
        setOpenModal(true)
    };
    const handleEditClick = (maphieunhap, mamh) => {
        setId(maphieunhap)
        setIdMaMH(mamh)
        setOpen(true)
    };

    let data = []
    if (DeliveryReceiptDetail.message) {

    } else {
        DeliveryReceiptDetail?.map((Item, i) => {
            data.push({
                key: i + 1,
                maphieunhap: Item.MaPhieuNhap,
                mamh: Item.MaMH,
                gianhap: Item.GiaNhap,
                giaban: Item.GiaBan,
                soluong: Item.SoLuong,
                thanhtien: Item.ThanhTien,
            })

        })
    }

    const submitModalDelete = async () => {
        const body = {
            "id": id,
            "reqMaMH": idMaMH
        }
        const res = await ServiceDeliveryReceipt.deleteDeliveryReceiptDetail(body)

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
            <FormDrawerDeliveryReceiptDetail open={open} setOpen={setOpen} title={" phiếu nhập"} id={id} setId={setId} iddr={iddr} idMaMH={idMaMH}/>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Chức năng</Breadcrumb.Item>
                <Breadcrumb.Item><Link to={"/phieunhap"}>Phiếu nhập</Link></Breadcrumb.Item>

                <Breadcrumb.Item>{iddr}</Breadcrumb.Item>

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

export default DeliveryReceiptDetail;