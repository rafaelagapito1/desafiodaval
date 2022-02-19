<template>
  <Header></Header>
  <section class="page-container">
    <div class="page-content-wrapper">
      <!--Main Content-->
      <div class="content sm-gutter">
        <div class="container-fluid padding-25 sm-padding-10">
          <div class="row">
            <div class="col-12">
              <div class="section-title">
                <h4>Seções</h4>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">18</div>
                <i class="dripicons-stopwatch i-icon"></i>
                <p class="label">Exercícios</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">16</div>
                <i class="dripicons-to-do i-icon"></i>
                <p class="label">Workouts</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">8</div>
                <i class="dripicons-user i-icon"></i>
                <p class="label">Bodyparts</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">8</div>
                <i class="dripicons-lifting i-icon"></i>
                <p class="label">Equipments</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">4</div>
                <i class="dripicons-pulse i-icon"></i>
                <p class="label">Levels</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">4</div>
                <i class="dripicons-trophy i-icon"></i>
                <p class="label">Goals</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">15</div>
                <i class="dripicons-cutlery i-icon"></i>
                <p class="label">Recipes</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">9</div>
                <i class="dripicons-article i-icon"></i>
                <p class="label">Posts</p>
              </div>
            </div>

            <div class="col-12">
              <div class="section-title">
                <h4>Summary</h4>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6">
              <div class="block table-block mb-4">
                <div
                  class="block-heading d-flex align-items-center"
                  style="border: 0; padding-bottom: 0"
                >
                  <h5 class="text-truncate">Exercises</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active active-2" href="#">Ver Mais</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  class="custom-scroll mCustomScrollbar _mCS_2 mCS_no_scrollbar"
                  style="max-height: 250px"
                >
                  <div
                    id="mCSB_2"
                    class="mCustomScrollBox mCS-dark mCSB_vertical mCSB_inside"
                    tabindex="0"
                    style="max-height: none"
                  >
                    <div
                      id="mCSB_2_container"
                      class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                      style="position: relative; top: 0; left: 0"
                      dir="ltr"
                    >
                      <div class="table-responsive text-no-wrap">
                        <table class="table">
                          <tbody class="text-middle">
                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Reclining Triceps Press</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_e19();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Barbell High Pull</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_e18();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >90-degree Static Hold</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_e17();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title">Glutes Stretch</span>
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_e16();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Single-arm Medicine Ball Pushup</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_e15();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      id="mCSB_2_scrollbar_vertical"
                      class="
                        mCSB_scrollTools mCSB_2_scrollbar
                        mCS-dark
                        mCSB_scrollTools_vertical
                      "
                      style="display: none"
                    >
                      <div class="mCSB_draggerContainer">
                        <div
                          id="mCSB_2_dragger_vertical"
                          class="mCSB_dragger"
                          style="
                            position: absolute;
                            min-height: 30px;
                            height: 0px;
                            top: 0px;
                          "
                        >
                          <div
                            class="mCSB_dragger_bar"
                            style="line-height: 30px"
                          ></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6">
              <div class="block table-block mb-4">
                <div
                  class="block-heading d-flex align-items-center"
                  style="border: 0; padding-bottom: 0"
                >
                  <h5 class="text-truncate">Workouts</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active active-2" href=""
                          >Ver Mais
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  class="custom-scroll mCustomScrollbar _mCS_3 mCS_no_scrollbar"
                  style="max-height: 250px"
                >
                  <div
                    id="mCSB_3"
                    class="mCustomScrollBox mCS-dark mCSB_vertical mCSB_inside"
                    tabindex="0"
                    style="max-height: none"
                  >
                    <div
                      id="mCSB_3_container"
                      class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                      style="position: relative; top: 0; left: 0"
                      dir="ltr"
                    >
                      <div class="table-responsive text-no-wrap">
                        <table class="table">
                          <tbody class="text-middle">
                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >At-Home Cardio for Fat Loss</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a href=""
                                  ><i class="fa fa-cog a-i-color"></i
                                ></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_w16();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img
                                  class="product-img mCS_img_loaded"
                                  href=""
                                />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >The Ultimate Full-Body Landmine Workout</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a href=""
                                  ><i class="fa fa-cog a-i-color"></i
                                ></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_w15();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Real Man's Cardio Workout</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_w14();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Top It Off With This Full-Body Finisher</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_w13();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Level Up Your Triceps Routine</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_w12();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      id="mCSB_3_scrollbar_vertical"
                      class="
                        mCSB_scrollTools mCSB_3_scrollbar
                        mCS-dark
                        mCSB_scrollTools_vertical
                      "
                      style="display: none"
                    >
                      <div class="mCSB_draggerContainer">
                        <div
                          id="mCSB_3_dragger_vertical"
                          class="mCSB_dragger"
                          style="
                            position: absolute;
                            min-height: 30px;
                            height: 0px;
                            top: 0px;
                          "
                        >
                          <div
                            class="mCSB_dragger_bar"
                            style="line-height: 30px"
                          ></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6">
              <div class="block table-block mb-4">
                <div
                  class="block-heading d-flex align-items-center"
                  style="border: 0; padding-bottom: 0"
                >
                  <h5 class="text-truncate">Posts</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active active-2">Ver Mais</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  class="custom-scroll mCustomScrollbar _mCS_4 mCS_no_scrollbar"
                  style="max-height: 250px"
                >
                  <div
                    id="mCSB_4"
                    class="mCustomScrollBox mCS-dark mCSB_vertical mCSB_inside"
                    tabindex="0"
                    style="max-height: none"
                  >
                    <div
                      id="mCSB_4_container"
                      class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                      style="position: relative; top: 0; left: 0"
                      dir="ltr"
                    >
                      <div class="table-responsive text-no-wrap">
                        <table class="table">
                          <tbody class="text-middle">
                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >5 Ways to Torch Your Core in Every
                                  Workout</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_p9();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Even Light Exercise Can Help You Live
                                  Longer</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_p8();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >What to Do If Working Out Is Killing Your
                                  Knees</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_p7();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Jason Statham to Play Assassin in ‘Killer's
                                  Game': Report</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_p6();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Sly Stallone on Death Rumors: 'Ignore This
                                  Stupidity'</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_p5();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      id="mCSB_4_scrollbar_vertical"
                      class="
                        mCSB_scrollTools mCSB_4_scrollbar
                        mCS-dark
                        mCSB_scrollTools_vertical
                      "
                      style="display: none"
                    >
                      <div class="mCSB_draggerContainer">
                        <div
                          id="mCSB_4_dragger_vertical"
                          class="mCSB_dragger"
                          style="
                            position: absolute;
                            min-height: 30px;
                            height: 0px;
                            top: 0px;
                          "
                        >
                          <div
                            class="mCSB_dragger_bar"
                            style="line-height: 30px"
                          ></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6">
              <div class="block table-block mb-4">
                <div
                  class="block-heading d-flex align-items-center"
                  style="border: 0; padding-bottom: 0"
                >
                  <h5 class="text-truncate">Recipes</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active active-2">Ver Mais</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  class="custom-scroll mCustomScrollbar _mCS_5 mCS_no_scrollbar"
                  style="max-height: 250px"
                >
                  <div
                    id="mCSB_5"
                    class="mCustomScrollBox mCS-dark mCSB_vertical mCSB_inside"
                    tabindex="0"
                    style="max-height: none"
                  >
                    <div
                      id="mCSB_5_container"
                      class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                      style="position: relative; top: 0; left: 0"
                      dir="ltr"
                    >
                      <div class="table-responsive text-no-wrap">
                        <table class="table">
                          <tbody class="text-middle">
                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Slow-cooker Stuffed Peppers</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_r15();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Spring Pea Coconut Curry</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_r14();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Supergreen Candy Salad</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_r13();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >A nutritious, muscle-building breakfast</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_r12();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>

                            <tr>
                              <td class="product">
                                <img class="product-img mCS_img_loaded" />
                              </td>
                              <td class="name">
                                <span class="span-title"
                                  >Super-Easy Barbacoa &amp; Jicama Tacos</span
                                >
                              </td>
                              <td class="price price-td-home">
                                <a><i class="fa fa-cog a-i-color"></i></a>
                                <a
                                  style="cursor: pointer"
                                  onclick="alertdelete_r11();"
                                  ><i class="fa fa-trash-o a-i-color"></i
                                ></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      id="mCSB_5_scrollbar_vertical"
                      class="
                        mCSB_scrollTools mCSB_5_scrollbar
                        mCS-dark
                        mCSB_scrollTools_vertical
                      "
                      style="display: none"
                    >
                      <div class="mCSB_draggerContainer">
                        <div
                          id="mCSB_5_dragger_vertical"
                          class="mCSB_dragger"
                          style="
                            position: absolute;
                            min-height: 30px;
                            height: 0px;
                            top: 0px;
                          "
                        >
                          <div
                            class="mCSB_dragger_bar"
                            style="line-height: 30px"
                          ></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src test env
import { reactive, ref } from "vue";
import Header from "../../components/Header/index.vue";
import * as moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      Carousel: "",
      token: false,
    };
  },
  methods: {},
  mounted() {},
  created() {},
  setup() {
    const state = reactive({
      testes: "dCasa",
      numero: ref(0),
    });

    return {
      state,
    };
  },
};
</script>
