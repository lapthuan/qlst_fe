
import { Button, Space, Table, Tag } from "antd";




const CustomTable = ({columns,data}) => {
    return (<Table columns={columns} dataSource={data} />);
}

export default CustomTable;