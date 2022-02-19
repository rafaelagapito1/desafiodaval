<template>
  <!-- .block-brands -->
  <div class="block block-brands">
    <div class="container">
      <div class="block-brands__slider">
        <splide :options="options">
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-1.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-2.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-3.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-4.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-5.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-6.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-7.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-2.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-6.png" alt=""
              /></a>
            </div>
          </splide-slide>
          <splide-slide>
            <div class="block-brands__item">
              <a href="#"
                ><img src="../../assets/images/logos/logo-3.png" alt=""
              /></a>
            </div>
          </splide-slide>
        </splide>
      </div>
    </div>
  </div>
  <!-- .block-brands / end -->
</template>
<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  data() {
    return {
      options: {
        rewind: true,
        gap: "1rem",
        perPage: 7,
        arrows: false,
        pagination: false,
        autoplay: true,
        breakpoints: {
          640: {
            perPage: 2,
          },
        },
      },
    };
  },
  components: {
    Splide,
    SplideSlide,
  },
};
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
// or
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
// or
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
</script>

<style scoped>
.splide__slide img {
  vertical-align: bottom;
  width: 100%;
}
.splide {
  padding: 0;
}
.block-brands__item {
  padding: 36px 10px;
}
.block-brands__slider {
  border: 2px solid #f0f0f0;
  border-radius: 2px;
  padding: 0vw 2vw;
}
</style>