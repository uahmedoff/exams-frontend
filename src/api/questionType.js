import api from './axios'

const getQuestionTypes = () => {
    return api.get(`/question-type`);
}

const getQuestionType = (id) => {
    return api.get(`/question-type/${id}`);
}

export default{
    getQuestionTypes,
    getQuestionType
}