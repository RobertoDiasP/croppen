<template>
  <div class="row border justify-content-center">
    <div class="card col-md-12">
      <br />
      <div class="row justify-content-center">
        <div class="col-8 d-flex card ">
          <h1 style="font-size: 2rem;">Amostras</h1>
          <div class="row d-flex p-3">
            <div class=" col-4 p-1 ">
                <div class="d-flex">
                  <input type="text" class="form-control" placeholder="Buscar por Amostras">
                 
                </div>
            </div> 
            <div class=" col-4 p-1 ">
                <div class="d-flex">
                  <input type="text" class="form-control" placeholder="Buscar por Ordem">
                 
                </div>
            </div> 
            <div class=" col-4 p-1 ">
                <div class="d-flex">
                  <input type="text" class="form-control" placeholder="Buscar por Lote">
                 
                </div>
            </div>  
            <div class=" col-4 p-1 pt-3">
                <div class="form-group">
                  <label >Inicio</label>
                  <input type="date" class="form-control" placeholder="Buscar Amostras">
                 
                </div>
            </div> 
            <div class=" col-4 p-1 pt-3">
                <div class="form-group">
                  <label >Fim</label>
                  <input type="date" class="form-control" placeholder="Buscar Amostras">
                </div>
            </div> 
            <div class=" col-12 p-1">
                <div>
                  <button class="btn btn-primary">Pesquisar</button>
                </div>
            </div> 
          </div>
        </div>
      </div>
      <br />
      <div class="row justify-content-center">
        <div class="card col-6 col-md-8">
          <br />
          <div class="">
            <button type="button" class="btn btn-primary" @click="novo()">
              Adicionar Registros
            </button>
          </div>
          <br />
          <template>
            <h6>Numero de Registros: {{ totalRegistros }}</h6>
            <div>
              <b-table
                striped
                hover
                responsive
                :items="dataPesquisa"
                :fields="fields"
              >
                <template #cell(editar)="row">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="editarRegistro(row.item.id)"
                  >
                    Editar
                  </button>
                </template>
                <template #cell(data)="row">
                  {{ new Date(row.value).toLocaleDateString('pt-BR') }}
                </template>
              </b-table>
            </div>
          </template>
          <div>
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item">
                  <a href="#" class="page-link" @click="paginationFunc(-1)">Anterior</a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link" @click="paginationFunc(+1)">Proxima</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <b-modal ref="meuedit" title="Editar">
        <template>
          <form id="meuform">
            <div class="form-group">
              <label>Id Ordem</label>
              <input class="form-control" v-model="idOrdem" type="text" />
            </div>
            <div class="form-group">
              <label>Id Externo</label>
              <input class="form-control" v-model="externo" type="text" />
            </div>
            <div class="form-group">
              <label>Data</label>
              <input class="form-control" v-model="data" type="text" disabled />
            </div>
            <div class="form-group">
              <label>Cultura</label>
              <input class="form-control" v-model="cultura" type="text" />
            </div>
            <div class="form-group">
              <label>Lote</label>
              <input class="form-control" v-model="lote" type="text" />
            </div>
            <div class="form-group">
              <label>Status</label>
              <input class="form-control" v-model="status" type="text" />
            </div>
          </form>
        </template>
        <template v-slot:modal-footer="{ hide }">
          <button type="button" class="btn btn-danger" @click="hide()">
            Fechar
          </button>
          <div>
            <button
              type="submit"
              @click="salvarDados(id)"
              class="btn btn-success"
            >
              salvar
            </button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>
        
  
  <script>
export default {
  components: {},
  name: 'AmostrasComp',
  layout:'default',
  middleware :"auth2",

  data() {
    return {
      skip: 0,
      id: '',
      idOrdem: '',
      externo: '',
      data: '',
      cultura: '',
      status: '',
      lote: '',
      dataPesquisa: [],
      pagination: 0,
      totalRegistros: 0,
      fields: ['id', 'externo', 'data', 'cultura', 'status', 'lote', 'idOrdem', 'editar'],
    }
  },

  methods: {
    async getData() {
      try {
        const payload ={
          "skip": this.skip
        }
        const result = await this.$parse.Cloud.run('getAmostra', payload)
        this.dataPesquisa = result.amostras
        this.totalRegistros = result.count
        this.pagination = Math.ceil(result.count / 10)
      
      } catch (error) {
        console.error('Erro ao chamar a função:', error)
      }
    },

    async salvarDados(id1) {
      console.log(id1)
      if (id1) {
        const payload = {
          id: id1,
          externo: this.externo,
          data: this.data,
          cultura: this.cultura,
          status: this.status,
          lote: this.lote,
          idOrdem: this.idOrdem
          
        }
        await this.$parse.Cloud.run('alter-amostra', payload).then((result) => {
          this.$refs.meuedit.hide()
        })
        this.getData()
      } else {
        const payload = {
          externo: this.externo,
          cultura: this.cultura,
          status: this.status,
          lote: this.lote,
          idOrdem: this.idOrdem
        }
        await this.$parse.Cloud.run('creat-Amostra', payload).then((result) => {
          this.$refs.meuedit.hide()
        })
        this.getData()

        console.log(id1)
      }
    },
    async novo() {
      await this.limparCampos()

      this.$refs.meuedit.show()
    },

    paginationFunc(pag){
      this.skip = this.skip + pag
      this.getData()
    },

    limparCampos() {
      this.id = ''
      this.externo = ''
      this.data = ''
      this.cultura = ''
      this.status = ''
      this.lote = ''
      this.idOrdem =''
    },

    async editarRegistro(id) {
      this.$refs.meuedit.show()

      const payload = {
        amostraId: id,
      }

      await this.$parse.Cloud.run('amostra-id', payload).then((result) => {
        this.id = result.id
        this.externo = result.externo
        this.data = result.data
        this.cultura = result.cultura
        this.status = result.status
        this.lote = result.lote
        this.idOrdem = result.idOrdem
      })
    },
  },

  beforeMount() {
    this.getData()
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
  