<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 pt-5">
                <router-link 
                    :to="`/invigilator/checking-examgroup/${$route.params.examgroup_id}`"
                    class="btn btn-secondary btn-sm mb-3"
                >
                    Back
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <audio 
                    v-if="resultStore.state.result.file.split('.').pop() == 'mp3'"
                    controls
                >
                    <source :src="`${apiUrl}/storage/${resultStore.state.result.file}`" type="audio/mpeg">
                    Your browser does not support the audio tag.
                </audio> 
                <center>
                    <img 
                        v-if="
                            resultStore.state.result.file.split('.').pop() == 'jpg' || 
                            resultStore.state.result.file.split('.').pop() == 'png'
                        "
                        :src="`${apiUrl}/storage/${resultStore.state.result.file}`" 
                        class="card-img-top" 
                    >
                </center>

                <b-form @submit.prevent="save">
                    <b-form-group
                        id="input-group-1"
                        label="Score:"
                        label-for="input-1"
                    >
                        <b-form-input
                        id="input-1"
                        v-model="resultStore.state.result.score"
                        type="text"
                        placeholder="Enter score"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Comment:" label-for="input-2">
                        <b-form-textarea
                        id="input-2"
                        v-model="resultStore.state.result.comment"
                        placeholder="Enter comment"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-button type="submit" variant="success" class="mt-2 mb-3">Save</b-button>
                </b-form>    

            </div>
        </div>
    </div>
</template>

<script>
import { store as resultStore } from '@/store/modules/result'
export default {
    data(){
        return {
            resultStore,
            apiUrl: process.env.VUE_APP_API_URL
        }
    },
    mounted(){
        resultStore.methods.getResult(this.$route.params.result_id)
    },
    methods:{
        async save(){
            
            await resultStore.methods.saveResult(this.$route.params.result_id,{
                score: resultStore.state.result.score,
                comment: resultStore.state.result.comment
            });
            this.$router.push(`/invigilator/checking-examgroup/${this.$route.params.examgroup_id}`)
        }
    }
}
</script>