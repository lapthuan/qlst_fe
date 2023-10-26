import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineHome, AiOutlineUnorderedList } from "react-icons/ai";
import { RiAdminLine, RiFunctionLine, RiBillLine, RiPresentationFill } from "react-icons/ri";
import logo from "../../image/logo2.png"
import { Layout, Menu, Button, Switch, Image, Modal } from 'antd';
import ModalDistri from "../modal/modalDistri";
const { SubMenu } = Menu
const { Header, Sider, Content, Footer } = Layout;
function getItem(label, key, icon, children, path) {
    return {
        key,
        icon,
        children,
        label,
        path
    };
}

const items = [
    getItem("Trang chủ", "1", <AiOutlineHome />, null, "/"),
    getItem("Danh mục", "sub1", <AiOutlineUnorderedList />, [
        getItem("Hàng hóa", "3", null, null, "/mathang"),
        getItem("Loại hàng", "4", null, null, "/loaihang"),
        getItem("Nhà sản xuất", "5", null, null, "/nhasanxuat"),
        getItem("Phiếu giảm giá", "6", null, null, "/phieugiamgia")
    ]),
    getItem("Quản trị", "sub2", <RiAdminLine />, [
        getItem("Nhân viên", "12", null, null, "/nhanvien"),
        getItem("Tài khoản", "13", null, null, "/taikhoan"),
        getItem("Khách hàng", "14", null, null, "/khachhang"),
        getItem("Chức vụ", "15", null, null, "/chucvu"),
        getItem("Bộ phận", "16", null, null, "/bophan"),
    ]),
    getItem("Chức năng", "sub3", <RiFunctionLine />, [
        getItem("Kho", "17", null, null, "/kho"),
        getItem("Kệ", "18", null, null, "/ke"),
        getItem("Phiếu nhập", "19", null, null, "/phieunhap"),
    ]),
    getItem("Hóa đơn", "2", <RiBillLine />, null, "/hoadon"),
    getItem("Chi nhánh", "20", <RiPresentationFill />, null, "/chinhanh"),

];

const App = () => {
    const [theme, setTheme] = useState('light');
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('1');

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <Layout theme={theme}>

            <Sider
                collapsible
                theme={theme}
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Image src={logo} />

                <br />
                <br />
                <Menu
                    theme={theme}
                    onClick={onClick}
                    defaultSelectedKeys={["1"]}
                    selectedKeys={[current]}
                    mode="inline"
                >
                    {items.map(item => {
                        if (item.children) {
                            return (
                                <SubMenu key={item.key} icon={item.icon} title={item.label}>
                                    {item.children.map(childItem => (
                                        <Menu.Item key={childItem.key}>
                                            <Link to={childItem.path}>{childItem.label}</Link>
                                        </Menu.Item>
                                    ))}
                                </SubMenu>
                            );
                        }

                        return (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.path}>{item.label}</Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: theme === "light" ? "#fff" : "#001529",
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlineMenuUnfold color={theme !== "light" ? "#fff" : "#001529"} /> : <AiOutlineMenuFold color={theme !== "light" ? "#fff" : "#001529"} />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <ModalDistri />

                    <Switch
                        style={{ marginLeft: "10px" }}
                        checked={theme === 'dark'}
                        onChange={changeTheme}
                        checkedChildren="Tối"
                        unCheckedChildren="Sáng"
                    />

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: "76vh",
                        background: "#fff"
                    }}

                >

                    <Outlet />
                </Content>
                <Footer
                    style={{
                        textAlign: "center"
                    }}
                >
                    Quế Trần & Tú Quyên ©2023
                </Footer>
            </Layout>
        </Layout >
    )
};

export default App;
