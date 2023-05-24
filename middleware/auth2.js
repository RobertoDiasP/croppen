export default function ({ app, redirect }) {
    if (!app.$parse.User.current()) {
      // Usuário não está logado, redirecionar para a página de login
      return redirect('/login')
    }
  }