import requests from "./httpService";

const ServiceCustomer = {
    getAllCustomer: async () => {
        return requests.get(`/khachhang`);
    },
    getACustomer: async (id) => {
        return requests.get(`/khachhang/${id}`);
    },
    createCustomer: async (body) => {
        return requests.post(`/khachhang`, body);
    },
    editCustomer: async (body, id) => {
        return requests.put(`/khachhang/${id}`, body);
    },
    deleteCustomer: async (id) => {
        return requests.delete(`/khachhang/${id}`);
    }

}

export default ServiceCustomer;