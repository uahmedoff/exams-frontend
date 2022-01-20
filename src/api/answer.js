import api from './axios'

const addAnswer = (params) => {
    return api.post(`/answer`,params);
}

export default{
    addAnswer
}