import generateQuestionApi from '@/api/generate-questions'
import { reactive, readonly, computed } from '@vue/composition-api'

const state = reactive({
    isLoading:false,
    isBuilding:false,
    generated_question: {},
    groups: [],
    group: {},
    students: [],
    student: {},
    questions: [],
    errors: null
})

const methods = {
    async getGroups(params) {
        state.isLoading = true;
        try {
            state.groups = (await generateQuestionApi.getGroups(params)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async getExamGroups(branch_id,exam_date) {
        state.isLoading = true;
        try {
            state.groups = (await generateQuestionApi.getExamGroups(branch_id,exam_date)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async generateQuestions(supervisor_group_id){
        state.isBuilding = true;
        try {
            await generateQuestionApi.generateQuestions(supervisor_group_id);
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isBuilding = false;  
    },

    async getSupervisorGroup(supervisor_group_id) {
        state.isLoading = true;
        try {
            state.group = (await generateQuestionApi.getSupervisorGroup(supervisor_group_id)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async getStudents(supervisor_group_id) {
        state.isLoading = true;
        try {
            state.students = (await generateQuestionApi.getStudents(supervisor_group_id)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async getStudent(student_id) {
        state.isLoading = true;
        try {
            state.student = (await generateQuestionApi.getStudent(student_id)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async getStudentQuestions(student_id) {
        state.isLoading = true;
        try {
            state.questions = (await generateQuestionApi.getStudentQuestions(student_id)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },        

    async getGeneratedQuestionSupervisorGroup(group_student_id) {
        state.isLoading = true;
        try {
            state.generated_question = (await generateQuestionApi.getGeneratedQuestionSupervisorGroup(group_student_id)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    }
}

const getters = {
    
}

export const store = readonly({
    state,
    methods,
    getters
})