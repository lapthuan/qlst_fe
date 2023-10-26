import { Breadcrumb, Button, Divider, Space } from 'antd';
import { useState } from 'react';
import CustomTable from '../component/table/CustomTable';
import { AiOutlinePlus } from 'react-icons/ai';
import FormDrawerManufacturer from '../component/form/FormDrawerManufacturer';
import ServiceBranch from '../service/ServiceBranch';
import useAsync from '../hook/useAsync';



const Branch = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const { data: branch } = useAsync(() => ServiceBranch.getAllBranch())
    const columns = [
        {
            title: 'Mã chi nhánh',
            dataIndex: 'machinhanh',
            key: 'machinhanh',
        },
        {
            title: 'Tên chi nhánh',
            dataIndex: 'tenchinhanh',
            key: 'tenchinhanh',
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


    ];

    const handleDeleteClick = (id) => {
        setId(id)
    };
    const handleEditClick = (id) => {
        setId(id)
        setOpen(true)
    };

    let data = []
    if (branch.message) {

    } else {
        branch?.map((Item, i) => {
            data.push({
                key: i + 1,
                machinhanh: Item.MaCN,
                tenchinhanh: Item.TenCN,
                diachi: Item.DiaChi,
                sdt: Item.Sdt,
            })

        })
    }
    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Chi nhánh</Breadcrumb.Item>
            </Breadcrumb>
            <div className='page-container'>


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

export default Branch;