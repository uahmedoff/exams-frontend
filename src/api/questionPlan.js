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

const deleteQuestionPlan = (id) => {
    return api.delete(`/question-plan/${id}`);
}

const getNumberOfQuestionPlans = (params) => {
    return api.get(`/question-plan/numbers`,{
        params:{
            ...params
        }
    })
}

export default{
    getQuestionPlans,
    addQuestionPlan,
    getQuestionPlan,
    deleteQuestionPlan,
    getNumberOfQuestionPlans
}