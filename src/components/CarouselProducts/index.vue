<template>
  <!-- .block-banner -->
  <div class="block block-banner">
    <div class="container">
      <div class="row">
        <div class="col-md-6 one">
          <CarouselLeft :CarouselLeft="CarouselLeft"></CarouselLeft>
        </div>
        <div class="col-md-6 two">
          <CarouselRight :CarouselRight="CarouselRight"></CarouselRight>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-banner / end -->
</template>

<script>
import CarouselLeft from "../../components/CarouselProducts/CarouselLeft.vue";
import CarouselRight from "../../components/CarouselProducts/CarouselRight.vue";
import Products from "../../services/Products";
export default {
  components: {
    CarouselLeft,
    CarouselRight,
  },
  data() {
    return {
      CarouselLeft: "",
      CarouselRight: "",
    };
  },
  methods: {
    getCarouselLeft() {
      Products.getBanner(2).then((r) => {
        this.CarouselLeft = r.data.DATA;
      });
    },
    getCarouselRight() {
      Products.getBanner(3).then((r) => {
        this.CarouselRight = r.data.DATA;
      });
    },
  },
  mounted() {
    this.getCarouselLeft();
    this.getCarouselRight();
  },
};
</script>
