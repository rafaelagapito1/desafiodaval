<template>
  <div class="Carousel-Home">
    <splide
      :options="primaryOptions"
      id="desktop"
      v-if="Carousel.DESKTOP != null && desktop == true"
    >
      <splide-slide v-for="item in Carousel.DESKTOP" :key="item">
        <a href="#" @click.prevent="null">
          <div class="banner-img" style="height: auto; position: relative; min-height: 420px; width: 100%;" v-if="item.url">
             <div class="img" :style="'background-image: url('+item.url+')'"></div> 
          </div>
        </a>
      </splide-slide>
    </splide>

    <splide
      :options="primaryOptions"
      id="mobile"
      v-if="Carousel.MOBILE != null && mobile == true"
    >
      <splide-slide v-for="item in Carousel.MOBILE" :key="item">
        <a href="#" @click.prevent="null">
          <img  v-if="item.url" :src="item.url" />
        </a>
      </splide-slide>
    </splide>
  </div>
</template>
<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  props: ["Carousel"],
  data() {
    return {
      options: {
        type: "loop",
        autoplay: true,
        speed: 400,
        rewind: true,
        gap: "0",
        margin: "0",
        perPage: 1,
        arrows: false,
        width: "100vw",
      },
      primaryOptions: {
        type: "loop",
        autoplay: true,
        speed: 400,
        rewind: true,
        gap: "0",
        margin: "0",
        perPage: 1,
        arrows: false,
        width: "100vw",
      },
      mobile: false,
      desktop: true,
    };
  },
  methods: {
    goTO(url) {
      this.$router.push(url);
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.mobile = true;
        this.desktop = false;
      }
    },
  },
  mounted() {
    this.isMobile();
  },
  components: {
    Splide,
    SplideSlide,
  },
};
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
</script>

<style scoped>
.banner-img .img {
    width: auto;
    height: 100%;
    position: absolute;
    margin: auto;
    inset: 0 0 0 0;
    background-size: cover;
    background-position: center center;
}
@media only screen and (max-width: 1600px) {
  .banner-img {
    height: 300px!important;
    min-height: 300px!important;
  }
}
@media only screen and (max-width: 1100px) {
  .banner-img {
    height: 250px!important;
    min-height: 250px!important;
  }
}
@media only screen and (max-width: 1024px) {
  .banner-img {
    height: 200px!important;
    min-height: 200px!important;
  }
}
.splide {
  padding: 0;
}

.splide__slide img {
  width: 100%;
  height: auto;
  background-size: contain;
  background-position: center;
}
.splide__pagination ul {
  width: max-content;
  background: white;
  padding: 5px 1vw;
  border-radius: 25px;
}

#mobile img {
  height: 350px !important;
}
#desktop img {
  height: 420px !important;
}
.Carousel-Home {
  border-bottom: 1px solid #e6e3e3;
}
</style>
