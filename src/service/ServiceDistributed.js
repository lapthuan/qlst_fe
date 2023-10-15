import requests from "./httpService";

const ServiceDistributed = {
    PhanTanNgang: async (body) => {
        return requests.post(`/phantan`, body);
    },
    ShowTable: async () => {
        return requests.get(`/mysql/showtable`);
    },
    ShowColumn: async (table) => {
        return requests.get(`/mysql/showcolumn/${table}`);
    },
}

export default ServiceDistributed;