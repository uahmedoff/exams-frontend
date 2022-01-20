<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'auth',
    data(){
        return {
            dashboardCss: ''
        }
    },
    mounted(){
        this.loginCss = document.createElement('link')
        this.loginCss.setAttribute('href', 'https://getbootstrap.com/docs/5.1/examples/sign-in/signin.css')
        this.loginCss.setAttribute('rel','stylesheet')
        document.head.appendChild(this.loginCss);
        document.body.classList.add('text-center')
    },
    destroyed(){
        document.head.removeChild(this.loginCss);
        document.body.classList.remove('text-center')
    }
}
</script>

<style lang="scss" scoped>
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    // @import '../styles/signin.css';
</style>