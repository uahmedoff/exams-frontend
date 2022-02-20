<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h3 class="mt-5">Checking exams <span class="badge bg-secondary">{{examgroupStore.getters.numberOfCheckingExamGroups.value}}</span></h3>
                <b-skeleton-table
                    v-if="examgroupStore.state.isLoading"
                    :rows="5"
                    :columns="3"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
                <table 
                    v-else-if="examgroupStore.state.checkingexamgroups.length"
                    class="table table-bordered table-condensed table-hover"
                >
                    <thead>
                        <tr>
                            <th>Exams</th>
                            <th>Deadline</th>
                            <th>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="eg,index in examgroupStore.state.checkingexamgroups" :key="index">
                            <td>
                                Exam <span class="badge rounded-pill bg-secondary">{{ eg.number_of_students }}</span>
                            </td>
                            <td>
                                {{ 
                                    moment(eg.deadline).diff(moment(),'hours') > 0 
                                    ? moment(eg.deadline).diff(moment(),'hours') + ' hours left'
                                    : 'Deadline is up'
                                }}
                            </td>
                            <td>
                                <router-link 
                                    :to="`/invigilator/checking-examgroup/${eg.id}`"
                                    class="btn btn-success btn-sm"
                                >
                                    <b-icon icon="check"></b-icon>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {store as examgroupStore} from '@/store/modules/examgroup'
import moment from 'moment'
export default {
    data(){
        return {
            examgroupStore,
            moment
        }
    },
    mounted(){  
        examgroupStore.methods.getCheckingExamgroups(); 
    }
}
</script>