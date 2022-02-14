<template>
  <div class="CarouselLeft">
    <splide :options="options" id="desktop" v-if="CarouselLeft.DESKTOP != null">
      <splide-slide v-for="item in CarouselLeft.DESKTOP" :key="item">
        <a href="#" @click.prevent="null">
             <img   v-if="item.url" :src="item.url" />
        </a>
      </splide-slide>
    </splide>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  props: ["CarouselLeft"],
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
        pagination: false,
      },
    };
  },
  components: {
    Splide,
    SplideSlide,
  },
};
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
</script>
<style>
.CarouselLeft .splide__pagination li {
  margin: 1px 2px;
  width: 31%;
}
</style>
