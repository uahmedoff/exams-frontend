import api from './axios'

const getQuestionPlans = (params) => {
    return api.get(`/question-plan`,{
        params:{
            ...params
        }
    });
}

const addQuestionPlan = (params) => {
    return api.post(`/question-plan`,{
        ...params
    });
}

const getQuestionPlan = (id) => {
    return api.get(`/question-plan/${id}`);
}

export default{
    getQuestionPlans,
    addQuestionPlan,
    getQuestionPlan
}