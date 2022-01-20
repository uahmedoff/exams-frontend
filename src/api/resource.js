import api from './axios'

const getResources = (params) => {
    return api.get(`/resource`,{
        params:{
            ...params
        }
    });
}

const addResource = (params) => {
    return api.post(`/resource`,{
        ...params
    });
}

const getResource = (id) => {
    return api.get(`/resource/${id}`);
}

const updateResource = (params) => {
    return api.put(`/resource/${params.id}`,params.currentResource);
}

const activateOrInactivateResource = (id) => {
    return api.delete(`/resource/${id}`);
}

export default{
    getResources,
    addResource,
    getResource,
    updateResource,
    activateOrInactivateResource
}