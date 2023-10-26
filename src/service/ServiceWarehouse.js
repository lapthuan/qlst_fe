import requests from "./httpService";

const ServiceWarehouse  = {
    getAllWarehouse: async () => {
        return requests.get(`/kho`);
    },
    getWarehouse: async (id) => {
        return requests.get(`/kho/${id}`);
    },
    createWarehouse: async (body) => {
        return requests.post(`/kho`, body);
    },
    editWarehouse: async (body, id) => {
        return requests.put(`/kho/${id}`, body);
    },
    deleteWarehouse: async (id) => {
        return requests.delete(`/kho/${id}`);
    }
}

export default ServiceWarehouse ;