<template>
  <div class="geral">
    <Header></Header>
    <div class="conteudo">
      <div class="tabs">
        <a v-on:click="activetab = 1" v-bind:class="[activetab === 1 ? 'active' : '']">Exercícios</a>
        <a v-on:click="activetab = 2" v-bind:class="[activetab === 2 ? 'active' : '']">Músculos</a>
        <a v-on:click="activetab = 3" v-bind:class="[activetab === 3 ? 'active' : '']">Equipamentos</a>
        <a v-on:click="activetab = 4" v-bind:class="[activetab === 4 ? 'active' : '']">Categorias</a>
      </div>
      <div class="content">
        <div v-if="activetab === 1" class="tabcontent">
          <div class="conteudo-abas"></div>
        </div>
        <div v-if="activetab === 2" class="tabcontent">
          <div class="conteudo-abas">
            <Musculos></Musculos>
          </div>
        </div>
        <div v-if="activetab === 3" class="tabcontent">
          <div class="conteudo-abas">
            <Equipamentos></Equipamentos>
          </div>
        </div>
        <div v-if="activetab === 4" class="tabcontent">
          <div class="conteudo-abas">
            <Categorias></Categorias>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src test env
import { reactive, ref } from "vue";
import Header from "../../components/Header/index.vue";
import Musculos from "../Exercicios/Musculos.vue";
import Equipamentos from "../Exercicios/Equipamentos.vue";
import Categorias from "../Exercicios/Categorias.vue";
import * as moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    Header,
    Musculos,
    Categorias,
    Equipamentos,
  },
  data() {
    return {
      activetab: 2,
    };
  },
  methods: {

  },
  mounted() {

  },
  created() { },
  setup() {
    const state = reactive({
      testes: "dCasa",
      numero: ref(0),
    });

    return {
      state,
    };
  },
};
</script>
<style scoped>
.box {
  border: 2px solid #eee;
  padding: 5px;
  padding-left: 15px;
  background-color: white;
}

.tags {
  padding: 3px;
  background-color: #eee;
  border-radius: 2px;
  border: 1px solid #bbb;
  margin-right: 2px;
}

.tags span {
  background-color: #ffcdd2;
  font-size: 11px;
  cursor: pointer;
  padding: 2px;
  color: #d32f2f;
  border: 1px solid #ef9a9a;
}

tr {
  cursor: pointer;
}

.add-suppliers {
  margin-top: 10px;
  border: 1px solid #0a285c;
  color: #ffffff;
  background-color: #0a285c;
}

.mb-5,
.my-5 {
  margin-bottom: 0rem !important;
}

.title-modal h2 {
  margin: 5px 0px;
  margin-top: -40px;
}

.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0;
}

.el-table .cell {
  padding-left: 0;
}
.el-select {
  width: 100%;
}
.error-msg {
  background: red;
  border-radius: 4px;
  padding: 0px 0px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-bottom: -1px;
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  color: #484848;
  margin-right: 5px;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #87067d;
  color: #ffffff;
}

/* Style the tab content */
.tabcontent {
  padding: 5px 0;
  width: 100%;
  border: 1px solid #ccc;
  background: white;
}
.main-panel .content {
  padding: 0px 0px;
}
.el-input-number {
  width: 100% !important;
}
.conteudo-abas {
  min-height: 50vh;
}
</style>
