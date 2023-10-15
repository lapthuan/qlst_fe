import requests from "./httpService";

const ServiceAccount  = {
    getAllAccount: async () => {
        return requests.get(`/taikhoan`);
    },
    getAccount: async (id) => {
        return requests.get(`/taikhoan/${id}`);
    },

}

export default ServiceAccount ;