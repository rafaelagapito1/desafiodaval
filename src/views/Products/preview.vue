<template >
  <div class="product">
    <ProductView :product="product" v-loading="load"></ProductView>
  </div>
  <ProductDetails :product="product" v-loading="load"></ProductDetails>
  <RecentsProducts></RecentsProducts>
  <CategoriesSlide></CategoriesSlide>
  <BrowsingHistory></BrowsingHistory>
  <BestSellers></BestSellers>
  <BackToHome></BackToHome>
  <Footer></Footer>
</template>

<script>
import { reactive, ref } from "vue";

import CategoriesSlide from "../../components/CategoriesSlide/index.vue";
import ProductView from "../../components/ProductView/index.vue";
import RecentsProducts from "../../components/RecentsProducts/index.vue";
import ProductDetails from "../../components/ProductDetails/index.vue";
import BrowsingHistory from "../../components/BrowsingHistory/index.vue";
import BestSellers from "../../components/BestSellers/index.vue";
import BackToHome from "../../components/BackToHome/index.vue";
import Footer from "../../components/Footer/index.vue";
import Products from "../../services/Products";
export default {
  name: "Products",
  components: {
    CategoriesSlide,
    ProductView,
    ProductDetails,
    BrowsingHistory,
    BestSellers,
    BackToHome,
    RecentsProducts,
    Footer,
  },
  methods: {
    getProduct(id) {
      let data = {
        ID: `${id}`,
      };
      this.load = true;
      Products.SearchProducts(data)
        .then((r) => {
          this.product = r.data.DATA[0];
          this.load = false;
        })
        .catch((e) => {
          this.load = false;
          console.log("erro:", e);
        });
    },
  },
    watch: {
    "$route.params.id": function () {
      window.scrollTo(0, 0);
        this.getProduct(this.$route.params.id/255);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    if (this.$route.params.id.length > 0) {
      this.getProduct(this.$route.params.id/255);
    } else {
      this.CategorieStatus = false;
    }
  },
  data() {
    return {
      product: {},
      load: false,
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

<style>
.product .el-loading-mask {
  z-index: 1029 !important;
  background-color: rgb(255 255 255) !important;
}
body {
    padding-top: 0px;
    overflow-x: hidden;
}
</style>
