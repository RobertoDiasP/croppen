<template>
  <div class="">
    <h4>{{ componentTitle }}</h4>
    <div class="btn-novo">
      <button type="button" class="btn btn-primary" @click="novoRegistro()">
        Adicionar Registros
      </button>
    </div>
    <div class="divTable">
      <b-table striped hover responsive :items="dataPesquisa" :fields="fields">
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
    <b-modal ref="meuedit" title="Editar">
      <template>
        <CrudFormComponent
          :input-fields="inputFields"
          :get-action="getAction"
          :url="url"
          :registro-id="dataId"
        />
      </template>
      <template v-slot:modal-footer="{ hide }">
        <button type="button" class="btn btn-danger" @click="hide()">
          Fechar
        </button>
        <div>
          <button
            type="submit"
            @click="salvarDados(dataId)"
            class="btn btn-success"
          >
            salvar
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import barramento from '../barramento'

export default {
  name: 'GridPesquisa',

  props: {
    componentTitle: {
      type: String,
      default: 'Lista',
    },
    label: {
      type: Array,
      default: () => [],
    },
    getAction: {
      type: String,
    },
    fields: {
      type: Array,
      default: () => [],
    },
    inputFields: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
    },
  },

  data() {
    return {
      form: {},
      dataPesquisa: [],
      dataId: null,
      clearForm: {},
    }
  },

  computed: {
    ...mapState({
      cli: (state) => state.Cliente.cli,
      cars: (state) => state.Car.cars,
      ord: (state) => state.Ordem.ord,
    }),
  },

  watch: {
    cars(newV, oldV) {
      this.dataPesquisa = newV
    },
    cli(newV, oldV) {
      this.dataPesquisa = newV
    },
    ord(newV, oldV) {
      this.dataPesquisa = newV
    },
  },

  created() {
    this.$root.$on('refreshGrid', (r) => {
      console.log(r)
      this.getData()
    })
  },

  methods: {
    async getData() {
      try {
        const result = await this.$parse.Cloud.run('getAmostra');
        this.dataPesquisa = result
        console.log(result); // Exibe a resposta da função "hello" no console
      } catch (error) {

        console.error('Erro ao chamar a função:', error);
      }
    },

    editarRegistro(id) {
      this.$refs.meuedit.show()
      this.dataId = id
    },

    novoRegistro() {
      this.$refs.meuedit.show()
      this.dataId = null
    },

    carregamento() {
      this.getData()
    },

    filtermoney(valor) {
      return `R$ ${parseFloat(valor).toFixed(2)}`.replace('.', ',')
    },

    salvarDados(dataId) {
      console.log(this.dataPesquisa, dataId)
      const payload = this.dataPesquisa
      // if(dataId){

      // }else{

      //    this.dataPesquisa
        
      this.$parse.Cloud.run('creat-product', payload).then(async (result) => {
        await console.log(result)
      // //     // this.name = null,
      // //     // this.desc = ''
      // //     // this.price = ''
      // //     // this.disp = ''
      // //     // this.photo = ''

          

        })
      // }
    
    },
  },

  beforeMount() {
    this.carregamento()
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
