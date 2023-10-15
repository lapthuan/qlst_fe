import requests from "./httpService";

const ServicesMerchandise = {
    getAllMerchandise: async () => {
        return requests.get(`/mathang`);
    },

}

export default ServicesMerchandise;