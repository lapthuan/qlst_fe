import requests from "./httpService";

const ServicesMerchandise = {
    getAllMerchandise: async () => {
        return requests.get(`/mathang`);
    },
    getAMerchandise: async (id) => {
        return requests.get(`/mathang/${id}`);
    },

}

export default ServicesMerchandise;