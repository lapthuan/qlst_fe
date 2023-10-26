import requests from "./httpService";

const ServiceTypeOfMerchandise  = {
    getAllTypeOfMerchandise: async () => {
        return requests.get(`/loaihang`);
    },
    getALTypeOfMerchandise: async (id) => {
        return requests.get(`/loaihang/${id}`);
    },
    createTypeOfMerchandise: async (body) => {
        return requests.post(`/loaihang`, body);
    },
    editTypeOfMerchandise: async (body, id) => {
        return requests.put(`/loaihang/${id}`, body);
    },
    deleteTypeOfMerchandise: async (id) => {
        return requests.delete(`/loaihang/${id}`);
    }
}

export default ServiceTypeOfMerchandise ;