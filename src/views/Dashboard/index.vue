<template>
  <div class="geral">
    <Header></Header>
    <div class="conteudo">Dashboard</div>
  </div>
</template>

<script>
// @ is an alias to /src test env
import { reactive, ref } from "vue";
import Header from "../../components/Header/index.vue";
import * as moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      Carousel: "",
      token: false,
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
