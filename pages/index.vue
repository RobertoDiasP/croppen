<template>
  <section class="section">
    
    <div class="container">
      <div class="row">
        
        <div class="col-3">
        </div>
        

      </div>
    </div>
  </section>
</template>

<script>

import Sidebar from '../components/Sidebar.vue'
import VitrineComponent from '../components/Vitrine/VitrineComponent.vue'
export default {
  components: { Sidebar, VitrineComponent },
  name: 'IndexPage',
}
</script>

<style>
  .container{
    width: 900px;
    height: 860px;
    background: white;
    padding: 10px ;
  }
</style>
