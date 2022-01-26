<template>
    <div class="container mt-3">

        <div class="row">

            <div class="col-lg-12">
                <h3>{{level.name}} - {{ capitalized(questionType.name) }}</h3>

                <router-link class="btn btn-secondary btn-sm mb-2" :to="`/admin-dashboard`">Back</router-link> &nbsp;

                <template v-if="numberOfQuestionPlans">
                    <h4 class="badge bg-secondary">{{ numberOfQuestionPlans.with_questions }}</h4>
                    / 
                    <h4 class="badge bg-secondary">{{ numberOfQuestionPlans.all }}</h4> 
                </template>    

                <br>

                <a 
                    class="btn btn-sm btn-success mb-3" 
                    href="#" 
                    @click.prevent="addQP"
                >
                    <b-icon icon="plus" /> Add question
                </a> &nbsp;
                <b-spinner v-if="isLoading" variant="success"></b-spinner>

                <!-- <b-skeleton-table
                    v-if="isLoading"
                    :rows="5"
                    :columns="5"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table> -->

                <table 
                    class="table table-bordered table-condensed table-hover"
                >
                    <tr>
                        <th>#</th>
                        <th>Resource</th>
                        <th>Question</th>
                        <th>Answers</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="qp,index in questionPlans" :key="index">
                        <td>
                            Question
                            {{  
                                correct_pages(
                                    index,
                                    questionPlansPagination.current_page,
                                    questionPlansPagination.per_page,
                                    questionPlansPagination.total,
                                    "desc"
                                ) 
                            }}  
                            <b-dropdown size="sm">
                                <template #button-content></template>
                                <b-dropdown-item href="#" @click.prevent="deleteQP(qp.id)">
                                    <span class="color-red"><b-icon icon="trash" /> Delete</span>
                                </b-dropdown-item>
                            </b-dropdown>
                        </td>
                        <td>
                            <span v-if="questionType.resource_types && questionType.resource_types.length">
                                <div v-for="rt,index in questionType.resource_types" :key="index">
                                    {{ rt.name }}
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
                            <span v-if="qp.question && qp.question.answers.length">✅</span>
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
                </table>

                <b-pagination
                    v-if="questionPlansPagination.last_page>1"
                    @input="loadPage"
                    v-model="questionPlansPagination.current_page"
                    :total-rows="questionPlansPagination.total"
                    :per-page="questionPlansPagination.per_page"
                    aria-controls="my-table"
                ></b-pagination>
            </div>

        </div>


    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import ItemsNumber from "@/mixins/ItemsNumbers"
import StringMix from "@/mixins/String"
export default {
    mixins:[ItemsNumber,StringMix],
    data(){
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            currentPage: 1
        }
    },
    computed:{
        ...mapState('level',['level']),
        ...mapState('questionType',['questionType']),
        ...mapState('questionPlan',[
            'isLoading',
            'questionPlans',
            'questionPlansPagination',
            'numberOfQuestionPlans'
        ]),
        isLevelLoading(){
            return this.$store.state.level.isLoading;
        },
    },
    mounted(){
        this.getLevel(this.$route.params.level_id);
        this.getQuestionType(this.$route.params.question_type);
        this.getNumberOfQuestionPlans({
            level_id: this.$route.params.level_id,
            question_type_id: this.$route.params.question_type,
        });
        this.loadPage()
    },
    methods:{
        ...mapActions('level',['getLevel']),
        ...mapActions('questionType',['getQuestionType']),
        ...mapActions('questionPlan',[
            'getQuestionPlans',
            'addQuestionPlan',
            'deleteQuestionPlan',
            'getNumberOfQuestionPlans'
        ]),
        async loadPage(pageNum = 1){
            await this.getQuestionPlans({
                level_id: this.$route.params.level_id,
                question_type_id: this.$route.params.question_type,
                order: "desc",
                page: pageNum
            });
        },
        async addQP(){
            await this.addQuestionPlan({
                level_id: this.$route.params.level_id,
                question_type_id: this.$route.params.question_type
            });
            await this.loadPage()
        },
        async deleteQP(id){
            if(confirm("Are you sure?")){
                await this.deleteQuestionPlan(id)
                await this.loadPage()
            }
        }
    }
}    
</script>

<style  scoped>
    .btn-success {
        background-color: #198754!important;
    }
    .color-red{
        color: red;
    }
</style>