import requests from "./httpService";

const ServiceOrder  = {
    getAllOrder: async () => {
        return requests.get(`/hoadon`);
    },
    getOrder: async (id) => {
        return requests.get(`/hoadon/${id}`);
    },

}

export default ServiceOrder ;