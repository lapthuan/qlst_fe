import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerCoupon from '../component/form/FormDrawerCoupon';
import useAsync from '../hook/useAsync';
import ServiceCoupon from '../service/ServiceCoupon';
import dayjs from 'dayjs';
import ModalDelete from '../component/modal/modalDelete';


const Coupon = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: coupon } = useAsync(() => ServiceCoupon.getAllCoupon())
    const [openModal, setOpenModal] = useState(false);

    const columns = [
        {
            title: 'Mã giảm giá',
            dataIndex: 'magiamgia',
            key: 'magiamgia',
        },
        {
            title: 'Tên mã giảm giá',
            dataIndex: 'tenmagg',
            key: 'tenmagg',
        },
        {
            title: 'Giá trị giảm',
            dataIndex: 'giatrigiam',
            key: 'giatrigiam',
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'ngayapdung',
            key: 'ngayapdung',
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'ngayhethan',
            key: 'ngayhethan',
        },
        {
            title: 'Công cụ',
            key: 'congcu',
            dataIndex: 'magiamgia',
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
    coupon?.map((Item, i) => {
        const ngayApDungFormatted = dayjs(Item.NgayApDung).format('DD/MM/YYYY HH:mm');
        const ngayHetHanFormatted = dayjs(Item.NgayHetHan).format('DD/MM/YYYY HH:mm');

        data.push(
            {
                key: i + 1,
                magiamgia: Item.MaGiamGia,
                tenmagg: Item.TenMaGG,
                giatrigiam: Item.GiaTriGiam,
                ngayapdung: ngayApDungFormatted,
                ngayhethan: ngayHetHanFormatted,
            }
        );
    }
    )
    const submitModalDelete = async () => {
        const res = await ServiceCoupon.deleteCoupon(id)
        if (res.message == "Lỗi khi xóa phiếu giảm giá ở SQL Server") {
            message.success("Dữ liệu này là khóa chính cần xóa các bảng phụ thuộc trước !")
            setOpenModal(false)
        } else if (res.message == "Đồng bộ xóa phiếu giảm giá thành công") {
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
            <FormDrawerCoupon open={open} setOpen={setOpen} title={" phiếu giảm giá"} id={id} setId={setId} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                <Breadcrumb.Item>Phiếu giảm giá</Breadcrumb.Item>
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

export default Coupon;