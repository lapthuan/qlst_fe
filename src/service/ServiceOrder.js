import requests from "./httpService";

const ServiceOrder = {
    getAllOrder: async () => {
        return requests.get(`/hoadon`);
    },
    getOrder: async (id) => {
        return requests.get(`/hoadon/${id}`);
    },
    createOrder: async (body) => {
        return requests.post(`/hoadon`, body);
    },
    editOrder: async (body, id) => {
        return requests.put(`/hoadon/${id}`, body);
    },
    deleteOrder: async (id) => {
        return requests.delete(`/hoadon/${id}`);
    },
    getOrderDetail: async () => {
        return requests.get(`/chitiethoadon`);
    },
    getAOrderDetail: async (id) => {
        return requests.get(`/chitiethoadon/${id}`);
    },
    createOrderDetail: async (body) => {
        return requests.post(`/chitiethoadon`, body);
    },
    editOrderDetail: async (body, id) => {
        return requests.put(`/chitiethoadon/${id}`, body);
    },
    deleteOrderDetail: async (body) => {
        return requests.post(`/chitiethoadon/deletedetail`, body);
    }
}

export default ServiceOrder;