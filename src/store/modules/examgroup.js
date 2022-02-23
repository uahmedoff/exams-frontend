import api from '@/api/axios'
import { reactive, readonly, computed } from '@vue/composition-api'

const state = reactive({
    isLoading:false,
    newexamgroups: [],
    checkingexamgroups: [],
    allCheckingExamgroups: {},
    examgroup: {},
    errors: null
})

const methods = {
    async getNewExamgroups() {
        state.isLoading = true;
        try {
            state.newexamgroups = (await api.get(`examgroup/new-ones`)).data.data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async addToCheckingList(examgroup_id) {
        state.isLoading = true;
        try {
            await api.put(`examgroup/${examgroup_id}/add`);
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },
    
    async getCheckingExamgroups() {
        state.isLoading = true;
        try {
            state.checkingexamgroups = (await api.get(`examgroup/checking-ones`)).data.data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async getAllCheckingExamgroups(from,till,page) {
        state.isLoading = true;
        try {
            state.allCheckingExamgroups = (await api.get(`examgroup/checking-exams/${from}/${till}`,{
                params:{
                    page
                }
            })).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async getExamgroup(examgroup_id) {
        state.isLoading = true;
        try {
            state.examgroup = (await api.get(`examgroup/${examgroup_id}`)).data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },
}

const getters = {
    numberOfNewExamGroups: computed(() => {
        let number = 0;
        state.newexamgroups.forEach((eg) => {
            number += eg.number_of_students;
        });
        return number;
    }),
    
    numberOfCheckingExamGroups: computed(() => {
        let number = 0;
        state.checkingexamgroups.forEach((eg) => {
            number += eg.number_of_students;
        });
        return number;
    }),  
}

export const store = readonly({
    state,
    methods,
    getters
})