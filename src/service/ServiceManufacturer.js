import requests from "./httpService";

const ServiceManufacturer  = {
    getAllManufacturer: async () => {
        return requests.get(`/nhasanxuat`);
    },
    getAManufacturer: async (id) => {
        return requests.get(`/nhasanxuat/${id}`);
    },

}

export default ServiceManufacturer ;