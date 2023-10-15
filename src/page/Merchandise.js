

import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import FormDrawerMerchandise from '../component/form/FormDrawerMerchandise';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import ServicesMerchandise from '../service/ServiceMerchandise';
import useAsync from '../hook/useAsync';


const Merchandise = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: Merchandise } = useAsync(() => ServicesMerchandise.getAllMerchandise())

    const columns = [
        {
            title: 'Mã MH',
            dataIndex: 'mamh',
            key: 'mamh',
        },
        {
            title: 'Loại hàng',
            dataIndex: 'malh',
            key: 'mamh',
        },
        {
            title: 'Năm SX',
            dataIndex: 'mansx',
            key: 'mansx',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'magiamgia',
            key: 'magiamgia',
        }, {
            title: 'Tên mặt hàng',
            dataIndex: 'tenmh',
            key: 'tenmh',
        }, {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Mô tả',
            dataIndex: 'mota',
            key: 'mota',
        },
        {
            title: 'ĐVT',
            dataIndex: 'dvt',
            key: 'dvt',
        },
        {
            title: 'Công cụ',
            key: 'congcu',
            dataIndex: 'mamh',
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
    };
    const handleEditClick = (id) => {
        setId(id)
        setOpen(true)
    };

    let data = []
    Merchandise?.map((dt, i) => {
        data.push(
            {
                key: i + 1,
                mamh: dt.MaMH,
                malh: dt.TenLH,
                mansx: dt.TenNsx,
                magiamgia: dt.MaGiamGia,
                tenmh: dt.TenMH,
                gia: dt.GiamGia,
                mota: dt.MoTa,
                dvt: dt.DVT,
            }
        )
    }
    )

    return (
        <>
            <FormDrawerMerchandise open={open} setOpen={setOpen} title={"Thêm mặt hàng"} id={id} />
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
                <Breadcrumb.Item>Mặt hàng</Breadcrumb.Item>

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

export default Merchandise;
