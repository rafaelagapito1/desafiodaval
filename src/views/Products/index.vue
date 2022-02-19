<template >
  <Header></Header>
  <div class="product">
    <div class="container" style="margin-top: 50px" v-if="subcategoria">
      <div class="row">
        <div class="col-md-12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              :to="{ path: '/search/default/' + product.VS_CATEGORY_ID }"
              >{{ product.VS_CATEGORY }}</el-breadcrumb-item
            >

            <el-breadcrumb-item
              :to="{
                path:
                  '/search/default/' +
                  product.VS_CATEGORY_ID +
                  '/' +
                  subcategoriaID,
              }"
              >{{ subcategoria }}</el-breadcrumb-item
            >

            <el-breadcrumb-item>{{ product.PRODUCT_NAME }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <ProductView :product="product" v-loading="load"></ProductView>
  </div>
  <div class="fornecedor ">
    <div
      v-loading="loadSupplier"
      class="
        row
        Carousel
        bg-white
        block block-products-carousel
        recentsproducts
      "
      style="min-height: 400px"
      data-layout="grid-4"
      data-mobile-grid-columns="2"
    >
      <div class="container">
        <div class="block-header">
          <br />
          <br />
          <h3 class="block-header__title">PRODUTOS - {{ product.SUPPLIER }}</h3>
        </div>

        <splide :options="options" :slides="productsSupplier">
          <splide-slide
            v-for="item in productsSupplier"
            :key="productsSupplier.VS_PRODUCT_ID"
          >
            <div>
              <div class="block-products-carousel__column">
                <div class="block-products-carousel__cell">
                  <div class="product-card product-card--hidden-actions">
                    <div
                      class="product-card__badges-list"
                      v-if="item.SALE_PRICE !== item.SALE_PRICE_DISCOUNT"
                    >
                      <div
                        class="product-card__badge product-card__badge--sale"
                      >
                        <p
                          style="transform: rotate( 314deg ); position: absolute; top: 28px; left: 8px; font-weight: bold; font-size: 18px; }"
                        >
                          {{ getPercent(item) + "%" }} OFF
                        </p>
                      </div>
                    </div>
                    <div class="product-card__image product-image">
                      <a
                        href="#"
                        class="product-image__body"
                        @click.prevent="
                          goTO(
                            '/product/' +
                              item.VS_PRODUCT_ID * 255 +
                              '/' +
                              transformName(item)
                          )
                        "
                        ><img
                          v-if="item.IMAGE_LIST"
                          class="product-image__img"
                          :src="
                            item.IMAGE_LIST != null ? item.IMAGE_LIST[0] : ''
                          "
                          alt=""
                        />
                        <img
                          v-else
                          src="../../assets/images/default.png"
                          alt=""
                        />
                      </a>
                    </div>

                    <div class="product-card__info">
                      <div class="product-card__name">
                        <a
                          href="#"
                          @click.prevent="
                            goTO(
                              '/product/' +
                                item.VS_PRODUCT_ID * 255 +
                                '/' +
                                transformName(item)
                            )
                          "
                          >{{ item.PRODUCT_NAME }}</a
                        >
                      </div>
                      <div class="product-card__rating">
                        <div class="product-card__rating-stars">
                          <div class="rating">
                            <!--Nao achei a info-->
                            <div class="rating__body">
                              <star-rating
                                :rating="item.STAR_EVALUATION"
                                read-only="false"
                                :round-start-rating="false"
                                inactive-color="#eaeaea"
                                active-color="#ffd333"
                                :show-rating="false"
                                v-bind:star-size="18"
                              >
                              </star-rating>
                            </div>
                          </div>
                        </div>
                        <div class="product-card__rating-legend">
                          {{ item.TOTAL_EVALUATION }} Avaliações
                        </div>
                      </div>
                    </div>

                    <div class="product-card__actions">
                      <div
                        class="discount"
                        v-if="item.SALE_PRICE !== item.SALE_PRICE_DISCOUNT"
                      >
                        <div
                          class="desconto"
                          style="
                            color: rgb(125, 125, 125);
                            position: absolute;
                            margin-top: -20px;
                            font-size: 13px;
                            font-weight: bold;
                          "
                        >
                          DE {{ currencyBRL(item.SALE_PRICE) }} POR
                        </div>
                        <div class="normal-price product-card__prices">
                          {{ currencyBRL(item.SALE_PRICE_DISCOUNT) }}
                        </div>
                      </div>
                      <div class="normal-price product-card__prices" v-else>
                        {{ currencyBRL(item.SALE_PRICE) }}
                      </div>

                      <div class="product-card__buttons">
                        <button
                          v-if="item.VARIATIONS_JSON"
                          class="btn btn-primary product-card__addtocart"
                          type="button"
                          @click.prevent="
                            goTO(
                              '/product/' +
                                item.VS_PRODUCT_ID * 255 +
                                '/' +
                                transformName(item)
                            )
                          "
                        >
                          Mais Informações
                        </button>
                        <button
                          v-else
                          @click="addToCart(item)"
                          class="btn btn-primary product-card__addtocart"
                          type="button"
                        >
                          Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </splide-slide>
        </splide>
      </div>
    </div>
  </div>
  <ProductDetails :product="product" v-loading="load"></ProductDetails>
  <CategoriesSlide></CategoriesSlide>
  <RecentsProducts></RecentsProducts>
  <BrowsingHistory></BrowsingHistory>
  <BestSellers></BestSellers>
  <BackToHome></BackToHome>
  <Footer></Footer>
</template>

<script>
import { reactive, ref } from "vue";

import Header from "../../components/Header/index.vue";
import CategoriesSlide from "../../components/CategoriesSlide/index.vue";
import ProductView from "../../components/ProductView/index.vue";
import RecentsProducts from "../../components/RecentsProducts/index.vue";
import ProductDetails from "../../components/ProductDetails/index.vue";
import BrowsingHistory from "../../components/BrowsingHistory/index.vue";
import BestSellers from "../../components/BestSellers/index.vue";
import BackToHome from "../../components/BackToHome/index.vue";
import Footer from "../../components/Footer/index.vue";
import Products from "../../services/Products";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import StarRating from "vue-star-rating";
export default {
  name: "Products",
  components: {
    Header,
    CategoriesSlide,
    ProductView,
    ProductDetails,
    BrowsingHistory,
    BestSellers,
    BackToHome,
    RecentsProducts,
    Footer,
    StarRating,
    Splide,
    SplideSlide,
  },
  methods: {
    transferVariation(variations) {
      var html = [];
      for (var obj in variations) {
        var item = {};
        item.NAME = obj;
        item.VARIATION = variations[obj][0];
        html.push(item);
      }
      return html;
    },

    getVariations(product, index) {
      this.globalVariations[index] = JSON.parse(product);
    },
    open() {
      this.$alert("This is a message", "Frete Grátis", {
        confirmButtonText: "Entendi ",
      });
    },
    goTO(url) {
      this.$router.push(url);
    },
    calcPercent(item) {
      let mount = Math.abs((item.PRICE - 300) / 300) * 100;
      mount = 100 - mount;
      let val = (mount / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    calcPercentStyle(item) {
      let mount = Math.abs((item.PRICE - 300) / 300) * 100;
      mount = 100 - mount;
      let val = (mount / 1).toFixed(2).replace(".", ",");
      let value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return "width:" + parseInt(value) + "%;";
    },

    getPercent(product) {
      return parseInt(
        100 - (product.SALE_PRICE_DISCOUNT * 100) / product.SALE_PRICE
      );
    },
    SubCovert() {
      this.subcategoria = this.product.VS_SUB_CATEGORY.split(",", 1)[0];
      this.subcategoriaID = JSON.parse(
        this.product.VS_SUB_CATEGORY_LIST
      ).subcategory[0];
    },
    getProduct(id) {
      let data = {
        ID: `${id}`,
      };
      this.load = true;
      Products.SearchProducts(data)
        .then((r) => {
          this.product = r.data.DATA[0];
          console.log(r.data.DATA[0].VS_SUPPLIER_ID);
          //carousel fornecedor
          let data = {
            VS_SUPPLIER_ID: r.data.DATA[0].VS_SUPPLIER_ID,
          };
          this.loadSupplier = true;
          Products.SearchProducts(data)
            .then((r) => {
              this.productsSupplier = r.data.DATA;
              console.log('R:', this.productsSupplier)
              this.loadSupplier = false;
            })
            .catch((e) => {
              this.loadSupplier = false;
              console.log("erro:", e);
            });

          this.addBrowsing(r.data.DATA[0]);
          this.load = false;
          this.SubCovert();
        })
        .catch((e) => {
          this.load = false;
          console.log("erro:", e);
        });
    },
    addBrowsing: function (product) {
      var amount = 1;
      if (product.VARIATIONS_JSON) {
        product.VARIATIONS = {
          COLOR: this.selectedColor,
          SIZE: this.selectedSize,
        };
      }
      let products = JSON.parse(
        localStorage.getItem("BrowsingHistory") || "[]"
      );
      let exists = null;

      products.map((item, key) => {
        if (product.VARIATIONS) {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            if (
              JSON.stringify(product.VARIATIONS) ===
              JSON.stringify(item.VARIATIONS)
            ) {
              exists = key;
            } else {
              exists = null;
            }
          }
        } else {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            exists = key;
          }
        }
      });

      if (exists !== null) {
        // if (!products[exists].amount) products[exists].amount = amount;
        // else products[exists].amount = products[exists].amount + amount;
        products[exists].amount = products[exists].amount + this.Quant;
        localStorage.setItem("BrowsingHistory", JSON.stringify(products));
      } else {
        product.amount = amount;
        products.push(product);
        localStorage.setItem("BrowsingHistory", JSON.stringify(products));
      }
      exists = null;
    },
    dateFormat(data) {
      return data.split("-").reverse().join("/");
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    addToCart: function (product) {
      var amount = 1;
      let products = JSON.parse(localStorage.getItem("@APP:cart") || "[]");
      let exists = null;
      products.map((item, key) => {
        if (product.VARIATIONS) {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            if (
              JSON.stringify(product.VARIATIONS) ===
              JSON.stringify(item.VARIATIONS)
            ) {
              exists = key;
            } else {
              exists = null;
            }
          }
        } else {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            exists = key;
          }
        }
      });
      if (exists !== null) {
        // if (!products[exists].amount) products[exists].amount = amount;
        // else products[exists].amount = products[exists].amount + amount;
        products[exists].amount = products[exists].amount + 1;
        localStorage.setItem("@APP:cart", JSON.stringify(products));
        this.$message({
          message: " Adicionado ao carrinho: " + product.PRODUCT_NAME + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      } else {
        product.amount = amount;
        products.push(product);
        localStorage.setItem("@APP:cart", JSON.stringify(products));
        this.$message({
          message: " Adicionado ao carrinho: " + product.PRODUCT_NAME + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      }
      exists = null;
      this.$store.state.total = localStorage.getItem("@APP:cart");
      this.getProductsCart();
      location.reload();
    },
    transformName(name) {
      if (name.TITLE_SEO != null) {
        name = name.TITLE_SEO;
      } else {
        name = name.PRODUCT_NAME;
      }
      let newname = name.split(" ").join("-");
      return newname.normalize("NFD");
    },
  },
  watch: {
    "$route.params.id": function () {
      window.scrollTo(0, 0);
      this.getProduct(this.$route.params.id / 255);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    if (this.$route.params.id.length > 0) {
      this.getProduct(this.$route.params.id / 255);
    } else {
      this.CategorieStatus = false;
    }
  },
  data() {
    return {
      product: {},
      load: false,
      loadSupplier: false,
      subcategoria: null,
      subcategoriaID: null,
      productsSupplier: null,
      options: {
        type: "loop",
        autoplay: true,
        speed: 400,
        rewind: true,
        gap: "15px",
        margin: "0",
        perPage: 4,
        perMove: 1,
        arrows: true,
        width: "100vw",
        pagination: false,
        breakpoints: {
          640: {
            perPage: 2,
          },
        },
        classes: {
          arrows: "splide__arrows  arrows-list",
          prev: "splide__arrow--prev  arrowLeft",
          next: "splide__arrow--next arrowRight",
        },
      },
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
  overflow-x: hidden;
}
</style>


<style scoped>

.product-card__badges-list {
  left: 0;
  top: 0;
}
.product-card__badge--sale {
  background: #4466a1;
  background: url(../../assets/images/discount3.svg);
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  text-align: center;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
}
span.product-card__old-price {
  padding-left: 10px;
}
.splide {
  padding: 0;
}

.product-card {
  margin-bottom: 90px;
}

.block {
  margin-bottom: 0;
}

.product-card {
  min-height: 415px;
}

.block-header__groups-list {
  padding-right: 80px;
}
</style>