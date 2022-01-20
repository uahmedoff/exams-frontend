<template>
    <div>
        <h3>Edit resource</h3>
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
        ...mapState('resource',['validationErrors'])
    },
    methods:{
        ...mapActions('resource',['getResource','updateResource']),
        async edit(){
            await this.updateResource(this.$route.params.resource_id);
            if(!this.validationErrors)
                this.$router.push(`/admin-dashboard/level/${this.$route.params.level_id}/type/${this.$route.params.question_type}`)
        } 
    },
    created(){
        this.getResource(this.$route.params.resource_id) 
    }
}
</script>
