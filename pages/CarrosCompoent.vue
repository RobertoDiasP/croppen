<template>
  <div class="row border justify-content-center">
    <div class="card col-6 col-md-12 ">
      <br />
      <div class="row justify-content-center">
        <div class="card col-6 col-md-8">
          <SearchPesquisaComp :component-title="`Pesquisar Amostras`" :search-fields="searchFields"
            get-action="Car/getCars" />
        </div>
      </div>
      <br />
      <div class="row justify-content-center">
        <div class="card col-6 col-md-8">
          <GridPesquisa :component-title="`Lista de Amostras`" get-action="Car/getCars" :input-fields="inputFields" :fields="fields" :url="url" />
        </div>
        <button @click="checklogin">teste login</button>
      </div>
      <div class="row">
        <PagPagination get-action="Car/getCars" :url="url" :setlist="setlist"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
},
  name: 'CarrosComp',

  middleware :"auth2",

  data() {
    return {
      
      setlist:'amostras',
      url:'/carros',
      searchFields: [
        {
          key: 'id',
          label: 'Pesquise por id',
          required: true,
          type: 'text',
        },
      ],
      inputFields: [
      {
          key: 'id',
          label: 'Id',
          required: true,
          type: 'number',
          disabladed: true
        },
        {
          key: 'externo',
          label: 'Id Externo',
          required: true,
          type: 'text',
        },
        {
          key: 'data',
          label: 'Data',
          required: true,
          type: 'text',
        },
        {
          key: 'cultura',
          label: 'Cultura',
          required: true,
          type: 'text',
        },
        {
          key: 'status',
          label: 'status',
          required: true,
          type: 'text',
        },
      ],
      fields: ['id', 'externo', 'data', 'cultura', 'status', 'editar']
    }
  },

  methods: {
   
      async callHelloFunction() {
      try {
        const result = await this.$parse.Cloud.run('hello');
        console.log(result); // Exibe a resposta da função "hello" no console
      } catch (error) {
        console.error('Erro ao chamar a função:', error);
      }
    },

    async checklogin(){
      const currentUser = await this.$parse.User.current()
        if (currentUser) {
          console.log('Usuário está logado:', await currentUser.getUsername())
        } else {
          console.log('Usuário não está logado', currentUser)
        }
    }
    

  },
  beforeMount() {
   
  },

}
</script>



<style>
.btn-novo {
  display: flex;
  align-items: right;
  justify-content: right;
  flex-direction: row;
}
</style>
