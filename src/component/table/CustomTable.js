
import { Empty, Table } from "antd";




const CustomTable = ({ columns, data }) => {
    return (<Table locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Danh sách rỗng" /> }} columns={columns} dataSource={data} />);
}

export default CustomTable;