import requests from "./httpService";

const ServiceShelves  = {
    getAllShelves: async () => {
        return requests.get(`/kehang`);
    },
    getShelves: async (id) => {
        return requests.get(`/kehang/${id}`);
    },

}

export default ServiceShelves ;