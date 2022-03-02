<template>
  <Header></Header>
  <section class="page-container" v-loading="load">
    <div class="page-content-wrapper">
      <!--Main Content-->
      <div class="content sm-gutter">
        <div class="container-fluid padding-25 sm-padding-10">
          <div class="row">
            <div class="col-12">
              <div class="section-title">
                <h4>Banco de Dados</h4>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">{{ Musculos.length }}</div>
                <i class="dripicons-stopwatch i-icon"></i>
                <p class="label">Exercícios</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">{{ tableData.length }}</div>

                <i class="dripicons-to-do i-icon"></i>
                <p class="label">Treinos</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">{{ Musculo.length }}</div>
                <i class="dripicons-user i-icon"></i>
                <p class="label">Músculos</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">{{ Equipamentos.length }}</div>
                <i class="dripicons-lifting i-icon"></i>
                <p class="label">Equipamentos</p>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3 col-lg-3">
              <div class="block counter-block mb-4">
                <div class="value">15</div>
                <i class="dripicons-cutlery i-icon"></i>
                <p class="label">Receitas</p>
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
                <h4>Dados</h4>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-6">
              <div class="block table-block mb-4">
                <div
                  class="block-heading d-flex align-items-center"
                  style="border: 0; padding-bottom: 0"
                >
                  <h5 class="text-truncate">Exercícios</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active active-2"
                          href="#"
                          @click.prevent="goTO('/exercicios')"
                          >Ver Mais</a
                        >
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
                            <tr v-for="(item, index) in Musculos.slice(0, 5)">
                              <td class="product">
                                <img
                                  class="product-img mCS_img_loaded"
                                  :src="API + '/' + item.imagem"
                                  alt
                                />
                              </td>
                              <td class="name">
                                <span class="span-title">{{ item.nome }}</span>
                              </td>
                              <td class="price price-td-home">
                                <a
                                  style="cursor: pointer"
                                  @click.prevent="deleteItem(item, 4)"
                                  ><i
                                    class="fa fa-trash"
                                    style="cursor: pointer"
                                  ></i
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
                  <h5 class="text-truncate">Treinos</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active active-2"
                          href="#"
                          @click.prevent="goTO('/Treino')"
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
                            <tr v-for="(item, index) in tableData.slice(0, 5)">
                              <td class="product">
                                <img
                                  class="product-img mCS_img_loaded"
                                  :src="API + '/' + item.imagem"
                                  alt
                                />
                              </td>
                              <td class="name">
                                <span class="span-title">{{ item.nome }}</span>
                              </td>
                              <td class="price price-td-home">
                                <a
                                  style="cursor: pointer"
                                  @click.prevent="deleteItem(item, 3)"
                                  ><i class="fa fa-trash"></i
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
                  <h5 class="text-truncate">Músculos</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active active-2"
                          href="#"
                          @click.prevent="goTO('/musculos')"
                          >Ver Mais</a
                        >
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
                            <tr v-for="(item, index) in Musculo.slice(0, 5)">
                              <td class="product">
                                <img
                                  class="product-img mCS_img_loaded"
                                  :src="API + '/' + item.imagem"
                                  alt
                                />
                              </td>
                              <td class="name">
                                <span class="span-title">{{ item.nome }}</span>
                              </td>
                              <td class="price price-td-home">
                                <a
                                  style="cursor: pointer"
                                  @click.prevent="deleteItem(item, 1)"
                                  ><i class="fa fa-trash"></i
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
                  <h5 class="text-truncate">Equipamentos</h5>
                  <div class="graph-pills graph-home">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active active-2"
                          href="#"
                          @click.prevent="goTO('/Equipamentos')"
                          >Ver Mais</a
                        >
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
                            <tr
                              v-for="(item, index) in Equipamentos.slice(0, 5)"
                            >
                              <td class="product">
                                <img
                                  class="product-img mCS_img_loaded"
                                  :src="API + '/' + item.imagem_equipamento"
                                  alt
                                />
                              </td>
                              <td class="name">
                                <span class="span-title">{{
                                  item.nome_equipamento
                                }}</span>
                              </td>
                              <td class="price price-td-home">
                                <a
                                  style="cursor: pointer"
                                  @click.prevent="deleteItem(item, 3)"
                                  ><i class="fa fa-trash"></i
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
import * as moment from "moment";
import Swal from "sweetalert2";
import Auth from "../../services/routes";
import Header from "../../components/Header/index.vue";
import lodash from "lodash";
import Multiselect from "@vueform/multiselect";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Vue3Html2pdf from "vue3-html2pdf";
import html2pdf from "html2pdf.js"
export default {
  name: "Home",
  components: { Header, Multiselect, QuillEditor, Vue3Html2pdf },
  data() {
    return {
 
      MusculosSelecionados: [],
      value: [],
      descricao: "",
      categoria: "",
      categorias: "",
      Musculo: "",
      Musculos: "",
      Equipamento: "",
      Equipamentos: "",
      render: false,
      fileImage: null,
      showModal: false,
      fileName: false,
      activetab: 1,
      referencia: "",
      nome: null,
      imagem_musculo: null,
      load: false,
      tableData: [],
      API: null,
      expandRowKeys: [],
      pages: 1,
      tipo: 1,
      name_video: false,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50, 100, 500, 1000],
        total: 0,
      },
    };
  },
  computed: {
    queriedData() {
      let result = lodash.orderBy(this.tableData, ["ID"], ["desc"]);
      /*
                                      let filtered = lodash.filter(result, item => {
                                        if(this.filter.filterDefault === "ALL") {
                                          return item.DES_FINANCE_CATEGORY.indexOf('') >=0;
                                        }
                                        else {
                                          return item.DES_FINANCE_CATEGORY.indexOf(this.filter.filterDefault) >=0;
                                        }  
                                      });

                                      this.tableDataFiltered = filtered
                                      */
      return result.slice(this.from, this.to);
    },
    pagedData() {
      if (!this.tableDataFiltered)
        return this.tableData.slice(this.from, this.to);
      else return this.tableDataFiltered.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      if (!this.tableDataFiltered)
        this.pagination.total = this.tableData.length;
      else this.pagination.total = this.tableDataFiltered.length;

      if (!this.tableDataFiltered) return this.tableData.length;
      else return this.tableDataFiltered.length;
    },
  },
  methods: {
 
    getItens() {
      this.load = true;
      Auth.getTreinos()
        .then((r) => {
          this.tableData = r.data.reverse();
          let i = 0;
          for (; i <= this.tableData.length - 1; i++) {
            this.tableData[i].idParaOrganizar = i;
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    getCategorias() {
      this.load = true;
      Auth.getCategoria()
        .then((r) => {
          this.categorias = r.data.categorias.reverse();
        })
        .finally(() => {
          this.load = false;
        });
    },
    getExercicios() {
      this.load = true;
      Auth.getExercicios()
        .then((r) => {
          this.Musculos = r.data.reverse();
          let i = 0;
          for (; i <= this.Musculos.length - 1; i++) {
            this.Musculos[i].value = this.Musculos[i].nome;
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    goTO(url) {
      this.$router.push(url);
    },
    getEquipamentos() {
      this.load = true;
      Auth.getEquipamento()
        .then((r) => {
          this.Equipamentos = r.data.equipamento.reverse();
        })
        .finally(() => {
          this.load = false;
        });
    },
    getMusculos() {
      this.load = true;
      Auth.getMusculo()
        .then((r) => {
          this.Musculo = r.data.musculos.reverse();
        })
        .finally(() => {
          this.load = false;
        });
    },
    deleteItem(row, index) {
      this.load = true;
      let data = {
        id: row.id,
        tabela: index,
      };
      Auth.deleteItem(data)
        .then((r) => {
          this.$notify({
            message: "Deletado com Sucesso!",
            title: "Sucesso",
            type: "success",
          });
        })
        .finally(() => {
          this.load = false;
          this.getItens();
          this.getCategorias();
          this.getExercicios();
          this.getEquipamentos();
          this.getMusculos();
        });
    },
  },
  mounted() {},
  created() {
    this.getItens();
    this.getCategorias();
    this.getExercicios();
    this.getEquipamentos();
    this.getMusculos();
    Auth.defaultW().then((r) => {
      this.API = r;
    });
  },
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