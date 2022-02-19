<template>
  <div class="container ProductDetailss">
    <br />
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a
          class="nav-link active"
          id="nav-home-tab"
          data-toggle="tab"
          href="#nav-home"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
          >Descrição</a
        >
        <a
          class="nav-link"
          id="nav-profile-tab"
          data-toggle="tab"
          href="#nav-profile"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
          >Especificação</a
        >
        <a
          class="nav-link"
          id="nav-contact-tab"
          data-toggle="tab"
          href="#nav-contact"
          role="tab"
          aria-controls="nav-contact"
          aria-selected="false"
          >Avaliações</a
        >
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div class="description">
          <h2>Descrição</h2>
          <p v-if="product.PRODUCT" v-html="DecodeItem(product.PRODUCT)">
          </p>
        </div>
      </div>

      <div
        class="tab-pane fade"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div class="spec">
          <h3 class="spec__header">Especificação</h3>
          <div class="spec__section">
            <h4 class="spec__section-title">Geral</h4>
            <div class="spec__row">
              <div class="spec__name">Marca</div>
              <div class="spec__value">{{ product.BRAND }}</div>
            </div>
            <div class="spec__row">
              <div class="spec__name">Modelo</div>
              <div class="spec__value">{{ product.MODEL }}</div>
            </div>
            <div class="spec__row">
              <div class="spec__name">Categoria</div>
              <div class="spec__value">{{ product.VS_CATEGORY }}</div>
            </div>
          </div>
          <div class="spec__section" hidden>
            <h4 class="spec__section-title">Dimensões</h4>
            <div class="spec__row">
              <div class="spec__name">Peso</div>
              <div class="spec__value">{{ product.WEIGHT }} kg</div>
            </div>
            <div class="spec__row">
              <div class="spec__name">Largura</div>
              <div class="spec__value">{{ product.WIDTH }} cm</div>
            </div>
            <div class="spec__row">
              <div class="spec__name">Altura</div>
              <div class="spec__value">{{ product.HEIGHT }} cm</div>
            </div>
            <div class="spec__row">
              <div class="spec__name">COMPRIMENTO</div>
              <div class="spec__value">{{ product.LENGTH }} cm</div>
            </div>
            <div class="spec__row">
              <div class="spec__name">DIÂMETRO</div>
              <div class="spec__value">{{ product.DIAMETER }} cm</div>
            </div>
          </div>
          <div class="spec__disclaimer"></div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <div class="reviews-view">
          <div class="reviews-view__list">
            <h3 class="reviews-view__header">Avaliações</h3>
            <div class="reviews-list" v-if="comments.length > 0">
              <ol class="reviews-list__content">
                <li class="reviews-list__item" v-for="item in comments">
                  <div class="review">
                    <div class="review__avatar">
                    <img
                    v-if="item.PROFILE_PICTURE"
                    :src="item.PROFILE_PICTURE"
                    alt="" />
                  <img v-else src="../../assets/images/profile-user.png" alt=""
                />
                    </div>
                    <div class="review__content">
                      <div class="review__author">{{ item.USER_NAME }}</div>
                      <div class="review__rating">
                        <div class="rating">
                          <div class="rating__body">
                              <star-rating
                    :rating="item.STAR "
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
                      <div class="review__text">
                        {{ item.COMMENT }}
                      </div>
                      <div class="review__date">{{item.DT_REGISTER }}</div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            <div class="" v-else>
              Nenhum Registro
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Products from "../../services/Products";
import StarRating from "vue-star-rating";
import he from 'he/he/';
export default {
    components: {
    StarRating
  },
  props: ["product"],
    watch: {
    "$route.params.id": function () {
      window.scrollTo(0, 0);
        this.getComments(this.$route.params.id);
    },
  },
  methods: {
    DecodeItem(value){
  return he.decode(value)
       //     return value
    },
      dateFormat(data) {
      let date = data.substr(0, 10);
      return date.split("-").reverse().join("/");
    },
    getComments(id) {
      this.load = true;
      Products.getComments(id)
        .then((r) => {
          this.comments = r.data.DATA;
          this.load = false;
        })
        .catch((e) => {
          this.load = false;
          console.log("erro:", e);
        });
    },
  },
  mounted() {
    if (this.$route.params.id.length > 0) {
      this.getComments(this.$route.params.id/255);
    } else {
      this.CategorieStatus = false;
    }
  },
  data() {
    return {
      comments: {},
      load: false,
    };
  },
};
</script>

<style scoped>
.ProductDetailss nav {
  position: relative;
  height: max-content;
  padding-top: 0px;
  margin-top: 60px;
}

.ProductDetailss .nav-tabs {
  width: max-content;
  position: absolute;
  top: -67px;
  left: 0;
  right: 0;
  margin: auto;
}

.ProductDetailss .tab-pane {
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  padding: 75px 80px;
  margin-bottom: 50px;
}

.ProductDetailss .description h2 {
  margin-bottom: 25px;
}

.ProductDetailss .description p {
  margin-bottom: 25px;
}

.ProductDetailss .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background-color: transparent;
  border-color: transparent;
  border-bottom: 2px solid #191928;
}

.ProductDetailss .nav-tabs .nav-link {
  font-size: 20px;
  padding: 18px 48px;
  color: inherit;
  font-weight: 500;
  border-radius: 3px 3px 0 0;
  white-space: nowrap;
  transition: border-color 0.15s, background-color 0.15s;
}

.ProductDetailss .nav-tabs .nav-link:hover {
  color: inherit;
  background: #f7f7f7;
  border-bottom-color: #d9d9d9;
}

@media (max-width: 991px) {
  .ProductDetailss .nav-tabs {
    display: contents;
  }

  .ProductDetailss .nav-tabs .nav-link {
    font-size: 15px;
    padding: 5px 12px;
    border-left: 2px solid #d4d4d4;
    border-bottom: 0;
    margin-bottom: 5px;
  }

  .ProductDetailss .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    border-bottom: 0;
    border-left: 2px solid #191928;
  }

  .ProductDetailss .tab-pane {
    border: 2px solid #d4d4d4;
    border-radius: 3px;
    padding: 25px 25px;
    margin-bottom: 30px;
    margin-top: 10px;
  }

  .ProductDetailss nav {
    position: relative;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: max-content;
    padding-top: 0px;
    margin-top: -40px;
  }
  .block-header__title {
    margin-bottom: 0;
    font-size: 16px;
  }
}
</style>

<style>
.ProductDetailss .el-loading-mask {
  z-index: 1029 !important;
  background-color: rgb(255 255 255) !important;
}
</style>
