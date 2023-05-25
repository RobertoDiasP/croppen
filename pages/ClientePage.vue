<template>
    <div class="row border justify-content-center">
      <div class="card col-6 col-md-12">
        <br />
        <div class="row justify-content-center ">
          <div class="col-8 d-flex card ">
            <h1 style="font-size: 2rem;">Clientes</h1>
          <div class="row d-flex p-3">
            <div class=" col-4 p-1 ">
                <div class="d-flex">
                  <input type="text" class="form-control" placeholder="Buscar por Razao">
                 
                </div>
            </div> 
            <div class=" col-4 p-1 ">
                <div class="d-flex">
                  <input type="text" class="form-control" placeholder="Buscar por CNPJ">
                 
                </div>
            </div> 
            <div class=" col-4 p-1">
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
        <b-modal ref="meueditCliente" title="Editar">
          <template>
            <form id="meuform">
              <div class="form-group">
                <label>Razão Social</label>
                <input class="form-control" v-model="razao" type="text" />
              </div>
              <div class="form-group">
                <label>CNPJ</label>
                <input class="form-control" v-model="cnpj" type="text" />
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <input class="form-control" v-model="cidade" type="text" />
              </div>
              <div class="form-group">
                <label>Bairro</label>
                <input class="form-control" v-model="bairro" type="text" />
              </div>
              <div class="form-group">
                <label>Estado</label>
                <input class="form-control" v-model="estado" type="text" />
              </div>
              <div class="form-group">
                <label>CEP</label>
                <input class="form-control" v-model="CEP" type="text" />
              </div>
              <div class="form-group">
                <label>Rua</label>
                <input class="form-control" v-model="rua" type="text" />
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input class="form-control" v-model="telefone" type="text" />
              </div>
              <div class="form-group">
                <label>Descrição</label>
                <input class="form-control" v-model="desc" type="text" />
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
                salvars
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
    name: 'ClientePage',
  
    middleware :"auth2",
  
    data() {
      return {
        skip: 0,
        id: '',
        razao: '',
        cnpj: '',
        cidade: '',
        telefone: '',
        rua: '',
        bairro:'',
        estado:'',
        CEP:'',
        desc:'',
        dataPesquisa: [],
        pagination: 0,
        totalRegistros: 0,
        fields: ['id', 'razao', 'cnpj', 'cidade', 'telefone', 'editar'],
      }
    },
  
    methods: {
      async getData() {
        try {
          const payload ={
            "skip": this.skip
          }
          const result = await this.$parse.Cloud.run('getCliente', payload)
          this.dataPesquisa = result.clientes
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
            razao: this.razao,
            cnpj: this.cnpj,
            cidade: this.cidade,
            telefone:  this.telefone,
            rua: this.rua,
            bairro: this.bairro,
            estado: this.estado,
            CEP: this.CEP,
            desc: this.desc
          }
          await this.$parse.Cloud.run('alter-Cliente', payload).then((result) => {
            this.$refs.meueditCliente.hide()
          })
          this.getData()
        } else {
            console.log('falhou')
          const payload = {
            razao: this.razao,
            cnpj: this.cnpj,
            cidade: this.cidade,
            telefone:  this.telefone,
            rua: this.rua,
            bairro: this.bairro,
            estado: this.estado,
            CEP: this.CEP,
            desc: this.desc
          }
          await this.$parse.Cloud.run('creat-Cliente', payload).then((result) => {
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
  
      paginationFunc(pag){
        this.skip = this.skip + pag
        this.getData()
      },
  
      limparCampos() {
        this.id = ''
          this.razao = ''
          this.cnpj = ''
          this.cidade = ''
          this.telefone = ''
          this.rua = ''
          this.bairro = ''
          this.estado = ''
          this.CEP = ''
          this.desc = ''
      },
  
      async editarRegistro(id) {
        this.$refs.meueditCliente.show()
  
        const payload = {
          clienteId: id,
        }
  
        await this.$parse.Cloud.run('cliente-id', payload).then((result) => {
          this.id = result.id
          this.razao = result.razao
          this.cnpj = result.cnpj
          this.cidade = result.cidade
          this.telefone = result.telefone
          this.rua = result.rua
          this.bairro = result.bairro
          this.estado = result.estado
          this.CEP = result.CEP
          this.desc = result.desc

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
    