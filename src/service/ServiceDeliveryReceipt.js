import requests from "./httpService";

const ServiceDeliveryReceipt = {
    getAllDeliveryReceipt: async () => {
        return requests.get(`/phieunhap`);
    },
    getDeliveryReceipt: async (id) => {
        return requests.get(`/phieunhap/${id}`);
    },
    createDeliveryReceipt: async (body) => {
        return requests.post(`/phieunhap`, body);
    },
    editDeliveryReceipt: async (body, id) => {
        return requests.put(`/phieunhap/${id}`, body);
    },
    deleteDeliveryReceipt: async (id) => {
        return requests.delete(`/phieunhap/${id}`);
    },
    getDeliveryReceiptDetail: async (id) => {
        return requests.get(`/chitietphieunhap/${id}`);
    },
    createDeliveryReceiptDetail: async (body) => {
        return requests.post(`/chitietphieunhap`, body);
    },
    editDeliveryReceiptDetail: async (body, id) => {
        return requests.put(`/chitietphieunhap/${id}`, body);
    },
    deleteDeliveryReceiptDetail: async (body) => {
        return requests.post(`/chitietphieunhap/deletedetail`, body);
    },
}

export default ServiceDeliveryReceipt;