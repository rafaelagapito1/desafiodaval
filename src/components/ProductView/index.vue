<template>
  <div class="container ProductView" v-if="product">
    <div class="row">
      <div class="col-md-6">
        <div
          class="product-card__badges-list"
          v-if="product.SALE_PRICE !== product.SALE_PRICE_DISCOUNT"
        >
          <!-- 
          <div class="product-card__badge product-card__badge--sale">
            - {{ getPercent(product) }}
          </div>
          -->
        </div>
        <div class="one">
          <!--<splide :options="primaryOptions" ref="primary" :slides="product.IMAGE_LIST">
                    <splide-slide :v-for="img in product.IMAGE_LIST" :key="'primary-'+index" v-if="product.IMAGE_LIST != null">
                        <a href="#">
                            <img :src="img" />
                        </a>
                    </splide-slide>
                </splide>-->
          <splide
            :options="primaryOptions"
            ref="primary"
            v-if="product.IMAGE_LIST != null"
          >
            <splide-slide v-for="item in product.IMAGE_LIST" :key="item">
              <a href="#" @click.prevent="null">
                <img :src="item" />
              </a>
            </splide-slide>
          </splide>
          <splide :options="primaryOptions" ref="primary" v-else>
            <splide-slide>
              <a href="#" @click.prevent="null">
                <img :src="IMAGE_DEFAULT" />
              </a>
            </splide-slide>
          </splide>
        </div>

        <div class="two" hidden>
          <splide :options="secondaryOptions" ref="secondary">
            <splide-slide v-for="item in product.IMAGE_LIST" :key="item">
              <a href="#">
                <img :src="item" />
              </a>
            </splide-slide>
          </splide>
        </div>
      </div>
      <div class="col-md-6">
        <div class="product__info">
          <div class="product__wishlist-compare">
            <button
              type="button"
              class="btn btn-sm btn-light btn-svg-icon"
              data-toggle="tooltip"
              data-placement="right"
              title=""
              data-original-title="Wishlist"
            >
              <svg width="16px" height="16px">
                <use xlink:href="images/sprite.svg#wishlist-16"></use>
              </svg>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-light btn-svg-icon"
              data-toggle="tooltip"
              data-placement="right"
              title=""
              data-original-title="Compare"
            >
              <svg width="16px" height="16px">
                <use xlink:href="images/sprite.svg#compare-16"></use>
              </svg>
            </button>
          </div>
          <h1 class="product__name">{{ product.PRODUCT_NAME }}</h1>
          <div class="product__rating">
            <div class="product__rating-stars">
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
            </div>
            <div class="product__rating-legend">
              {{ product.TOTAL_EVALUATION }} Avaliações
            </div>
          </div>
          <div class="product__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            ornare, mi in ornare elementum, libero nibh lacinia urna, quis
            convallis lorem erat at purus. Maecenas eu varius nisi.
          </div>
        </div>
        <div class="product__sidebar">
          <div class="product__prices">
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
            <div class="normal-price" v-else>
              {{ currencyBRL(product.SALE_PRICE) }}
            </div>
          </div>

          <!-- .product__options -->
          <form class="product__options">
            <div v-if="product.VARIATIONS_JSON">
              <div
                v-for="(obj, index) in Variations"
                class="form-group product__option"
              >
                <div class="radio" v-if="obj.VARIATIONS.VARIATIONS.length <= 4">
                  <label class="product__option-label"> {{ obj.NAME }} </label>
                  <div class="input-radio-label">
                    <el-radio-group v-model="selectedValues[index]">
                      <el-radio-button
                        v-for="item in obj.VARIATIONS.VARIATIONS"
                        :label="
                          '&#34;' + obj.NAME + '&#34;: [&#34;' + item + '&#34;]'
                        "
                        :key="item"
                        :value="item"
                        @change="verifyVariations()"
                      >
                        <div
                          v-if="obj.NAME == 'COR'"
                          :style="
                            'background:' +
                            item +
                            ';color:' +
                            item +
                            ';border: 1px solid black'
                          "
                        >
                          ABC
                        </div>
                        <div v-else>
                          {{ item }}
                        </div>
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
                <div
                  class="select"
                  v-if="
                    obj.VARIATIONS.VARIATIONS.length > 4 && obj.NAME !== 'COR'
                  "
                >
                  <label class="product__option-label"> {{ obj.NAME }} </label>
                  <br />
                  <el-select
                    v-model="selectedValues[index]"
                    placeholder="Selecione"
                    @change="verifyVariations()"
                  >
                    <el-option
                      v-for="item in obj.VARIATIONS.VARIATIONS"
                      :key="item"
                      :value="
                        '&#34;' + obj.NAME + '&#34;: [&#34;' + item + '&#34;]'
                      "
                      :label="item"
                    >
                      <div
                        v-if="obj.NAME == 'COR'"
                        :style="
                          'background:' +
                          item +
                          ';color:' +
                          item +
                          ';border: 1px solid black'
                        "
                      >
                        ABC
                      </div>
                      <div v-else>
                        {{ item }}
                      </div>
                    </el-option>
                  </el-select>
                </div>
                <div
                  class="radio"
                  v-if="
                    obj.VARIATIONS.VARIATIONS.length > 4 && obj.NAME == 'COR'
                  "
                >
                  <label class="product__option-label"> {{ obj.NAME }} </label>
                  <div class="input-radio-label">
                    <el-radio-group v-model="selectedValues[index]">
                      <el-radio-button
                        v-for="item in obj.VARIATIONS.VARIATIONS"
                        :label="
                          '&#34;' + obj.NAME + '&#34;: [&#34;' + item + '&#34;]'
                        "
                        :key="item"
                        :value="item"
                        @change="verifyVariations()"
                      >
                        <div
                          v-if="obj.NAME == 'COR'"
                          :style="
                            'background:' +
                            item +
                            ';color:' +
                            item +
                            ';border: 1px solid black'
                          "
                        >
                          ABC
                        </div>
                        <div v-else>
                          {{ item }}
                        </div>
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group product__option">
              <label class="product__option-label" for="product-quantity"
                >Quantidade</label
              >
              <div class="product__actions">
                <div class="product__actions-item">
                  <el-input-number
                    v-model="Quant"
                    @change="handleChange"
                    :min="1"
                    :max="99"
                  ></el-input-number>
                </div>
                <!-- -->
                <div
                  class="product__actions-item product__actions-item--addtocart"
                  v-if="product.VARIATIONS_JSON"
                >
                  <button
                    class="btn btn-primary btn-lg"
                    v-if="VariationDisable"
                    @click.prevent="addToCart(product)"
                  >
                    Adicionar ao Carrinho
                  </button>

                  <button class="btn btn-primary btn-lg" disabled v-else>
                    Adicionar ao Carrinho
                  </button>
                </div>
                <!-- -->
                <div
                  class="product__actions-item product__actions-item--addtocart"
                  v-else
                  @click.prevent="addToCart(product)"
                >
                  <button class="btn btn-primary btn-lg">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </form>
          <!-- .product__options / end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import Rating from "primevue/rating";
