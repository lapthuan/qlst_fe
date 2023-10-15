import requests from "./httpService";

const ServiceTypeOfMerchandise  = {
    getAllTypeOfMerchandise: async () => {
        return requests.get(`/loaihang`);
    },
    getALTypeOfMerchandise: async (id) => {
        return requests.get(`/loaihang/${id}`);
    },

}

export default ServiceTypeOfMerchandise ;