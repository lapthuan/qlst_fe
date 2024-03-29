import requests from "./httpService";

const ServiceAccount  = {
    getAllAccount: async () => {
        return requests.get(`/taikhoan`);
    },
    getAccount: async (id) => {
        return requests.get(`/taikhoan/${id}`);
    },
    createAccount: async (body) => {
        return requests.post(`/taikhoan`, body);
    },
    editAccount: async (body, id) => {
        return requests.put(`/taikhoan/${id}`, body);
    },
    deleteAccount: async (id) => {
        return requests.delete(`/taikhoan/${id}`);
    }

}

export default ServiceAccount ;