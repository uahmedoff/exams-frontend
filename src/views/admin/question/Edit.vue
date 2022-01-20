<template>
    <div>
        <h3>Edit question</h3>
        <form @submit.prevent="edit">
            <Form />
			<input type="submit" value="Edit" class="btn btn-success btn-sm">
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
        ...mapActions('question',['getQuestion','updateQuestion']),
        async edit(){
            await this.updateQuestion(this.$route.params.question_id);
            if(!this.validationErrors)
                this.$router.push(`/admin-dashboard/level/${this.$route.params.level_id}/type/${this.$route.params.question_type}`)
        } 
    },
    created(){
        this.getQuestion(this.$route.params.question_id) 
    }
}
</script>
