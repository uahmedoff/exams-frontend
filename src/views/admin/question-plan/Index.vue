<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mt-3">
                <h3>Resource and questions of {{level.name}} - {{ questionType.name }}</h3>

                <router-link class="btn btn-secondary btn-sm" :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}`">Back</router-link>

                <div class="mt-5">
                    <!-- {{ questionPlan }} -->

                    <table 
                        class="table table-bordered table-condensed table-hover" 
                    >
                        <tr>
                            <th>File</th>
                            <th>
                                <router-link 
                                    v-if="!questionPlan.resource_id"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/qp/${$route.params.qp_id}/resource/add`" 
                                    class="btn btn-success btn-sm"
                                >
                                    Add
                                </router-link>
                            </th>
                            <th>Save</th>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>
                                <span v-if="questionType.resource_types && questionType.resource_types.length">
                                    <span v-for="rt,index in questionType.resource_types" :key="index">
                                        {{ rt.name }} /
                                    </span>
                                </span>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>File</td>
                            <td>
                                <template v-if="questionPlan.resource_id">
                                    <video 
                                        v-if="questionPlan.qresource.src && questionPlan.qresource.type_id == 1"
                                        controls
                                    >
                                        <source :src="`${apiUrl}/storage/${questionPlan.qresource.src}`" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video> 
                                    <audio 
                                        v-if="questionPlan.qresource.src && questionPlan.qresource.type_id == 2"
                                        controls
                                    >
                                        <source :src="`${apiUrl}/storage/${questionPlan.qresource.src}`" type="audio/mpeg">
                                        Your browser does not support the audio tag.
                                    </audio> 
                                    <img 
                                        v-if="questionPlan.qresource.src && questionPlan.qresource.type_id == 3"
                                        :src="`${apiUrl}/storage${questionPlan.qresource.src}`" 
                                        class="card-img-top" 
                                    >
                                </template>
                                <template v-else> - </template>
                            </td>
                            <td>
                                <router-link 
                                    v-if="questionPlan.resource_id"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/qp/${$route.params.qp_id}/resource/${questionPlan.resource_id}/edit`"
                                >
                                        Edit
                                    </router-link>
                            </td>
                        </tr>
                    </table>

                    <table 
                        class="table table-bordered table-condensed table-hover mt-5"
                        style="border:1px solid #555!important"
                    >
                        <tr>
                            <th>Question</th>
                            <th>
                                <router-link 
                                    v-if="!questionPlan.question_id"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/qp/${$route.params.qp_id}/question/add`" 
                                    class="btn btn-success btn-sm"
                                >
                                    Add
                                </router-link>
                            </th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Text</td>
                            <td>
                                <span v-if="questionPlan.question_id">
                                    {{ questionPlan.question.question }}
                                </span>
                                <span v-else> - </span>
                            </td>
                            <td>
                                <router-link 
                                    v-if="questionPlan.question_id"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/qp/${$route.params.qp_id}/question/${questionPlan.question_id}/edit`"
                                >
                                    Edit
                                </router-link>
                            </td>
                        </tr>
                    </table>

                    <table 
                        class="table table-bordered table-condensed table-hover mt-5"
                        style="border:1px solid #555!important"
                    >
                        <tr>
                            <th>Answer</th>
                            <th>
                                <router-link 
                                    class="btn btn-success btn-sm mb-2"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/qp/${$route.params.qp_id}/question/${questionPlan.question_id}/answer/add`"
                                >
                                    Add
                                </router-link>
                            </th>
                            <th></th>
                        </tr>
                        <template v-if="questionPlan.question_id">
                            <tr v-for="answer,index in questionPlan.question.answers" :key="index">
                                <td>{{answer.answer}}</td>
                                <td>
                                    <span v-if="answer.is_correct">✅</span>
                                </td>
                                <td>
                                    Edit
                                </td>
                            </tr>
                        </template>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
            apiUrl: process.env.VUE_APP_API_URL,
        }
    },
    computed:{
        ...mapState('level',['level']),
        ...mapState('questionType',['questionType']),
        ...mapState('questionPlan',['questionPlan'])
    },
    mounted(){
        this.getLevel(this.$route.params.level_id);
        this.getQuestionType(this.$route.params.question_type);
        this.getQuestionPlan(this.$route.params.qp_id);
    },
    methods:{
        ...mapActions('level',['getLevel']),
        ...mapActions('questionType',['getQuestionType']),
        ...mapActions('questionPlan',['getQuestionPlan']),
    }
}
</script>

<style  scoped>
    .table, .table th, .table td{
        border: 1px solid #555!important;
    }
    .btn-success {
        background-color: #198754!important;
    }
</style>