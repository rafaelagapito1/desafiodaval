<template>
  <!-- .block-banner -->
  <div class="block block-banner">
    <div class="container">
      <div class="row">
        <div class="col-md-12 one">
          <div class="CarouselSingle">
            <splide
              :options="options"
              id="desktop"
              v-if="Carousel.DESKTOP  != null && desktop == true"
            >
              <splide-slide v-for="item in Carousel.DESKTOP" :key="item">
                <a href="#" @click.prevent="null">
                  <div class="banner-img" style="height: auto; position: relative; min-height: 175px; width: 100%;" v-if="item.url">
                    <div class="img" :style="'background-image: url('+item.url+')'"></div> 
                  </div>
                </a>
              </splide-slide>
            </splide>

            <splide
              :options="options"
              id="mobile"
              v-if="Carousel.MOBILE  != null && mobile == true"
            >
              <splide-slide v-for="item in Carousel.MOBILE" :key="item">
                <a href="#" @click.prevent="null">
                    <img   v-if="item.url" :src="item.url" />
                </a>
              </splide-slide>
            </splide>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-banner / end -->
</template>

<script>
import Auth from "../../../services/Auth";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  props: ["Carousel"],
  data() {
    return {
      mobile: false,
      desktop: true,
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
        height:"175px",
        breakpoints: {
          1600: {
             height:"160px",
          },
           1100: {
             height:"150px",
          },
           1024: {
             height:"140px",
          },
        },
      },
    };
  },
  methods: {
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
    mounted() {
      this.isMobile();
    },
  },
  components: {
    Splide,
    SplideSlide,
  },
};
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
</script>

<style>
.CarouselSingle .splide__slide img {
  width: 100%;
  height: 175px;
  background-size: contain;
  background-position: center;
}

.block.block-banner {
  margin-bottom: 15px;
}
</style>
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
    height: 160px!important;
    min-height: 160px!important;
  }
}
@media only screen and (max-width: 1100px) {
  .banner-img {
    height: 150px!important;
    min-height: 150px!important;
  }
}
@media only screen and (max-width: 1024px) {
  .banner-img {
    height: 140px!important;
    min-height: 140px!important;
  }
}
</style>