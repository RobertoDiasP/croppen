<template>
  <div>
    <b-navbar class="nav-bar" toggleable="xl" type="dark" variant="info">
      <b-navbar-brand to="/"><img src="https://static.wixstatic.com/media/3d96ac_286b08d675f64d44afa6c202412d7155~mv2.png/v1/crop/x_0,y_188,w_500,h_137/fill/w_296,h_81,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8.png
        "></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse2"></b-navbar-toggle>
      <b-navbar-toggle target="nav-collapse"> <b-avatar></b-avatar></b-navbar-toggle>
  

      <b-collapse id="nav-collapse2" is-nav>
        <b-navbar-nav class="ml-5">
          <!-- <div class="collapse navbar-collapse" id="collapsibleNavId"> -->
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item ">
                <a class="nav-link nav-link-bar" href="/AmostrasPage">Amostras </a>
              </li>
              <li class="nav-item ">
                <a class="nav-link nav-link-bar" href="/ClientePage">Clientes</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link nav-link-bar" href="/OrdemPage">Ordem de Serviço</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link nav-link-bar" href="/FinanPage">Orçamentos</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link nav-link-bar" href="/FinanPage">Relatórios</a>
              </li>
            </ul>
          <!-- </div> -->
        </b-navbar-nav>  
      </b-collapse>
     
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="isAuthenticated">
          <!-- <b-nav-item href="#">Link</b-nav-item> -->
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ loggedInUser.name }}</em>
            </template>
            <li>
              <nuxt-link class="dropdown-item" to="/profile">Profile</nuxt-link>
            </li>
            <li>
              <a @click="logout" class="dropdown-item" href="#">Log out</a>
            </li>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/register">Register</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login">Log In</nuxt-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: "Navbar-d",
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    methods: {
      async logout() {
        await this.$auth.logout();
      },
    },
  }

</script>

<style>
  .nav-bar{
    background-color: #D5D1B2 !important;
    
  }
  .nav-link-bar{
    color:black !important;
    font-weight:400;
    font-size: 1.2rem;
  }

  .nav-link-bar:hover{
    color: white !important;
  }



</style>