<template>
    <main class="form-signin">
        <form @submit.prevent="signin">
            <img class="mb-4" src="../assets/logo.svg" alt="" height="100">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input 
                    type="text" 
                    class="form-control"
                    id="phone" 
                    v-model="credentials.phone"
                >
                <label for="phone">Phone number</label>
                <small 
                    v-if="validationErrors && validationErrors.phone"
                    class="form-text text-danger" 
                >
                    {{ validationErrors.phone[0] }}
                </small>

            </div>
            <div class="form-floating">
                <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    v-model="credentials.password"
                >
                <label for="password">Password</label>
                <small 
                    v-if="validationErrors && validationErrors.password"
                    class="form-text text-danger" 
                >
                    {{ validationErrors.password[0] }}
                </small>

            </div>

            <!-- <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div> -->
            <button 
                v-if="isSubmitting" 
                class="w-100 btn btn-lg btn-success disabled"
            >
                <b-spinner variant="light"></b-spinner>
            </button>
            <button 
                v-else
                class="w-100 btn btn-lg btn-success" 
                type="submit"
            >
                Sign in
            </button>
            <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
        </form>
    </main>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return{
            credentials:{
                phone: '',
                password: ''
            },
            signInCss: '',
        }
    },
    computed:{
        ...mapState('auth',['isSubmitting','validationErrors']),
        ...mapGetters('auth',['currentUser'])
    },
    methods:{
        ...mapActions('auth',['login']),
        async signin(){
            await this.login(this.credentials);
            this.$router.push('/');
        }
    },
    created(){
    },
}
</script>