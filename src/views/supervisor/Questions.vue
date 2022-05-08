<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h3 class="text-center mt-5 mb-3">
					{{ generateQuestionStore.state.student.student }}
				</h3>
				<router-link 
					:to="prevRoute.path" 
					class="boBackBtn btn btn-secondary btn-sm float-end"
				>
					Back
				</router-link>
				<div style="clear:both"></div>
				<div 
					v-for="question,index in generateQuestionStore.state.questions" :key="'question'+index"
					class="card mt-3 mb-3"
				>
				  <!-- <img 
				  	src="..." 
				  	class="card-img-top" 
				  	alt="..."
				  > -->
				  <div class="card-body">
				  	<h4
				  		v-if="
				  		question.question.qresource && 
				  		question.question.qresource.type_id == resourceTypes.Text
				  		"
				  	>
				  		{{ question.question.qresource.text }}
				  	</h4>
				    <h5 class="card-title">{{ ++index }}. {{ question.question.question }}</h5>
				    <ol
				    	type="A"
				    >
						<li 
							v-for="answer,index in question.question.answers" 
							:key="'asnwer'+index"
							:class="{'lightgreen':answer.is_correct}"		
						>	
							{{ answer.answer }}
						</li>
					</ol>
				  </div>
				</div>
			</div>		
		</div>
	</div>
</template>

<script>
	import {store as generateQuestionStore} from '@/store/modules/generate-questions'
	import {resourceTypes} from '@/constants/config'
	export default{
		data(){
			return {
				resourceTypes,
				generateQuestionStore,
				prevRoute: null
			}
		},
		beforeRouteEnter(to, from, next) {
		  next(vm => {
		    vm.prevRoute = from
		  })
		},
		mounted(){
	        generateQuestionStore.methods.getStudent(this.$route.params.id);
	        generateQuestionStore.methods.getStudentQuestions(this.$route.params.id);
	    },
	}
</script> 

<style scoped>
	.lightgreen{
		background: lightgreen;
	}

	@media print{
		.lightgreen{
			background: #fff!important;
		}		
		.boBackBtn{
			display:none!important;
		}
	}
</style>