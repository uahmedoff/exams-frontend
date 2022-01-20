<template>
    <div>
        <h3>Add new question</h3>
        <form @submit.prevent="add">
            <Form />
			<input type="submit" value="Add" class="btn btn-success btn-sm">
			<a href="#" class="btn btn-secondary btn-sm" @click.prevent="$router.go(-1)">Back</a>
		</form>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
const Form = () => import('./Form')
export default {
    components:{
        Form
    },
    computed:{
        ...mapState('question',['validationErrors'])
    },
    methods:{
        ...mapActions('question',['addQuestion']),
        async add(){
            await this.addQuestion();
            if(!this.validationErrors)
                this.$router.push(`/admin-dashboard/level/${this.$route.params.level_id}/type/${this.$route.params.question_type}`);
        } 
    },
    created(){
        this.$store.commit('question/setCurrentQuestionNull'); 
    }
}
</script>
