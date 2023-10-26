import { Breadcrumb, Button, Divider, message, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerEmployee from '../component/form/FormDrawerEmployee';
import ServiceEmployee from '../service/ServiceEmployee';
import useAsync from '../hook/useAsync';
import dayjs from 'dayjs';
import ModalDelete from '../component/modal/modalDelete';



const Employee = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: employee } = useAsync(() => ServiceEmployee.getAllEmployee())
    const [openModal, setOpenModal] = useState(false);

    const columns = [
        {
            title: 'Mã NV',
            dataIndex: 'manv',
            key: 'manv',
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'machinhanh',
            key: 'machinhanh',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'chucvu',
            key: 'chucvu',
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
            dataIndex: 'manv',
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
    if (employee.message) {

    } else {
        employee?.map((Item, i) => {
            const ngaysinhFormatted = dayjs(Item.NgaySinh).format('DD/MM/YYYY');
            data.push(
                {
                    key: i + 1,
                    manv: Item.MaNV,
                    machinhanh: Item.TenCN,
                    chucvu: Item.TenCV,
                    hoten: Item.TenNV,
                    ngaysinh: ngaysinhFormatted,
                    gioitinh: Item.GioiTinh,
                    diachi: Item.DiaChi,
                    sdt: Item.Sdt,
                }
            );
        }
        )
    }
    const submitModalDelete = async () => {
        const res = await ServiceEmployee.deleteEmployee(id)

        if (res.message == "Lỗi khi xóa nhân viên ở SQL Server") {
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
            <FormDrawerEmployee open={open} setOpen={setOpen} title={" nhân viên"} id={id} setId={setId} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản trị</Breadcrumb.Item>
                <Breadcrumb.Item>Nhân viên</Breadcrumb.Item>

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

export default Employee;