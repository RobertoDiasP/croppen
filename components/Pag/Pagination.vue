<template>
  <div>
    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item">
          <a href="#" class="page-link" @click.prevent="getPag(1)">1</a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link" @click.prevent="getPag(2)">2</a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link" @click.prevent="getPag(3)">3</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'paginate-comp',

  data(){
    return{
      page: 1

    }
  },

  props: {
    getAction: {
      type: String,
    },
    url:{
      type: String
    },
    setlist:{
      type: String
    }
  },
  methods: {

    getPag(page){
        this.page = page
        this.getPerPage()
        

    },

    getPerPage(payload) {
    const config = {
      ...payload,
    }
    config._page = this.page
    config._limit = 10

    this.$axios.get(`${this.url}`, { params: config })
      .then((response) => {
        this.$store.commit(this.setlist, response.data)
        console.log(this.setlist)
    })

  },

  },
}
</script>

<style>

</style>