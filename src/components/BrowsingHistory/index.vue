<template>
  <div class="container">
    <div class="BrowsingHistory" v-if="productsHistory">
      <div class="block-header">
        <h3 class="block-header__title">Seu histórico de navegação</h3>
        <div class="block-header__divider"></div>
      </div>
      <div class="history">
        <div class="row">
          <div
            class="col-md-2"
            v-for="(item, index) in productsHistory.slice(0, 6)"
            :key="index"
          >
            <a href="#">
              <img
                @click.prevent="
                  goTO(
                    '/product/' +
                      item.VS_PRODUCT_ID * 255 +
                      '/' +
                      transformName(item)
                  )
                "
                class="img-fluid"
                :src="item.IMAGE_LIST[0]"
                alt=""
            /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productsHistory: null,
    };
  },
  methods: {
    transformName(name) {
      if (name.TITLE_SEO != null) {
        name = name.TITLE_SEO;
      } else {
        name = name.PRODUCT_NAME;
      }
      let newname = name.split(" ").join("-");
      return newname.normalize("NFD");
    },
    goTO(url) {
      this.$router.push(url);
    },
  },
  mounted() {
    if (localStorage.getItem("BrowsingHistory") !== null) {
      this.productsHistory = JSON.parse(
        localStorage.getItem("BrowsingHistory")
      );
      this.productsHistory.reverse();
    }
  },
};
</script>

<style scoped>
.block-header__title {
  text-transform: uppercase;
}

.history {
  margin-bottom: 50px;
      padding: 0vw 2vw;
}

.history .col-md-2 {
  border-bottom: 1px solid transparent;
}
.history .col-md-2:hover {
  border-bottom: 1px solid #6a8da5;
}
@media (max-width: 991px) {
  .BrowsingHistory {
    display: none;
  }
}
</style>
