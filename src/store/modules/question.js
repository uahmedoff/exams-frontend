import questionApi from '@/api/question'

const state = {
    isSubmitting: false,
    isLoading: false,
    questionsByLevels: [],
    questions: null,
    question: null,
    currentQuestion: {
        id: '',
        created_at: '',
        updated_at: '',
        question: '',
        level_id: '',
        resource_id: '',
        type_id: '',
        pq_id: '',
        is_active: '',
        created_by: '',
        updated_by: ''
    },
    validationErrors: null,
}

const getters = {
    
};

const mutations = {
    questionsByLevelsStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    questionsByLevelsSuccess(state,payload){
        state.isLoading = false;
        state.questionsByLevels = payload;
        state.isLoggedIn = true;
    },
    questionsByLevelsFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    questionsStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    questionsSuccess(state,payload){
        state.isLoading = false;
        state.questions = payload;
        state.isLoggedIn = true;
    },
    questionsFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    updateQplId(state,payload){
        state.currentQuestion.qp_id = payload;
    },
    updateLevelId(state,payload){
        state.currentQuestion.level_id = payload;
    },
    updateType(state,payload){
        state.currentQuestion.type_id = payload;
    },
    updateResourceId(state,payload){
        state.currentQuestion.resource_id = payload;
    },
    updateQuestion(state,payload){
        state.currentQuestion.question = payload;
    },
    setCurrentQuestionNull(state){
        state.currentQuestion = {
            id: '',
            created_at: '',
            updated_at: '',
            question: '',
            level_id: '',
            resource_id: '',
            type_id: '',
            qp_id: '',
            is_active: '',
            created_by: '',
            updated_by: ''
        };
    },

    addQuestionStart(state){
        state.validationErrors = null;
        state.isLoading = true;
    },
    addQuestionSuccess(state){
        state.isLoading = false;
    },
    addQuestionFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    currentQuestionStart(state){
        state.validationErrors = null;
        state.isLoading = true;
        state.currentQuestion = {
            id: '',
            created_at: '',
            updated_at: '',
            question: '',
            level_id: '',
            resource_id: '',
            type_id: '',
            qp_id: '',
            is_active: '',
            created_by: '',
            updated_by: ''
        };
    },
    currentQuestionSuccess(state,payload){
        state.isLoading = false;
        state.currentQuestion = payload.data;
    },
    currentQuestionFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    updateQuestionStart(state){
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    updateQuestionSuccess(state){
        state.isSubmitting = false;
    },
    updateQuestionFailure(state,payload){
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    activateOrInactivateQuestionStart(state){
        state.validationErrors = null;
        state.isLoading = true;
    },
    activateOrInactivateQuestionSuccess(state,payload){
        state.isLoading = false;
    },
    activateOrInactivateQuestionFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },
}

const actions = {
    async getQuestionsByLevels(context){
        context.commit('questionsByLevelsStart');
        try {
            const response = (await questionApi.questionsByLevels()).data;
            context.commit('questionsByLevelsSuccess',response.data)
        } 
        catch (error) {
            context.commit('questionsByLevelsFailure',error.response.data.errors);
        }
    },

    async getQuestions(context,params){
        context.commit('questionsStart');
        try {
            const response = (await questionApi.getQuestions(params)).data;
            context.commit('questionsSuccess',response.data)
        } 
        catch (error) {
            context.commit('questionsFailure',error.response.data.errors);
        }
    },

    async addQuestion(context){
        context.commit('addQuestionStart');
        try {
            const response = (await questionApi.addQuestion(context.state.currentQuestion)).data;
            context.commit('addQuestionSuccess',response.data)
        } 
        catch (error) {
            context.commit('addQuestionFailure',error.response.data.errors);
        }
    },

    async getQuestion(context,id){
        context.commit('currentQuestionStart');
        try {
            context.commit('setCurrentQuestionNull');
            const response = (await questionApi.getQuestion(id)).data;
            context.commit('currentQuestionSuccess',response)
        } 
        catch (error) {
            context.commit('currentQuestionFailure',error.response.data.errors);
        }
    },

    async updateQuestion(context,id){
        context.commit('updateQuestionStart');
        try {
            const response = (await questionApi.updateQuestion({
                id: id,
                currentQuestion: context.state.currentQuestion 
            })).data;
            context.commit('updateQuestionSuccess',response)
        } 
        catch (error) {
            context.commit('updateQuestionFailure',error.response.data.errors);
        }
    },

    async activateOrInactivateQuestion(context,id){
        context.commit('activateOrInactivateQuestionStart');
        try {
            const response = (await questionApi.activateOrInactivateQuestion(id));
            context.commit('activateOrInactivateQuestionSuccess',response);
        } 
        catch (error) {
            context.commit('activateOrInactivateQuestionFailure',error.response.data.errors);
        }
    },
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}