import requests from "./httpService";

const ServiceHRDepartment  = {
    getAllHRDepartment: async () => {
        return requests.get(`/bophan`);
    },
    getHRDepartment: async (id) => {
        return requests.get(`/bophan/${id}`);
    },

}

export default ServiceHRDepartment ;