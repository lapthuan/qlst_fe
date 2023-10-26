import requests from "./httpService";

const ServiceManufacturer = {
    getAllManufacturer: async () => {
        return requests.get(`/nhasanxuat`);
    },
    getAManufacturer: async (id) => {
        return requests.get(`/nhasanxuat/${id}`);
    },
    createManufacturer: async (body) => {
        return requests.post(`/nhasanxuat`, body);
    },
    editManufacturer: async (body, id) => {
        return requests.put(`/nhasanxuat/${id}`, body);
    },
    deleteManufacturer: async (id) => {
        return requests.delete(`/nhasanxuat/${id}`);
    }
}

export default ServiceManufacturer;