import requests from "./httpService";

const ServiceDesignation  = {
    getAllDesignation: async () => {
        return requests.get(`/chucvu`);
    },
    getADesignation: async (id) => {
        return requests.get(`/chucvu/${id}`);
    },

}

export default ServiceDesignation ;