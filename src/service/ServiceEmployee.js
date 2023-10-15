import requests from "./httpService";

const ServiceEmployee  = {
    getAllEmployee: async () => {
        return requests.get(`/nhanvien`);
    },
    getAEmployee: async (id) => {
        return requests.get(`/nhanvien/${id}`);
    },

}

export default ServiceEmployee ;