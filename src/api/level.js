import api from './axios'

const getLevel = (id) => {
    return api.get(`/level/${id}`);
}

export default{
    getLevel
}