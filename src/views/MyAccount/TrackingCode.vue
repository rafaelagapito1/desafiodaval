<template>
  <Header></Header>
  <div class="block block-banner">
    <div class="container" v-loading="load">
      <div class="row">
        <div class="ResultTrack text-center col-md-12" >
          <h5><b>Código de Rastreio:</b><br />{{ TrackingCode }}</h5>
          <div class="erro item" v-if="status">
            {{msg}}
          </div>
          <div class="result" v-else>
            <div class="item" v-for="item in result" :key="item.location">
              <div>
                <div>
                  {{ item.location }}
                </div>
                <div>
                  {{ item.msg }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-banner / end -->
  <Footer></Footer>
</template>


<script>
// @ is an alias to /src
import { reactive, ref } from "vue";

import Header from "../../components/Header/index.vue";
import Footer from "../../components/Footer/index.vue";
import Products from "../../services/Products";
export default {
  name: "myaccount",
  components: {
    Header,
    Footer,
  },
  methods: {
    getTracking(code) {
      this.load = true;
      Products.getTracking(code)
        .then((r) => {
          this.result = r.data.DATA;
        })
        .catch((e) => {
          if (e.response.data.REF == "I0017") {
            this.status = true;
            this.msg = "Código de Rastreio Não encontrado";
          } else {
            this.status = true;
            this.msg = e.response.data.DESCRIPTION;
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    if (this.$route.params.code) {
      this.getTracking(this.$route.params.code);
      this.TrackingCode = this.$route.params.code;
    } else {
      this.TrackingCode = false;
    }
  },
  data() {
    return {
      load: false,
      result: "",
      TrackingCode: null,
      status: false,
      msg: "",
    };
  },
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
.ResultTrack .vg-modal-body {
  width: 60% !important;
  height: 60% !important;
  overflow-x: hidden !important;
}
.ResultTrack .mb-5,
.my-5 {
  margin-bottom: 0rem !important;
}
.ResultTrack .result {
  text-align: left;
  margin-top: 15px;
  border-left: 5px solid #ff6500;
}
.ResultTrack .result .item {
  padding: 10px 20px;
  margin-bottom: 15px;
  border-left: 5px solid #009aff;
  margin-left: -5px;
  background: #efefef;
}
.ResultTrack .vg-modal-mask {
  position: relative !important;
}
.ResultTrack .vg-modal-mask .vg-modal-body {
  overflow: hidden !important;
}
.ResultTrack {
min-height: 50vh;
padding-top: 5vw;
}
.ResultTrack h5{
    font-size: 25px;
    text-transform: uppercase;
    color: #191928;
}
.ResultTrack b{
    color: #6f6f6f;
}
.erro {
    font-size: 30px;
    color: red;
    font-weight: bold;
    padding: 5vw 0vw;
}
</style>