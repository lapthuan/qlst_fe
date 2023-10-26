import requests from "./httpService";

const ServicesMerchandise = {
    getAllMerchandise: async () => {
        return requests.get(`/mathang`);
    },
    getAMerchandise: async (id) => {
        return requests.get(`/mathang/${id}`);
    },
    createMerchandise: async (body) => {
        return requests.post(`/mathang`, body);
    },
    editMerchandise: async (body, id) => {
        return requests.put(`/mathang/${id}`, body);
    },
    deleteMerchandise: async (id) => {
        return requests.delete(`/mathang/${id}`);
    }
}

export default ServicesMerchandise;