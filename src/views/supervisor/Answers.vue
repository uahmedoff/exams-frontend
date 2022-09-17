<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<h3 class="text-center mt-5 mb-3">
					#{{ generateQuestionStore.state.student.id }}
					<input type="text" readonly />
				</h3>
				<router-link 
					:to="prevRoute.path" 
					class="boBackBtn btn btn-secondary btn-sm float-end"
				>
					Back
				</router-link>
				<div style="clear:both"></div>
				
				<h4 class="text-uppercase">Reading questions:</h4>
				<div 
					v-for="question,index in generateQuestionStore.state.questions" :key="'question'+index"
					class="card mt-1 mb-1"
					v-if="question.question.type_id == 2"
				>
					<template>
						<!-- <img 
							src="..." 
							class="card-img-top" 
							alt="..."
						> -->
						<div class="card-body">
							<h4
								v-if="
									question.question.question_plan.qresource
								"
								class="qresource"
							>
								{{ question.question.question_plan.qresource.text }}
							</h4>
							<h5 
								class="card-title question"
							>
								<span v-if="!question.question.qresource">{{ ++index }}.</span> {{ question.question.question }}
							</h5>
							<ul
								class="variants"
							>
								<li 
									v-for="answer,index in question.question.answers" 
									:key="'asnwer'+index"
									:class="{'lightgreen':answer.is_correct}"		
								>	
									{{ answer.answer }}
								</li>
							</ul>
						</div>
					</template>
				</div>
				<h4 class="text-uppercase">Grammar questions:</h4>
				<div 
					v-for="question,index in generateQuestionStore.state.questions" :key="'question'+index"
					class="card mt-1 mb-1"
					v-if="
						question.question.type_id == 3 ||
						question.question.type_id == 4
					"
				>
					<template>
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
								class="qresource"
							>
								{{ question.question.qresource.text }}
							</h4>
							<h5 
								class="card-title question"
							>
								<span v-if="!question.question.qresource">{{ ++index }}.</span> {{ question.question.question }}
							</h5>
							<ul
								class="variants"
							>
								<li 
									v-for="answer,index in question.question.answers" 
									:key="'asnwer'+index"
									:class="{'lightgreen':answer.is_correct}"		
								>	
									{{ answer.answer }}
								</li>
							</ul>
						</div>
					</template>
				</div>
				<h4 class="text-uppercase">Writing question:</h4>
				<div 
					v-for="question,index in generateQuestionStore.state.questions" :key="'question'+index"
					class="card mt-1 mb-1"
					v-if="question.question.type_id == 6"
				>
					<template>
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
								class="qresource"
							>
								{{ question.question.qresource.text }}
							</h4>
							<h5 
								class="card-title question"
							>
								<span v-if="!question.question.qresource">{{ ++index }}.</span> {{ question.question.question }}
							</h5>
							<ul
								class="variants"
							>
								<li 
									v-for="answer,index in question.question.answers" 
									:key="'asnwer'+index"
									:class="{'lightgreen':answer.is_correct}"		
								>	
									{{ answer.answer }}
								</li>
							</ul>
						</div>
					</template>
				</div>
				<h4 class="text-uppercase">Speaking Presentation Topic:</h4>
				<div 
					v-for="question,index in generateQuestionStore.state.questions" :key="'question'+index"
					class="card mt-1 mb-1"
					v-if="question.question.type_id == 5"
				>
					<template>
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
								class="qresource"
							>
								{{ question.question.qresource.text }}
							</h4>
							<h5 
								class="card-title question"
							>
								<span v-if="!question.question.qresource">{{ ++index }}.</span> {{ question.question.question }}
							</h5>
							<ul
								class="variants"
							>
								<li 
									v-for="answer,index in question.question.answers" 
									:key="'asnwer'+index"
									:class="{'lightgreen':answer.is_correct}"		
								>	
									{{ answer.answer }}
								</li>
							</ul>
						</div>
					</template>
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
		background: inherit;
	}

	.qresource, .question{
		font-weight:bold;
	}

	.qresource, .question, .variants{
		font-size:12px;
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