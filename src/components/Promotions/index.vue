<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <button class="modal__close" @click="showModal = false">X</button>

    <div class="modal__content">
      <ProductView :product="product"></ProductView>
    </div>
  </vue-final-modal>

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
        <h3 class="block-header__title">PROMOÇÕES ESPECIAIS</h3>
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
                       -{{ getPercent(product) }}
                    </div>
                      <div class="new" style="padding-left: 15px;">
                <p style="text-decoration: line-through; font-size: 15px; color: rgb(47, 85, 150);    font-weight: bold;">  {{ currencyBRL(product.SALE_PRICE) }}</p>
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
  mounted() {
    this.load = true;
    let data = {
      PROMOTION: `1`,
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
      return (
        parseInt(
          ((product.SALE_PRICE - product.SALE_PRICE_DISCOUNT) /
            product.SALE_PRICE_DISCOUNT) *
            100
        ) + "%"
      );
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


<style scoped>
.product-card__badge--sale {
  background: #4466a1;
  background: url(../../assets/images/discount.svg);
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 65px;
  text-align: center;
  padding: 25px 0;
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
</style><style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 85%;
  max-width: 75%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  margin: 0 2rem 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__content {
  flex-grow: 1;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style><style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

.vfm--inset {
  z-index: 9999999999999999 !important;
}

.modal__close {
  border: none;
  background: none;
}
</style>