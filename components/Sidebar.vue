<template>
  <div class="side-lateral">
    <div class="row card p-2 mt-1">
      <h2>Maquinas</h2>
      <div class="row ml-2">
        <div class="col">
          <div>
            <span @click="hideMod = !hideMod" >Modelos</span>
            <div class="hideBtn" :class="{hide1: hideMod}">
              <li class="ml-2 mt-1">Torno</li>
              <li class="ml-2 mt-1">Freza</li>
              <li class="ml-2 mt-1">Furadeira</li>
              <li class="ml-2 mt-1">Plaina</li>
            </div>
          </div>
          <div class="mt-2">
            <span  class="" @click="hideMar = !hideMar" >Marcas</span>
            <div class="hideBtn" :class="{hide1: hideMar}">
              <li class="ml-2 mt-1">Nardini</li>
              <li class="ml-2 mt-1">Marcon</li>
              <li class="ml-2 mt-1">Black Jack</li>
              <li class="ml-2 mt-1">MetalSul</li>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row card p-2 mt-1">
      <h2>Peças</h2>
      <div class="col">
          <div>
            <span @click="hidePMod = !hidePMod" >Modelos</span>
            <div class="hideBtn" :class="{hide1: hidePMod}">
              <li class="ml-2 mt-1">Torno</li>
              <li class="ml-2 mt-1">Freza</li>
              <li class="ml-2 mt-1">Furadeira</li>
              <li class="ml-2 mt-1">Plaina</li>
            </div>
          </div>
          <div class="mt-2">
            <span  class="" @click="hidePMar = !hidePMar" >Marcas</span>
            <div class="hideBtn" :class="{hide1: hidePMar}">
              <li class="ml-2 mt-1">Nardini</li>
              <li class="ml-2 mt-1">Marcon</li>
              <li class="ml-2 mt-1">Black Jack</li>
              <li class="ml-2 mt-1">MetalSul</li>
            </div>
          </div>
        </div>
    </div>
    <div class="row card p-2 mt-1">
      <h2>Marcas</h2>
      <div class="col">
          <div>
            <span @click="hideMMod = !hideMMod" >Modelos</span>
            <div class="hideBtn" :class="{hide1: hideMMod}">
              <li class="ml-2 mt-1">Torno</li>
              <li class="ml-2 mt-1">Freza</li>
              <li class="ml-2 mt-1">Furadeira</li>
              <li class="ml-2 mt-1">Plaina</li>
            </div>
          </div>
          <div class="mt-2">
            <span  class="" @click="hideMMar = !hideMMar" >Marcas</span>
            <div class="hideBtn" :class="{hide1: hideMMar}">
              <li class="ml-2 mt-1">Nardini</li>
              <li class="ml-2 mt-1">Marcon</li>
              <li class="ml-2 mt-1">Black Jack</li>
              <li class="ml-2 mt-1">MetalSul</li>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return{
      hideMod: false,
      hideMar: false,
      hidePMod: false,
      hidePMar: false,
      hideMMod: false,
      hideMMar: false,

    }
  },

  methods: {


  },
}
</script>

<style lang="scss">
.side-lateral {
  background-color: white;
  height: 100%;
  width: 15%;
  position: absolute;
  padding: 35px;
  margin-top: 30px;
  overflow: auto;
}

@media only screen and (max-width: 1025px) {
  .side-lateral {
    background-color: white;
    height: 80%;
    width: 20%;
    position: absolute;
    border: solid 1px;
    padding: 35px;
    z-index: 10;
  }
}
@media only screen and (max-width: 769px) {
  .side-lateral {
    background-color: rgb(217, 255, 0);
    height: 100%;
    width: 15%;
    position: absolute;
  }
}
@media only screen and (max-width: 360px) {
  .side-lateral {
    background-color: rgb(56, 48, 48);
    height: 100%;
    width: 25%;
    position: absolute;
    margin-left: 5px;
  }
}

h2 {
  color: black;
  font-family: helvetica;
  font-size: large;
  font-weight: bolder;
}
li {
  list-style-type: none;
}

.hide1{
  display: none;

}
span{
  font-weight: bold;
}


</style>