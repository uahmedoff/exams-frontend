<template>
    <div class="mt-3">

        <h3>Resource and questions of {{level.name}} - {{ questionType.name }}</h3>

        <table class="table table-bordered table-condensed table-hover">
            <tr>
                <th>#</th>
                <th>Resource</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Action</th>
            </tr>
            <tr v-for="qp,index in questionPlans" :key="index">
                <td>Question{{++index}}</td>
                <td>
                    <span v-if="questionType.resource_types && questionType.resource_types.length">
                        <div v-for="rt,index in questionType.resource_types" :key="index">
                            {{ rt.name }}  --- {{ rt.id }}
                            <span v-if="qp.resource_id && qp.qresource.type_id == rt.id">✅</span>
                            <span v-else>❌</span>
                        </div>
                    </span>
                    <span v-else>No</span>
                </td>
                <td>
                    Question 
                    <span v-if="qp.question_id">✅</span>
                    <span v-else>❌</span>
                </td>
                <td>
                    Answer 
                    <span v-if="qp.question && qp.question.asnwers.length">✅</span>
                    <span v-else>❌</span>
                </td>
                <td>
                    <router-link 
                        :to="`/admin-dashboard/level/${level.id}/type/${questionType.id}/qp/${qp.id}/fill`"
                        class="btn btn-success btn-sm"
                    >
                        +
                    </router-link>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                    <a 
                        class="btn btn-sm btn-success" 
                        href="#" 
                        @click.prevent="addQP"
                    >
                        Add question +
                    </a>
                </td>
            </tr>
        </table>

    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            currentPage: 1
        }
    },
    computed:{
        ...mapState('level',['level']),
        ...mapState('questionType',['questionType']),
        ...mapState('questionPlan',['questionPlans']),
        isLevelLoading(){
            return this.$store.state.level.isLoading;
        },
    },
    mounted(){
        this.getLevel(this.$route.params.level_id);
        this.getQuestionType(this.$route.params.question_type);
        this.getQuestionPlans({
            level_id: this.$route.params.level_id,
            question_type_id: this.$route.params.question_type
        });
    },
    methods:{
        ...mapActions('level',['getLevel']),
        ...mapActions('questionType',['getQuestionType']),
        ...mapActions('questionPlan',['getQuestionPlans','addQuestionPlan']),
        async addQP(){
            await this.addQuestionPlan({
                level_id: this.$route.params.level_id,
                question_type_id: this.$route.params.question_type
            });
            await this.getQuestionPlans({
                level_id: this.$route.params.level_id,
                question_type_id: this.$route.params.question_type
            });
        }
    }
}    
</script>

<style  scoped>
    .btn-success {
        background-color: #198754!important;
    }
</style>