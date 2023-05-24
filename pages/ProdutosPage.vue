<template>
    <div class="row border justify-content-center">
      <div class="card col-6 col-md-12 ">
        <br />
        <div class="row justify-content-center">
          <div class="card col-6 col-md-8">
            <SearchPesquisaComp :component-title="`Pesquisar Produto`" :search-fields="searchFields"
              get-action="Car/getCars" />
          </div>
        </div>
        <br />
        <div class="row justify-content-center">
          <div class="card col-6 col-md-8">
            <GridPesquisa :component-title="`Lista de Produtos`" get-action="Products/getProds" :input-fields="inputFields" :fields="fields" :url="url" />
          </div>
        </div>
        <div class="row">
          <PagPagination get-action="Products/getProds" :url="url" :setlist="setlist"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
  },
    name: 'ProdPage',
  
    data() {
      return {
        
      
        setlist:'SET_LIST_PROD',
        url:'/get-list-prod',
        searchFields: [
          {
            key: 'modelo',
            label: 'Pesquise pelo nome do carro',
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
            key: 'modelo',
            label: 'Modelo',
            required: true,
            type: 'text',
          },
          {
            key: 'ano',
            label: 'Ano',
            required: true,
            type: 'text',
          },
          {
            key: 'preco',
            label: 'Preço',
            required: true,
            type: 'number',
          },
        ],
        fields: ['id', 'modelo', 'ano', 'preco', 'editar']
      }
    },
  
    methods: {
  
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
  