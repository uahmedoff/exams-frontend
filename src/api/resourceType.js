import api from './axios'

const getResourceTypes = () => {
    return api.get(`/resource-type`);
}

const getResourceType = (id) => {
    return api.get(`/resource-type/${id}`);
}

export default{
    getResourceTypes,
    getResourceType
}