<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Welcome back!</h2>
          <Notification :message="error" v-if="error" />
          <div >
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input type="email" class="input" name="email" v-model="email" />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input type="password" class="input" name="password" v-model="password" />
              </div>
            </div>
            <div class="control">
              <button @click="fazerLogin()" class="button is-dark is-fullwidth">Log In</button>
            </div>
          </div>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  // middleware: 'guest',
  name: "login-page",
  components: {
    Notification,
  },

  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
  
    async fazerLogin(username, password) {
    try {
      const user = await this.$parse.User.logIn(this.email, this.password);
      console.log('Login bem-sucedido:', user.getUsername());
      // Faça alguma ação após o login bem-sucedido, como redirecionar para outra página
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Trate o erro de login, como exibir uma mensagem de erro para o usuário
    }
}
  }
}

</script>