import Toast from "primevue/toast";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import StarRating from "vue-star-rating";
export default {
  components: {
    Splide,
    Toast,
    SplideSlide,
    Rating,
    StarRating,
  },

  props: ["product", "rating"],
  methods: {
    verifyVariations() {
      var count = parseInt(this.totalVariations);
      var k = 0;
      for (; k < count; k++) {
    
        var liberado = false;
        if (this.selectedValues[k] != null) {
          liberado = true;
        } else {
          liberado = false;
        }
      }
      this.VariationDisable = liberado;
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
    //add cart variations
    addToCart: function (product) {
      var amount = this.Quant;
      var totalVariations = "";
      if (product.VARIATIONS_JSON) {
        var variations = this.selectedValues;
        for (var obj in variations) {
          if (totalVariations.length == "") {
            totalVariations = "{" + totalVariations + variations[obj];
          } else {
            totalVariations = totalVariations + ", " + variations[obj];
          }
        }
        product.VARIATIONS = totalVariations + "}";

        product.VARIATIONS = product.VARIATIONS;
      }

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
        products[exists].amount = products[exists].amount + this.Quant;
        localStorage.setItem("@APP:cart", JSON.stringify(products));
        this.$message({
          message: " Adicionado ao carrinho:  " + product.PRODUCT_NAME + "!",
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
          message: " Adicionado ao carrinho:  " + product.PRODUCT_NAME + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      }
      exists = null;
      this.$store.state.total = localStorage.getItem("@APP:cart");
    },
    getVariations() {
      if (this.product.VARIATIONS_JSON) {
        var variations = JSON.parse(this.product.VARIATIONS_JSON);
        var i = 0;
        for (var obj in variations) {
          let dados = {
            NAME: "",
            VARIATIONS: "",
          };
          let variation = {
            NAME: "",
            VARIATIONS: "",
          };
          variation.NAME = obj;
          variation.VARIATIONS = JSON.parse(this.product.VARIATIONS_JSON)[obj];
          dados.NAME = obj;
          dados.VARIATIONS = variation;
          this.Variations[i] = dados;
          i++;
          this.totalVariations = i;
        }
      } else {
        return false;
      }
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  data() {
    return {
      VariationDisable: false,
      subcategoria: null,
      subcategoriaID: null,
      totalVariations: null,
      var1: null,
      Variations: {},
      Quant: 1,
      selectedSize: null,
      selectedColor: null,
      selectedValues: [],
      IMAGE_DEFAULT: ["../../assets/images/default.png"],
      primaryOptions: {
        type: "slide",
        autoplay: false,
        speed: 400,
        rewind: true,
        gap: "0",
        margin: "0",
        perPage: 1,
        arrows: true,
        width: "100%",
        height: "450px",
        breakpoints: {
          640: {
            perPage: 1,
            height: "300px",
          },
        },
      },
      secondaryOptions: {
        type: "slide",
        autoplay: false,
        rewind: true,
        gap: "1rem",
        pagination: false,
        perPage: 5,
        cover: true,
        isNavigation: true,
        updateOnMove: true,
        arrows: false,
        breakpoints: {
          640: {
            perPage: 3,
          },
        },
      },
      count: 0,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$refs.primary.sync(this.$refs.secondary.splide);
  },
  beforeUpdate() {
    this.getVariations();
  },
};
</script>

<style scoped>
.product-card__badges-list {
  left: 30px;
  top: 25px;
}
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
.ProductView {
  margin-bottom: 50px;
  margin-top: 25px;
}

.splide {
  padding: 0;
}

.ProductView .one img {
  width: auto;
  height: 500px;
  min-height: 400px;
  background-size: cover;
  background-position: center;
}

.ProductView .two img {
  width: 90px;
  height: 90px;
  background-size: contain;
  background-position: center;
}

.ProductView .one {
  border: 2px solid #f3f3f3;
  padding: 5px;
  border-radius: 3px;
}

.ProductView .one {
  margin-bottom: 15px;
  text-align: center;
}

.splide__pagination ul {
  width: max-content;
  background: white;
  padding: 5px 1vw;
  border-radius: 25px;
}

.two .splide--nav > .splide__track > .splide__list > .splide__slide {
  border: 2px solid #f3f3f3;
  border-radius: 3px;
  text-align: center;
}

.two .splide--nav > .splide__track > .splide__list > .splide__slide.is-active {
  border-color: #6a8da5;
}

@media (max-width: 991px) {
  .ProductView .one img {
    height: 300px;
  }

  .ProductView {
    margin-bottom: 50px;
    margin-top: 15px;
  }
  .product__name {
    margin-top: 10px;
  }
}
</style>