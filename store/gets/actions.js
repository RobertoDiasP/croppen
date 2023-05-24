export default {

    getCars(){
         return this.$axios.$get('/listcar')
    },

    getClientes(){
         return this.$axios.$get('/clientes')
    },

    getOrdem(){
         return this.$axios.$get('/ordemvenda')
    },

}