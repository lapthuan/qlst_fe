import requests from "./httpService";

const ServiceDeliveryReceipt  = {
    getAllDeliveryReceipt: async () => {
        return requests.get(`/phieunhap`);
    },
    getDeliveryReceipt: async (id) => {
        return requests.get(`/phieunhap/${id}`);
    },

}

export default ServiceDeliveryReceipt ;