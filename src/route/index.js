import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from "../component/layout/layout"
import Login from '../page/Login';
import OrderDetail from '../page/OrderDetail';

const Home = lazy(() => import('../page/Home'));
const Merchandise = lazy(() => import('../page/Merchandise'));
const TypeOfMerchandise = lazy(() => import('../page/TypeOfMerchandise'));
const Coupon = lazy(() => import('../page/Coupon'));
const Manufacturer = lazy(() => import('../page/Manufacturer'));
const Employee = lazy(() => import('../page/Employee'));
const Account = lazy(() => import('../page/Account'));
const Designation = lazy(() => import('../page/Designation'));
const Customer = lazy(() => import('../page/Customer'));
const HRDepartment = lazy(() => import('../page/HRDepartment'));
const Warehouse = lazy(() => import('../page/Warehouse'));
const Shelves = lazy(() => import('../page/Shelves'));
const DeliveryReceipt = lazy(() => import('../page/DeliveryReceipt'));
const DeliveryReceiptDetail = lazy(() => import('../page/DeliveryReceiptDetail'));
const Order = lazy(() => import('../page/Order'));
const Branch = lazy(() => import('../page/Branch'));


const App = () => (
    <Router>
        <Suspense fallback={<Spin tip="Đang tải..." size="large">
            <div className="content" />
        </Spin>}>
            <Routes>
                <Route path='/dangnhap' element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/mathang' element={<Merchandise />} />
                    <Route path="/loaihang" element={<TypeOfMerchandise />} />
                    <Route path="/nhasanxuat" element={<Manufacturer />} />
                    <Route path="/phieugiamgia" element={<Coupon />} />
                    <Route path="/nhanvien" element={<Employee />} />
                    <Route path="/taikhoan" element={<Account />} />
                    <Route path="/chucvu" element={<Designation />} />
                    <Route path="/khachhang" element={<Customer />} />
                    <Route path="/bophan" element={<HRDepartment />} />
                    <Route path="/kho" element={<Warehouse />} />
                    <Route path="/ke" element={<Shelves />} />
                    <Route path="/phieunhap" element={<DeliveryReceipt />} />
                    <Route path="/phieunhap/:iddr" element={<DeliveryReceiptDetail />} />
                    <Route path="/hoadon" element={<Order />} />
                    <Route path="/hoadon/:idhd" element={<OrderDetail />} />
                    <Route path="/chinhanh" element={<Branch />} />

                </Route>
            </Routes>
        </Suspense>
    </Router>
);

export default App