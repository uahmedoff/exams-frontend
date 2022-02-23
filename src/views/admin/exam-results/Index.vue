<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 pt-5 pb-3">
                <h3>Exam Results</h3>
            </div>
            <div class="col-lg-4">
                <b-form-datepicker 
                    id="from" 
                    v-model="period.from" 
                    class="mb-2"
                ></b-form-datepicker>
            </div>
            <div class="col-lg-4">
                <b-form-datepicker 
                    id="to" 
                    v-model="period.to" 
                    class="mb-2"
                ></b-form-datepicker>
            </div>
            <div class="col-lg-3">
                <button class="btn btn-success" @click.prevent="getAllCheckingExamgroups(1)">
                    <b-icon icon="search"></b-icon>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 pt-3">
                <b-skeleton-table
                    v-if="examgroupStore.state.isLoading"
                    :rows="10"
                    :columns="4"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
                <template v-else-if="examgroupStore.state.allCheckingExamgroups.data.length">
                    <table 
                        class="table table-bordered table-condensed table-hover"
                    >
                        <thead>
                            <tr>
                                <th width="40px">#</th>
                                <th>Group</th>
                                <th>Level</th>
                                <th>Exam date</th>
                                <th>Invigilator</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="eg,index in examgroupStore.state.allCheckingExamgroups.data" :key="index">
                                <td>
                                    {{  
                                        correct_pages(
                                            index,
                                            examgroupStore.state.allCheckingExamgroups.meta.current_page,
                                            examgroupStore.state.allCheckingExamgroups.meta.per_page,
                                            examgroupStore.state.allCheckingExamgroups.meta.total,
                                            "asc"
                                        ) 
                                    }}
                                </td>
                                <td>
                                    <router-link 
                                        :to="`/admin-dashboard/exam-group/${eg.id}/exam-results`"
                                        class="eg-link"
                                    >
                                        {{eg.group_name}}
                                        <span class="badge bg-secondary">{{ eg.number_of_students }}</span>
                                    </router-link>
                                </td>
                                <td>{{eg.level.name}}</td>
                                <td>{{moment(eg.created_at).format("MMM Do, YYYY")}}</td>
                                <td>{{eg.invigilator.name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <b-pagination
                    v-if="examgroupStore.state.allCheckingExamgroups.meta.last_page>1"
                    @input="getAllCheckingExamgroups"
                    v-model="examgroupStore.state.allCheckingExamgroups.meta.current_page"
                    :total-rows="examgroupStore.state.allCheckingExamgroups.meta.total"
                    :per-page="examgroupStore.state.allCheckingExamgroups.meta.per_page"
                    aria-controls="my-table"
                ></b-pagination>
            </div>
        </div>        
    </div>
</template>

<script>
import moment from 'moment'
import {store as examgroupStore} from '@/store/modules/examgroup'
import ItemsNumber from "@/mixins/ItemsNumbers"
export default {
    mixins:[ItemsNumber],
    data(){
        return {
            period:{
                from: moment().startOf('month').format('YYYY-MM-DD'), 
                to: moment().endOf('month').format('YYYY-MM-DD')
            },
            moment,
            examgroupStore
        }
    },
    mounted(){
        this.getAllCheckingExamgroups()
    },
    methods:{
        getAllCheckingExamgroups(page = 1){
            examgroupStore.methods.getAllCheckingExamgroups(this.period.from,this.period.to,page);
        }
    }
}
</script>

<style scoped>
    .eg-link{
        color: #000;
        font-weight: bold;
        text-decoration: none;
    }
</style>