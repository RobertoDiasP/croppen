<template>
  <div class="row border justify-content-center">
    <div class="card col-6 col-md-12">
      <br />
      <div class="row justify-content-center">
        <div class="card col-8 p-5">
          <div class="d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar Ordens"
            />
            <button class="btn btn-primary">Pesquisar</button>
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
                  <a href="#" class="page-link" @click="paginationFunc(-1)"
                    >Anterior</a
                  >
                </li>
                <li class="page-item">
                  <a href="#" class="page-link" @click="paginationFunc(+1)"
                    >Proxima</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <b-modal ref="meueditCliente" title="Editar">
        <template>
          <div id="meuform">
            {{ id }}
            <div class="form-group">
              <label>Data</label>
              <input
                class="form-control"
                placeholder="Gerado Altomaticamente"
                v-model="razao"
                type="text"
                disabled
              />
            </div>
            <div class="form-group">
              <label>Status</label>
              <b-form-select
                v-model="selectedValue"
                :options="selectOptions"
              ></b-form-select>
            </div>
            <div class="form-group">
              <label>Cliente</label>
              <div class="d-flex">
                <input
                  class="form-control"
                  v-model="campoCliente"
                  type="text"
                />
                <button @click="buscarCliente()">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="20px"
                    height="20px"
                  >
                    <path
                      d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
                    />
                  </svg>
                </button>
              </div>
              <div v-if="errorCliente" class="alert alert-danger" role="alert">
                Cliente não encontrado
              </div>
            </div>
            <div class="form-group">
              <label>Tipo</label>
              <b-form-select
                v-model="selectedValueTipo"
                :options="selectOptionsTipo"
              ></b-form-select>
            </div>
            <div class="form-group">
              <label>Descrição</label>
              <input class="form-control" v-model="desc" type="text" />
            </div>
          </div>
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
  name: 'OrdemPage',

  middleware :"auth2",

  data() {
    return {
      errorCliente: false,
      idcliente: '',
      campoCliente: '',
      selectedValue: 'Recebido', // Valor selecionado pelo usuário
      selectOptions: ['Recebido', 'Processando', 'Encerrado'], // Opções disponíveis para seleção
      selectedValueTipo: '', // Valor selecionado pelo usuário
      selectOptionsTipo: ['Nematologia', 'Fitopatologia', 'outros'], // Opções disponíveis para seleção
      skip: 0,
      id: '',
      data: '',
      status: '',
      tipo: '',
      dataPesquisa: [],
      pagination: 0,
      totalRegistros: 0,
      fields: ['id', 'data', 'status', 'cliente', 'tipo', 'editar'],
    }
  },

  methods: {
    async getData() {
      try {
        const payload = {
          skip: this.skip,
        }
        const result = await this.$parse.Cloud.run('getOrdem', payload)
        this.dataPesquisa = result.ordem
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
          status: this.selectedValue,
          idcliente: this.idcliente,
          tipo: this.selectedValueTipo,
          desc: this.desc,
        }
        await this.$parse.Cloud.run('alter-Ordem', payload).then((result) => {
          this.$refs.meueditCliente.hide()
        })
        this.getData()
      } else {
        console.log('falhou')
        const payload = {
          status: this.selectedValue,
          idcliente: this.idcliente,
          tipo: this.selectedValueTipo,
          desc: this.desc,
        }
        await this.$parse.Cloud.run('creat-Ordem', payload).then((result) => {
          this.$refs.meueditCliente.hide()
        })
        this.getData()

        console.log(id1)
      }
    },
    async novo() {
      await this.limparCampos()

      this.$refs.meueditCliente.show()
    },

    paginationFunc(pag) {
      this.skip = this.skip + pag
      this.getData()
    },

    limparCampos() {
      this.id = ''
      this.selectedValue = ''
      this.idcliente = ''
      this.selectedValueTipo = ''
      this.desc = ''
    },

    async buscarCliente() {
      this.errorCliente = false
      const payload = {
        razao: this.campoCliente,
      }

      try {
        await this.$parse.Cloud.run('filterCliente', payload).then((result) => {
          this.idcliente = result.cliente[0].id
          this.campoCliente = result.cliente[0].razao
          console.log(this.idcliente, this.campoCliente)
        })
      } catch (error) {
        this.errorCliente = true
        console.error('Ocorreu um erro ao buscar o cliente:', error)
      }
    },
    async editarRegistro(id) {
      this.$refs.meueditCliente.show()

      const payload = {
        orderId: id,
      }
      await this.$parse.Cloud.run('Ordem-id', payload).then((result) => {
        this.id = result.id
        this.selectedValue = result.status
        this.campoCliente = result.cliente
        this.selectedValueTipo = result.tipo
        this.desc = result.desc
        this.idcliente = result.idcliente
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
    