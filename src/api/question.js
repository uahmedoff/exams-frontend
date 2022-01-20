import api from './axios'

const questionsByLevels = () => {
    return api.get(`/question/numbers`);
}

const getQuestions = (params) => {
    return api.get(`/question`,{
        params: {
            ...params
        }
    });
}

const addQuestion = (params) => {
    return api.post(`/question`,{
        ...params
    });
}

const getQuestion = (id) => {
    return api.get(`/question/${id}`);
}

const updateQuestion = (params) => {
    return api.put(`/question/${params.id}`,params.currentQuestion);
}

const activateOrInactivateQuestion = (id) => {
    return api.delete(`/question/${id}`);
}

export default{
    questionsByLevels,
    getQuestions,
    addQuestion,
    getQuestion,
    updateQuestion,
    activateOrInactivateQuestion  
}