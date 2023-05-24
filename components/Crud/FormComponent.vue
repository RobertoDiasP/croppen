<template>

    
      <!-- <div >carregando</div> -->
      <form  id="meuform">
        <div
          class="form-group"
          v-for="(field, keyElement) in inputFields"
          :key="keyElement"
        >
          <label>{{ field.label }}</label>
          <input
            class="form-control"
            v-model="form[field.key]"
            :type="field.type"
            :disabled="field.disabladed"
          />
        </div>
      </form>
    

</template>

<script>
export default {
  name: 'FormComponent',
  props: {
    inputFields: {
      type: Array,
      default: () => [],
    },
    getAction: {
      type: String,
    },
    url: {
      type: String,
    },
    registroId: {},
  },

  data() {
    return {
      form: {},
      loaded: false,
      dataPesquisa: ['teste']    
    }
  },
  

  created() {
    this.getProdut()
    
    this.$root.$on('salvarAlt', (e) => {
      console.log('funcionou', e)
      if (e > 0) {
        this.putData()
        console.log('1')
      } else {
        this.postData()
        console.log('0')
      }
    })

    this.$root.$on('clearForm', (clearForm) => {
      console.log(clearForm, 'form clear', this.form)
    })
  },

  methods: {

     init() {
      if (this.registroId) {
        const data = this.dataPesquisa
        console.log(this.dataPesquisa)
        const keys = this.getFields()

        Object.keys(data).forEach((x) => {
          if (keys.includes(x)) {
            this.form[x] = data[x]
            console.log(data[x])
          }
        })
        this.loaded = true
        console.log('dentro do if', this.registroId)
      }
      this.loaded = true
    },


    async getProdut(){
      const payload = {
        "amostraId": this.registroId
      } 

      await this.$parse.Cloud.run('amostra-id', payload).then( (result) => {
          this.dataPesquisa = result

        })
      this.init()
      
    },

    getFields() {
      return this.inputFields.map((x) => x.key)
    },

    async putData() {
      await this.$axios.put(`${this.url}`, this.form)
      this.$root.$emit('refreshGrid', this.form)
    },

    async postData() {
      await this.$axios.post(`${this.url}`, this.form)
      this.$root.$emit('refreshGrid', this.form)
    },
  },
}
</script>

<style>

</style>
