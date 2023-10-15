import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import FormDrawerEmployee from '../component/form/FormDrawerEmployee';
import ServiceEmployee from '../service/ServiceEmployee';
import useAsync from '../hook/useAsync';
import moment from 'moment';


const Employee = () => {
    const [open, setOpen] = useState(false);
     const [id, setId] = useState();
    const { data: employee } = useAsync(() => ServiceEmployee.getAllEmployee())
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
            key: 'congcu',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="dashed" >Sửa</Button>
                    <Button type="primary" danger>Xóa</Button>
                </Space >
            ),
        },
    ];

     const handleDeleteClick = (id) => {
        setId(id)
    };
    const handleEditClick = (id) => {
        setId(id)
        setOpen(true)
    };

    let data = []
    employee?.map((Item, i) => {
        
        const ngaysinhFormatted = moment(Item.NgaySinh).format('DD/MM/YYYY HH:mm');
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

    return (
        <>
            <FormDrawerEmployee open={open} setOpen={setOpen} title={"Thêm nhân viên"} />
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