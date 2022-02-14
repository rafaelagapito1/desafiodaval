<template>
  <!-- .block-products -->
  <div class="block block-products block-products--layout--large-last">
    <div class="container">
      <div class="block-header"></div>

      <div class="">
        <div class="block-products__list">
          <div
            class="block-products__list-item"
            v-for="product in resultProducts.slice(
              indexInitial,
              page * perPage
            )"
            :key="product.VS_PRODUCT_ID"
          >
            <div class="product-card">
              <div
                class="product-card__badges-list"
                v-if="product.SALE_PRICE !== product.SALE_PRICE_DISCOUNT"
              >
                <div class="product-card__badge product-card__badge--sale">
                <p
                        style="transform: rotate( 314deg ); position: absolute; top: 28px; left: 8px; font-weight: bold; font-size: 18px; }"
                      >
                        {{ getPercent(product) + '%' }} OFF
                      </p>
                </div>
              </div>
              <div class="product-card__image">
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
                >
                  <img
                    v-if="product.IMAGE_LIST"
                    :src="product.IMAGE_LIST[0]"
                    alt="" />
                  <img v-else src="../../../assets/images/default.png" alt=""
                /></a>
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
                  <div class="rating">
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
                  <div class="product-card__rating-legend">
                    {{ product.TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div v-if="product.SALE_PRICE == product.SALE_PRICE_DISCOUNT">
                    {{ currencyBRL(product.SALE_PRICE) }}
                  </div>
                  <div v-else>
                   <div
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
          <div class="d-flex adjust__center" style="margin-top: 50px">
            <pagination
              :options="optPagination"
              v-model="page"
              :records="resultProducts.length"
              :per-page="perPage"
              @paginate="callback"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-products / end -->
</template>


<script>
import Pagination from "v-pagination-3";
import StarRating from "vue-star-rating";
export default {
  components: {
    Pagination,
    StarRating,
  },
  data() {
    return {
      noData: false,
      page: 1,
      perPage: 12,
      indexInitial: 0,
      optPagination: {
        chunk: 10,
        texts: {
          count: "",
        },
      },
      IMAGE_DEFAULT: ["../../assets/images/default.png"],
      IMAGE_DISCOUNT: ["../../assets/images/discount.svg"],
    };
  },
  props: {
    resultProducts: {
      type: Array,
      default: [],
    },
  },
  watch: {
    resultProducts: function () {
      this.page = 1;
    },
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
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.optPagination.chunk = 5;
        this.perPage = 4;
      }
    },
    onEnter: function () {
      alert("ok");
    },
    callback: function (page) {
      this.page = page;
      this.indexInitial = page * this.perPage - this.perPage;
    },
  },
  mounted() {
    this.isMobile();
  },
};
</script>


<style scoped>
.block-products__list-item .product-card .product-card__badges-list {
  left: 0px;
  top: 0px;
}
.product-card__badge--sale {
  background: #4466a1;
  background: url(../../../assets/images/discount3.svg);
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  text-align: center;
  padding:  0;
  font-size: 20px;
  font-weight: bold;
}
a.page-link.before::before {
  content: "← ";
}
a.page-link.after::after {
  content: " →";
}
.adjust__center {
  margin: 30px auto 0px auto;
}

@media (max-width: 991px) and (min-width: 768px) {
  .block-products__list-item {
    display: flex;
    width: calc(33.33333% - 12px);
    margin: 6px;
  }
}
</style>
