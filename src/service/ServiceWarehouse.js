import requests from "./httpService";

const ServiceWarehouse  = {
    getAllWarehouse: async () => {
        return requests.get(`/kho`);
    },
    getWarehouse: async (id) => {
        return requests.get(`/kho/${id}`);
    },

}

export default ServiceWarehouse ;