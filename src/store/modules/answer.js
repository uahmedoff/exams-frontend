import answerApi from '@/api/answer'

const state = {
    isSubmitting: false,
    isLoading: false,
    answers: null,
    pagination: {},
    answer: null,
    currentAnswer: {
        id: '',
        created_at: '',
        updated_at: '',
        answer: '',
        question_id: '',
        is_correct: '',
        is_active: '',
        created_by: '',
        updated_by: ''
    },
    validationErrors: null,
}

const getters = {
    
};

const mutations = {
    updateQuestionId(state,payload){
        state.currentAnswer.question_id = payload;
    },
    updateAnswer(state,payload){
        state.currentAnswer.answer = payload;
    },
    updateIsCorrect(state,payload){
        state.currentAnswer.is_correct = payload;
    },
    setCurrentAnswerNull(state){
        state.currentAnswer = {
            id: '',
            created_at: '',
            updated_at: '',
            answer: '',
            question_id: '',
            is_correct: '',
            is_active: '',
            created_by: '',
            updated_by: ''
        };
    },

    addAnswerStart(state){
        state.validationErrors = null;
        state.isLoading = true;
    },
    addAnswerSuccess(state){
        state.isLoading = false;
    },
    addAnswerFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    currentResourceStart(state){
        state.validationErrors = null;
        state.isLoading = true;
        state.currentResource = {
            id: '',
            created_at: '',
            updated_at: '',
            src: '',
            type: '',
            text: '',
            level_id: '',
            is_active: '',
            created_by: '',
            updated_by: ''
        };
    },
    currentResourceSuccess(state,payload){
        state.isLoading = false;
        state.currentResource = payload.data;
    },
    currentResourceFailure(state,payload){
        state.isLoading = false;
    },

    updateResourceStart(state){
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    updateResourceSuccess(state){
        state.isSubmitting = false;
    },
    updateResourceFailure(state,payload){
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    activateOrInactivateResourceStart(state){
        state.validationErrors = null;
        state.isLoading = true;
    },
    activateOrInactivateResourceSuccess(state,payload){
        state.isLoading = false;
    },
    activateOrInactivateResourceFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },
}

const actions = {
    async addAnswer(context){
        context.commit('addAnswerStart');
        try {
            const response = (await answerApi.addAnswer(context.state.currentAnswer));
            context.commit('addAnswerSuccess',response);
            context.commit('setCurrentAnswerNull');
        } 
        catch (error) {
            context.commit('addAnswerFailure',error.response.data.errors);
        }
    },
    // async getResource(context,id){
    //     context.commit('currentResourceStart');
    //     try {
    //         const response = (await resourceApi.getResource(id));
    //         context.commit('currentResourceSuccess',response.data);
    //     } 
    //     catch (error) {
    //         context.commit('currentResourceFailure',error.response.data.errors);
    //     }
    // },
    // async updateResource(context,id){
    //     context.commit('updateResourceStart');
    //     try {
    //         const response = (await resourceApi.updateResource({
    //             id: id,
    //             currentResource: context.state.currentResource 
    //         }));
    //         context.commit('currentResourceSuccess',response.data);
    //     } 
    //     catch (error) {
    //         context.commit('currentResourceFailure',error.response.data.errors);
    //     }
    // },
    // async activateOrInactivateResource(context,id){
    //     context.commit('activateOrInactivateResourceStart');
    //     try {
    //         const response = (await resourceApi.activateOrInactivateResource(id));
    //         context.commit('activateOrInactivateResourceSuccess',response);
    //     } 
    //     catch (error) {
    //         context.commit('activateOrInactivateResourceFailure',error.response.data.errors);
    //     }
    // },
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}