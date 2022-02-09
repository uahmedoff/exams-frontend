<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 pt-5">
                
                <h3>{{level.name}} - {{ capitalized(questionType.name) }}</h3>
                <router-link class="btn btn-secondary btn-sm mb-2" :to="`/admin-dashboard`">Back</router-link> &nbsp;
                <b-skeleton-table
                    v-if="isLoading"
                    :rows="5"
                    :columns="4"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
                <table v-else class="table table-bordered table-condensed">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                    <tr v-for="folder,index in folders" :key="index">
                        <td>{{++index}}</td>
                        <td>
                            <router-link 
                                :to="'/admin-dashboard/level/'+$route.params.level_id+'/type/'+$route.params.question_type+'/folder/'+folder.id"
                            >
                                {{folder.name}}
                            </router-link>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input v-model="folder_name" @keypress.enter="addFolder" placeholder="Type folder name...">
                            <button type="button" class="btn btn-success bg-success" @click.prevent="addFolder">Add</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import StringMix from "@/mixins/String"
import api from '@/api/axios'
export default {
    mixins:[StringMix],
    data(){
        return {
            isLoading: false,
            folders: [],
            folder_name: ''
        }
    },
    mounted(){
        this.getLevel(this.$route.params.level_id);
        this.getQuestionType(this.$route.params.question_type);
        this.getFolders();
    },
    computed:{
        ...mapState('level',['level']),
        ...mapState('questionType',['questionType']),
    },
    methods:{
        ...mapActions('level',['getLevel']),
        ...mapActions('questionType',['getQuestionType']),
        async getFolders(){
            this.isLoading = true;
            this.folders = (await api.get(`folder`,{
                params:{
                    level_id: this.$route.params.level_id,
                    question_type_id: this.$route.params.question_type,
                }
            })).data.data;
            this.isLoading = false;
        },
        async addFolder(){
            await api.post(`folder`,{
                name: this.folder_name,
                level_id: this.$route.params.level_id,
                question_type_id: this.$route.params.question_type,
            });
            this.getFolders();
        }
    }
}
</script>