import requests from "./httpService";

const ServiceCoupon  = {
    getAllCoupon: async () => {
        return requests.get(`/giamgia`);
    },
    getACoupon: async (id) => {
        return requests.get(`/giamgia/${id}`);
    },

}

export default ServiceCoupon ;