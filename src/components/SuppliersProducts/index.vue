<template>
 
  <!-- .block-products-carousel -->
  <div
    v-loading="load"
    class="block block-products-carousel recentsproducts"
    style="min-height: 400px"
    data-layout="grid-4"
    data-mobile-grid-columns="2"
  >
    <div class="container">
      <div class="block-header">
        <h3 class="block-header__title">PRODUTOS {{SupplierID}} {{Selectedproduct}}</h3>
        <div class="block-header__divider"></div>
        <ul class="block-header__groups-list">
          <li v-for="category in categories" :key="category.id" hidden>
            <button
              type="button"
              class="block-header__group"
              v-on:click="activateCategory(category.id)"
              v-bind:class="[
                category.id == categoryActive
                  ? 'block-header__group--active'
                  : '',
              ]"
            >
              {{ category.description }}
            </button>
          </li>
          <li hidden>
            <button
              type="button"
              class="block-header__group"
              v-on:click="activateCategory(0)"
              v-bind:class="[
                categoryActive == 0 ? 'block-header__group--active' : '',
              ]"
            >
              TODOS
            </button>
          </li>
        </ul>
      </div>

      <splide :options="options" :slides="products">
        <splide-slide v-for="product in products" :key="product.VS_PRODUCT_ID">
          <div>
            <div class="block-products-carousel__column">
              <div class="block-products-carousel__cell">
                <div class="product-card product-card--hidden-actions">
                  <button
                    class="product-card__quickview"
                    type="button"
                    @click="openModal(product)"
                  >
                    <svg
                      widht="16px"
                      height="16px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      id="quickview-16"
                    >
                      <path
                        d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                      ></path>
                    </svg>
                    <span class="fake-svg-icon"></span>
                  </button>
                  <div
                    class="product-card__badges-list"
                    v-if="product.SALE_PRICE !== product.SALE_PRICE_DISCOUNT"
                  >
                    <div class="product-card__badge product-card__badge--sale">
                      <p
                        style="transform: rotate( 314deg ); position: absolute; top: 28px; left: 8px; font-weight: bold; font-size: 18px; }"
                      >
                        {{ getPercent(product)+ "%"  }} OFF
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
                            product.VS_PRODUCT_ID * 255 +
                            '/' +
                            transformName(product)
                        )
                      "
                      ><img
                        v-if="product.IMAGE_LIST"
                        class="product-image__img"
                        :src="
                          product.IMAGE_LIST != null
                            ? product.IMAGE_LIST[0]
                            : ''
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
                              product.VS_PRODUCT_ID * 255 +
                              '/' +
                              transformName(product)
                          )
                        "
                        >{{ product.PRODUCT_NAME }}</a
                      >
                    </div>
                    <div class="product-card__rating">
                      <div class="product-card__rating-stars">
                        <div class="rating">
                          <!--Nao achei a info-->
                          <div class="rating__body">
                            <star-rating
                              :rating="product.STAR_EVALUATION"
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
                        {{ product.TOTAL_EVALUATION }} Avaliações
                      </div>
                    </div>
                  </div>

                  <div class="product-card__actions">
                    <div
                      class="discount"
                      v-if="product.SALE_PRICE !== product.SALE_PRICE_DISCOUNT"
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
                        DE {{ currencyBRL(product.SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(product.SALE_PRICE_DISCOUNT) }}
                      </div>
                    </div>
                    <div class="normal-price product-card__prices" v-else>
                      {{ currencyBRL(product.SALE_PRICE) }}
                    </div>

                    <div class="product-card__buttons">
                      <button
                        v-if="product.VARIATIONS_JSON"
                        class="btn btn-primary product-card__addtocart"
                        type="button"
                        @click.prevent="
                          goTO(
                            '/product/' +
                              product.VS_PRODUCT_ID * 255 +
                              '/' +
                              transformName(product)
                          )
                        "
                      >
                        Mais Informações
                      </button>
                      <button
                        v-else
                        @click="addToCart(product)"
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
  <!-- .block-products-carousel / end -->
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import ProductView from "../../components/ProductView/index.vue";
import Products from "../../services/Products";
import StarRating from "vue-star-rating";

export default {
props: ["Selectedproduct"], 
  mounted() {
    this.load = true;
    let data = {
      DISTRIBUTION_CENTER_VS_SUPPLIER_ID: `6`,
    };
    this.load = true;
    Products.SearchProducts(data)
      .then((r) => {
        this.products = r.data.DATA;
        this.load = false;
      })
      .catch((e) => {
        this.load = false;
        console.log("erro:", e);
      });
    // Products.getDashboardInfo().then((response) => {
    //   response.data.DATA.SPOTLIGHT_PRODUCTS.forEach((categories) => {
    //     this.load = false;
    //     this.categories.push({
    //       id: categories.CATEGORY_ID,
    //       description: categories.CATEGORY,
    //       list: categories.PRODUCT_LIST,
    //     });
    //     this.allProducts = [].concat(this.allProducts, categories.PRODUCT_LIST);
    //   });

    //   this.products = this.allProducts;
    //   console.log(this.products);
    // });
  },
  methods: {
   getPercent(product) {
      return parseInt(100 - (product.SALE_PRICE_DISCOUNT * 100 ) / product.SALE_PRICE); 
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
    goTO(url) {
      this.$router.push(url);
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
    },
    openModal(product) {
      this.product = product;
      this.showModal = true;
    },
    activateCategory(id) {
      if (id != 0) {
        let category = this.categories.find((category) => category.id == id);
        this.products = category.list;
      } else {
        this.products = this.allProducts;
      }
      this.categoryActive = id;
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  data() {
    return {
      load: false,
      categories: [],
      allProducts: [],
      products: [],
      product: {},
      categoryActive: 0,
      showModal: false,
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
  components: {
    Splide,
    SplideSlide,
    ProductView,
    StarRating,
  },
};
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
</script>

