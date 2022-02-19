<template>
  <div class="container CategoriesSlide">
    <div class="">
      <splide :options="options" :slides="categories">
        <splide-slide v-for="category in categories" :key="category.ID">
          <div
            class="item"
            @click.prevent="goTO('/search/default/' + category.ID)"
          >
            <div class="shadow-effect">
              <img class="" :src="category.IMAGE_LIST[0].URL" alt="" />
              <div class="item-details">
                <p>{{ capitalize(category.DESCRIPTION.toLowerCase()) }}</p>
              </div>
            </div>
          </div>
        </splide-slide>
      </splide>
    </div>
  </div>
</template>
<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import Products from "../../services/Products";

export default {
  name: "Categories",
  components: {},
  methods: {
    goTO(url) {
      this.$router.push(url);
    },
    capitalize(value) {
      let string = "";
      const splited = value.split(" ");

      splited.forEach((partOfString) => {
        if (partOfString != "e")
          string +=
            string.length == 0
              ? partOfString.charAt(0).toUpperCase() +
                partOfString.slice(1) +
                " "
              : " " +
                partOfString.charAt(0).toUpperCase() +
                partOfString.slice(1) +
                " ";
        else string += " " + partOfString + " ";
      });

      return string;
    },
  },
  mounted() {
    Products.getDashboardInfo().then((response) => {
      this.categories = response.data.DATA.CATEGORIES;
    });
  },
  data() {
    return {
      categories: [],
      options: {
        type: "loop",
        autoplay: true,
        rewind: true,
        gap: "10px",
        perPage: 7,
        perMove: 1,
        arrows: true,
        pagination: false,
        classes: {
          prev: "splide-class-prev",
          next: " splide-class-next",
        },
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
</script>

<style scoped>
.splide__arrow svg {
  width: 2.5em;
  height: 2.5em;
  fill: #6a8da5 !important;
}
.splide__slide img {
  vertical-align: bottom;
  width: 100%;
}
.splide {
  padding: 0;
}
.CategoriesSlide {
  margin-top: 30px;
  margin-bottom: 50px;
}

.splide__slide {
  padding: 2px 2px;
  border: 1px solid transparent;
}
.splide__slide p {
  margin-top: 0;
  margin-bottom: 0;
}
.splide .item-details {
  min-height: 60px;
  padding: 5px 15px;
  margin-top: 5px;
  font-weight: bold;
}
.splide__slide:hover {
  border: 1px solid #6a8da5;
  cursor: pointer;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .CategoriesSlide {
    margin-top: 10px;
    margin-bottom: 25px;
    padding: 0vw 45px;
  }

  .splide__slide {
    text-align: center;
  }
  .splide__slide img {
    vertical-align: bottom;
    width: 75%;
  }
  .splide__slide p {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
  }
}
</style>