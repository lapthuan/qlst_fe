import requests from "./httpService";

const ServiceCustomer  = {
    getAllCustomer: async () => {
        return requests.get(`/khachhang`);
    },
    getACustomer: async (id) => {
        return requests.get(`/khachhang/${id}`);
    },

}

export default ServiceCustomer ;