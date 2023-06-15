<template>
  <section class="section">
    <div class="container">
      <div class="row justify-content-center mt-5">

        <div class="col-8">
          <div class="card p-5">
            <h2 class="title has-text-centered">Faça seu Login</h2>
            <Notification :message="error" v-if="error" />
            <div >
              <div class="field mt-3">
                <label class="label">Email</label>
                <div class="control">
                  <input type="email" class="form-control" name="email" v-model="email" />
                </div>
              </div>
              <div class="field mt-3">
                <label class="label">Password</label>
                <div class="control">
                  <input type="password" class="form-control" name="password" v-model="password" />
                </div>
              </div>
              <div class="control mt-3">
                <button @click="fazerLogin()" class="btn btn-primary">Log In</button>
                <div v-if="load" class="alert alert-primary" role="alert">
                Carregando
              </div>
              </div>
            </div>
            
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
      error: null,
      load: false
    }
  },

  methods: {
  
    async fazerLogin(username, password) {
    try {
      this.load = true
      const user = await this.$parse.User.logIn(this.email, this.password);
      console.log('Login bem-sucedido:', user.getUsername());
      // Faça alguma ação após o login bem-sucedido, como redirecionar para outra página
      this.$router.push('/AmostrasPage')
      this.load = false
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Trate o erro de login, como exibir uma mensagem de erro para o usuário
    }
}
  }
}

</script>
