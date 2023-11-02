

import {
    ModalForm,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Card, Empty, Form, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { AiFillLock } from 'react-icons/ai';
import ServiceDistributed from '../../service/ServiceDistributed';

const ModalDistri = () => {
    const [form] = Form.useForm();
    const [bang, setBang] = useState()
    const [cot, setCot] = useState()
    const [dieukien, setDieukien] = useState("")
    const [columnOptionTable, setColumnOptionTable] = useState([])
    const [columnOption, setColumnOption] = useState([])
    const [columnOptionDatabase, setColumnOptionDatabase] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const [tanNgang, setTanNgang] = useState(false);
    const [host, setHost] = useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [database, setDataBase] = useState()


    useEffect(() => {
        if (bang) {
            (async () => {
                let columnsTemps = []
                const resColumn = await ServiceDistributed.ShowColumn(bang)

                resColumn?.columns?.map((item, index) => {
                    columnsTemps.push({
                        value: item,
                        label: item,
                    })
                })
                setColumnOption(columnsTemps)
            })()
        } else {
            setColumnOption([])
        }
    }, [bang])
    const loginMysql = async () => {

        const body = {
            "host": host ? host : "",
            "username": userName ? userName : "",
            "password": password ? password : ""
        }
        const res = await ServiceDistributed.LoginMysql(body)

        if (res.databases) {
            let columnsTemps = []
            res?.databases?.map((item, index) => {
                columnsTemps.push({
                    value: item,
                    label: item,
                })
            })
            setColumnOptionDatabase(columnsTemps)
            message.success("Đăng nhập thành công")

        } else {
            setColumnOptionDatabase([])
            message.warning("Đăng nhập thất bại, kiểm tra lại tài khoản và mật khẩu!")
        }
    }
    const waitTime = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };
    const backFormLogin = () => {
        if (isLogin === true) {
            setIsLogin(false)
            setTanNgang(false)
        }
    }
    const handlerChangePhanTan = () => {
        setTanNgang(true);
    };
    return (
        <ModalForm
            width={isLogin === false && 500}
            title="Phân tán dữ liệu" y
            trigger={
                < Button type="dashed" >
                    Phân tán dữ liệu
                </Button >
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: backFormLogin,
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                await waitTime(2000);
                if (isLogin === false) {
                    let columnsTemps = []

                    const res = await ServiceDistributed.ShowTable(database)
                    if (res.table) {
                        res?.table?.map((item, index) => {
                            columnsTemps.push({
                                value: item,
                                label: item,
                            })
                        })
                        setColumnOptionTable(columnsTemps)
                        message.success("Truy cập thành công")
                        setIsLogin(true)
                    } else {
                        message.warning("Database này không được hỗ trợ phân tán!")
                    }


                } else {
                    const body = {
                        "bang": values.bang,
                        "cot": values.cot,
                        "dieukien": values.dieukien,
                        "bangvitu1": "nhanvien",
                        "cotvitu1": "MaCV",
                        "dieukienvitu1": values.dieukienvitu1
                    }
                    const bodyNull = {
                        "bang": values.bang,
                        "cot": values.cot,
                        "dieukien": values.dieukien,
                    }
                    const res = await ServiceDistributed.PhanTanNgang(values.dieukienvitu1 ? body : bodyNull)
                    message.success('Phân tán dữ liệu thành công');
                    setColumnOption([])
                    return true;
                }


            }}
            submitter={{
                searchConfig: {
                    submitText: isLogin === false ? "Kết nối" : 'Xác nhận',
                    resetText: isLogin === false ? "Hủy" : 'Đóng kết nối',
                },
            }}
        >
            {isLogin === false && (
                <ProForm.Group>
                    <ProFormText
                        width="lg"
                        name="host"
                        onChange={(e) => setHost(e.target.value)}
                        label="Host"
                        value="localhost"
                        placeholder="Nhập host"
                    />
                    <ProFormText
                        width="lg"
                        name="username"
                        onChange={(e) => setUserName(e.target.value)}
                        label="User name"
                        placeholder="Nhập User name"
                    />
                    <ProFormText.Password
                        label="Password"
                        width="lg"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập Password"
                        fieldProps={{
                            size: 'large',
                            prefix: <AiFillLock className={'prefixIcon'} />,
                        }}
                    />

                    <Button type='primary' onClick={loginMysql}>Đăng nhập</Button>


                    <ProFormSelect
                        width="lg"
                        onChange={(value) => setDataBase(value)}
                        name="database"
                        label="Database"
                        placeholder="Chọn database"
                        options={columnOptionDatabase}
                    />
                </ProForm.Group>
            )}


            {isLogin === true && tanNgang === false &&
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type='primary' onClick={handlerChangePhanTan} style={{ width: "150px", margin: "10px" }}>Phân Tán Ngang</Button>
                    <Button type='primary' style={{ width: "150px", margin: "10px" }}>Phân Tán Dọc</Button>

                </div>
            }
            {isLogin === true && tanNgang === true &&
                (
                    <>
                        <ProForm.Group>
                            <ProFormSelect
                                options={columnOptionTable}
                                onChange={(value) => setBang(value)}
                                width="sm"
                                name="bang"
                                label="Tên bảng"
                                placeholder="Chọn bảng"
                            />
                            <ProFormSelect
                                value={cot}
                                options={columnOption}
                                onChange={(value) => setCot(value)}
                                width="sm"
                                name="cot"
                                label="Cột"
                                placeholder="Chọn cột"

                                locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Danh sách rỗng" /> }}
                            />
                            <ProFormText
                                width="sm"
                                onChange={(e) => setDieukien(e.target.value)}
                                name="dieukien"
                                label="Điều kiện"
                                placeholder="Nhập điều kiện"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                width="sm"
                                value="NhanVien"
                                name="bangvitu1"
                                label="Bảng vị từ"
                                disabled
                            />
                            <ProFormText
                                width="sm"
                                value="MaCV"
                                name="cotvitu1"
                                label="Cột vị từ"
                                disabled
                            />
                            <ProFormText
                                width="sm"
                                name="dieukienvitu1"
                                label="Điều kiện vị từ"
                                placeholder="Nhập điều kiện vị từ"
                            />
                        </ProForm.Group>

                        <Card title="Truy vấn" bordered={false} style={{ width: "100%" }}>
                            Select  <strong>{`${bang ? bang : ""}`}</strong> from <strong>{`${bang ? bang : ""}`}</strong> {" where "}
                            <strong>{`${cot ? cot : ""}`}</strong> = <strong>{`'${dieukien ? dieukien : ""}'`}</strong>
                        </Card>
                    </>
                )
            }


        </ModalForm >
    );
}

export default ModalDistri;