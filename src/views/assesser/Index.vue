<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h3 class="mt-5 mb-3">Please, type your phone number.</h3>
                <input 
                    type="text" 
                    placeholder="901234567"
                    v-model="phone"
                    class="pb-1"
                    @keypress.enter="getStudent"
                />
                <button 
                    v-if="isLoading" 
                    class="btn btn-sm bg-success text-white ms-1 disabled"
                >
                    <b-spinner small variant="light"></b-spinner>
                </button>
                <button 
                    v-else
                    v-show="phone"
                    @click.prevent="getStudent"
                    class="btn btn-sm bg-success text-white ms-1"
                >
                    Start
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/axios'
import { setItem } from '@/helpers/localStorage'
export default {
    data(){
        return {
            isLoading: false,
            phone: '',
            student: '',
            exam: ''
        }
    },
    methods:{
        async getStudent(){
            this.isLoading = true;
            this.student = (await api.get(`student/phone/${this.phone}`)).data;
            setItem('student',this.student);
            // alert(this.student.group);
            // return;
            this.exam = (await api.post(`exam`,{
                student_id: this.student.id,
                level_name: this.student.current_level,
                group_id: this.student.group_id,   
                group: this.student.group, 
                branch_name: this.student.branch_name, 
            })).data;
            setTimeout(() => {
                this.$router.push(`/assesser/exam/${this.exam.id}`);
            },1000);
            this.isLoading = false;
        }
    }
}
</script>