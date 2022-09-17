<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<center><img src="/img/official-logo.png" class="mt-3" style="max-width:100%" alt="asdasd"></center>
				<br>
				<br>
				<br>
				<h3 class="mt-5 mb-3">
					Question paper #{{ generateQuestionStore.state.student.id }}
				</h3>
				<router-link 
					:to="prevRoute.path" 
					class="boBackBtn btn btn-secondary btn-sm float-end"
				>
					Back
				</router-link>

				<!-- {{ generateQuestionStore.state.generated_question }} -->
				
				<br>
				<br>
				<span style="font-size:22px;">
					Full name: _____________________ <br>
					Exam Type: {{ generateQuestionStore.state.generated_question.level }} <br>
					Teacher: {{ generateQuestionStore.state.generated_question.group.teacher }} <br>
					Time: {{ generateQuestionStore.state.generated_question.group.days }} / {{ moment(generateQuestionStore.state.generated_question.group.time,"HH:mm:ss").format("HH:mm") }} <br>
					Group: {{ generateQuestionStore.state.generated_question.group.id }} <br>
				</span>
				<br>
				<br>

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
	import moment from 'moment'
	import {store as generateQuestionStore} from '@/store/modules/generate-questions'
	import {resourceTypes} from '@/constants/config'
	export default{
		data(){
			return {
				resourceTypes,
				generateQuestionStore,
				prevRoute: null,
				moment
			}
		},
		beforeRouteEnter(to, from, next) {
		  next(vm => {
		    vm.prevRoute = from
		  })
		},
		mounted(){
			generateQuestionStore.methods.getGeneratedQuestionSupervisorGroup(this.$route.params.id);
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