import api from './axios'

const addAnswer = (params) => {
    return api.post(`/answer`,params);
}

const deleteAnswer = (id) => {
    return api.delete(`/answer/${id}`);
}

export default{
    addAnswer,
    deleteAnswer,
}