<template>
    <div>
        <h3>Please, type your phone number.</h3>
        <input 
            type="text" 
            placeholder="901234567"
            v-model="phone"
            @keypress.enter="getStudent"
        />
    </div>
</template>

<script>
import api from '@/api/axios'
import {setItem} from '@/helpers/localStorage'
export default {
    data(){
        return {
            phone: '',
            student: '',
            exam: ''
        }
    },
    methods:{
        async getStudent(){
            this.student = (await api.get(`student/phone/${this.phone}`)).data;
            setItem('student',this.student);
            // alert(this.student.group);
            // return;
            this.exam = (await api.post(`exam`,{
                student_id: this.student.id,
                level_name: this.student.current_level,
                group: this.student.group    
            })).data;
            setTimeout(() => {
                this.$router.push(`/assesser/exam/${this.exam.id}`);
            },1000);
        }
    }
}
</script>