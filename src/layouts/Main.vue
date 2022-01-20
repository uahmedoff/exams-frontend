<template>
    <div>
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#" v-b-toggle.sidebar-no-header>Menu</a>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                <a class="nav-link" href="#" @click.prevent="logout">Sign out</a>
                </li>
            </ul>
        </nav>

        <div class="container-fluid">
            <div class="row">
                <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
                    <template #default="{ hide }">
                        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light">
                            <a href="#" style="color:black;text-decoration:none" class="d-flex justify-content-end" @click="hide">x</a>
                            <span class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                                <span class="fs-4">Menu</span>
                            </span>
                            <hr>
                            <ul class="nav nav-pills flex-column mb-auto">
                                <li class="nav-item">
                                    <router-link 
                                        class="nav-link link-dark" 
                                        to="/admin-dashboard"
                                        exact 
                                        @click="hide"
                                    >
                                        Dashboard
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link 
                                        v-if="isAdmin"
                                        class="nav-link link-dark" 
                                        to="profile" 
                                        @click="hide"
                                    >
                                        Profile
                                    </router-link>
                                </li>
                            </ul>
                            <hr>
                        </div>
                    </template>
                </b-sidebar>
                
                <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    mounted(){
        this.dashboardCss = document.createElement('link')
        this.dashboardCss.setAttribute('href', 'https://getbootstrap.com/docs/5.1/examples/dashboard/dashboard.css')
        this.dashboardCss.setAttribute('rel','stylesheet')
        document.head.appendChild(this.dashboardCss);

        this.jQueryJs = document.createElement('script')
        this.jQueryJs.setAttribute('src', 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js')
        this.jQueryJs.setAttribute('integrity', 'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj')
        this.jQueryJs.setAttribute('crossorigin', 'anonymous')
        document.body.appendChild(this.jQueryJs);
    },
    destroyed(){
        document.head.removeChild(this.dashboardCss);
        document.body.removeChild(this.jQueryJs);
    },
    computed:{
        ...mapGetters('auth',['isAdmin'])
    },
    methods:{
        ...mapActions('auth',['logout'])
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
    // @import '../styles/dashboard.css';
</style>