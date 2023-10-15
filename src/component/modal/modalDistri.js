

import {
    ModalForm,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Card, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import useAsync from '../../hook/useAsync';
import ServiceDistributed from '../../service/ServiceDistributed';

const ModalDistri = () => {
    const [form] = Form.useForm();
    const [bang, setBang] = useState()
    const [cot, setCot] = useState()
    const [dieukien, setDieukien] = useState("")
    const [bangvitu1, setBangvitu1] = useState()
    const [cotvitu1, setCotvitu1] = useState()
    const [dieukienvitu1, setDieukienvitu1] = useState("")
    const [columnOption, setColumnOption] = useState([])

    const { data: resTable } = useAsync(() => ServiceDistributed.ShowTable())

    let tableOption = []

    resTable?.table?.map((item, index) => {
        tableOption.push({
            value: item,
            label: item,
        })
    })

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
        }

    }, [bang])

    const waitTime = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };

    return (
        <ModalForm

            title="Phân tán dữ liệu"
            trigger={
                < Button type="dashed" >
                    Phân tán dữ liệu
                </Button >
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values.bang);
                console.log(values.cot);
                console.log(values.dieukien);
                console.log(values.bangvitu1);
                console.log(values.cotvitu1);
                console.log(values.dieukienvitu1);
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
                const res = ServiceDistributed.PhanTanNgang(values.dieukienvitu1 ? body : bodyNull)
                message.success('Phân tán dữ liệu thành công');
                setColumnOption([])
                return true;

            }}
            submitter={{
                searchConfig: {
                    submitText: 'Xác nhận',
                    resetText: 'Hủy bỏ',
                },
            }}
        >
            <ProForm.Group>

                <ProFormSelect
                    options={tableOption}
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
                    onChange={(value) => setDieukienvitu1(value)}
                    name="dieukienvitu1"
                    label="Điều kiện vị từ"
                    placeholder="Nhập điều kiện vị từ"
                />
            </ProForm.Group>
            <Card title="Truy vấn" bordered={false} style={{ width: "100%" }}>
                Select  <strong>{`${bang ? bang : ""}`}</strong> from <strong>{`${bang ? bang : ""}`}</strong> {" where "}
                <strong>{`${cot ? cot : ""}`}</strong> = <strong>{`'${dieukien ? dieukien : ""}'`}</strong>
            </Card>

        </ModalForm >
    );
}

export default ModalDistri;