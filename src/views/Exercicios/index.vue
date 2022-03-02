<template>
  <section class="page-container">
    <Header></Header>
    <div class="content sm-gutter">
      <div class="container-fluid padding-25 sm-padding-10">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h5>Exercícios</h5>
            </div>
            <div class="action text-left" style="width: 100%">
              <button
                type="button"
                class="btn btn-primary text-center"
                v-if="pages === 1"
                @click.prevent="pages = 2"
              >
                Cadastrar Exercício  <i class="fas fa-plus"></i>
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-if="pages === 2"
                @click="pages = 1"
              >
                Voltar
              </button>
            </div>
            <br />
          </div>

          <div class="col-12" v-if="pages === 1">
            <div class="filter">
              <b> Por página</b> <br />
              <el-select
                class="select-default mb-3 responsive"
                style="width: 200px"
                v-model="pagination.perPage"
                placeholder="Por página"
              >
                <el-option
                  class="select-default"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>

            <div class="block table-block mb-4" style="margin-top: 20px">
              <h4>Exercícios Cadastrados</h4>

              <el-table
                v-if="tableData.length != 0"
                :data="queriedData"
                @row-click="rowClicked"
                :row-key="(row) => row.idParaOrganizar"
                :expand-row-keys="expandRowKeys"
                @expand-change="handleExpandChange"
                ref="tableData"
              >
                <el-table-column type="expand">
                  <template #default="props">
                    <div class="row content-table">
                      <div class="col-lg-12 editor">
                        <b>Descrição:</b>
                        <p v-html="props.row.descricao"></p>
                      </div>

                      <div class="col-lg-12">
                        <b>Link Youtube:</b>
                        <p>
                          <a :href="props.row.link" target="_BLANK"
                            >Ver Vídeo</a
                          >
                        </p>
                      </div>
                      <div class="col-lg-12" v-if="props.row.video">
                        <b>Arquivo Vídeo:</b>
                        <p>
                          <a :href="API + '/' + props.row.video" target="_BLANK"
                            >Ver Vídeo</a
                          >
                        </p>
                      </div>
                      <div class="col-lg-12">
                        <b>Músculos:</b>
                        <ul class="lista-ul">
                          <li
                            v-for="item in props.row.musculos"
                            :key="item.nome"
                          >
                            <span>
                              {{ item.nome + " "
                              }}<sup>{{ item.tipo + "°" }}</sup></span
                            >
                          </li>
                        </ul>
                      </div>
                      <div class="col-lg-12">
                        <b>Equipamentos:</b>
                        <ul class="lista-ul">
                          <li
                            v-for="item in props.row.equipamentos"
                            :key="item.nome"
                          >
                            <span> {{ item.nome }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Imagem">
                  <template #default="props">
                    <img
                      style="width: 70px"
                      :src="API + '/' + props.row.imagem"
                      alt
                    />
                  </template>
                </el-table-column>
                <el-table-column label="Nome" prop="nome"></el-table-column>
                <el-table-column
                  label="Categoria"
                  prop="categoria"
                ></el-table-column>
                <el-table-column
                  label="Referência"
                  prop="referencia"
                ></el-table-column>

                <el-table-column label="Ações" width="180">
                  <template #default="props">
                    <!-- <a
                      class="btn btn-small btn-primary"
                      href="#"
                      style="margin-right: 5px"
                      >Editar</a
                    > -->

                    <el-popconfirm
                      confirmButtonText="Sim"
                      cancelButtonText="Não"
                      icon="el-icon-info"
                      iconColor="red"
                      title="Deseja mesmo apagar?"
                      @confirm="deleteItem(props.row)"
                    >
                      <template #reference>
                        <el-button>Deletar</el-button>
                      </template>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
              <div class="row mt-3">
                <div class="col-md-12">
                  <div
                    slot="footer"
                    class="
                      col-12
                      d-flex
                      justify-content-center justify-content-sm-between
                      flex-wrap
                    "
                  >
                    <div class="">
                      <p class="card-category">
                        Mostrando {{ from + 1 }} à {{ to }} de
                        {{ total }}
                      </p>
                    </div>
                    <!-- <el-pagination
                      :page-size="pagination.total"
                      :pager-count="pagination.perPage"
                      layout="prev, pager, next"
                      :total="pagination.total"
                    >
                    </el-pagination> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12" v-if="pages === 2">
            <div
              class="block table-block mb-4"
              style="margin-top: 20px"
              v-loading="load"
            >
              <form @submit.prevent="SendImage()" class="row">
                <div class="col-md-12">
                  <h4>Cadastro de Exercício</h4>
                  <br />
                </div>

                <div class="col-12 col-md-6">
                  <p><b>Nome</b></p>
                  <el-input placeholder="" v-model="nome"></el-input>
                </div>
                <div class="col-12 col-md-6">
                  <p><b>Referência</b></p>
                  <el-input
                    placeholder=""
                    v-model="referencia"
                    @blur="verifica()"
                  ></el-input>
                </div>
                <br />
                <div class="col-12 editor">
                  <br />
                  <p>
                    <b>Descrição </b>
                  </p>
                  <QuillEditor
                    v-model:content="descricao"
                    content-type="html"
                    :modules="modules"
                    toolbar="full"
                    theme="snow"
                  />
                </div>
                <div class="col-12">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <div class="col-md-6">
                  <p><b>Link Youtube</b></p>
                  <el-input placeholder="" v-model="link"></el-input>
                </div>
                <div class="col-md-6">
                  <p><b>Categoria </b></p>
                  <el-select
                    v-model="categoria"
                    filterable
                    required
                    no-match-text="Nenhum registro encontrado"
                    placeholder="Selecione a Categoria"
                    :default-first-option="true"
                  >
                    <el-option
                      v-for="item in categorias"
                      :key="item.categoria"
                      :label="item.categoria"
                      :value="item.categoria"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="col-md-9">
                  <br />
                  <p><b>Músculos </b></p>
                  <div>
                    <Multiselect
                      searchable
                      noResultsText="Nenhum resultado encontrado!"
                      v-model="value"
                      placeholder="Escolha os Músculos"
                      label="nome"
                      :options="Musculos"
                    >
                      <template v-slot:singlelabel="{ value }">
                        <div class="multiselect-single-label">
                          <img
                            class="character-label-icon"
                            :src="API + '/' + value.imagem"
                          />
                          {{ value.nome }}
                        </div>
                      </template>

                      <template v-slot:option="{ option }">
                        <img
                          class="character-option-icon"
                          :src="API + '/' + option.imagem"
                        />
                        {{ option.nome }}
                      </template>
                    </Multiselect>
                  </div>
                </div>
                <div class="col-md-3 text-center">
                  <br /><br />
                  <button
                    @click.prevent="addMusculo()"
                    style="background: #19ad39; border: 1px solid #19ad39"
                    class="btn btn-secondary ml-3"
                  >
                    <i class="el-icon-plus"></i>
                    Adicionar
                  </button>
                </div>
                <div class="col-md-12" v-if="MusculosSelecionados != []">
                  <br />
                  <b>Músculos Escolhidos</b><br /><br />
                  <div class="row">
                    <div
                      class="col-md-4 editor_for"
                      style="margin-bottom: 20px"
                      v-for="(item, index) in MusculosSelecionados"
                      :key="index"
                    >
                      <p>
                        <span>{{ index + 1 + "°  " }}</span>
                        <b>Músculo: {{ item.nome }}</b>
                        <i
                          style="
                            cursor: pointer;
                            color: #890101;
                            margin-left: 10px;
                          "
                          class="fa fa-trash"
                          @click.prevent="exclude(index)"
                        ></i>
                      </p>
                      <br />
                      <el-radio-group v-model="item.tipo">
                        <el-radio-button label="1" value="1"
                          >Primário</el-radio-button
                        >
                        <el-radio-button label="2" value="2"
                          >Secundário</el-radio-button
                        >
                      </el-radio-group>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <br />
                  <p><b>Equipamentos </b></p>
                  <div>
                    <Multiselect
                      searchable
                      noResultsText="Nenhum resultado encontrado!"
                      v-model="Equipamento"
                      mode="tags"
                      placeholder="Escolha os Equipamentos"
                      track-by="nome_equipamento"
                      label="nome_equipamento"
                      :close-on-select="false"
                      :search="true"
                      :options="Equipamentos"
                    >
                      <template v-slot:singlelabel="{ value }">
                        <div class="multiselect-single-label">
                          <img
                            class="character-option-icon"
                            :src="API + '/' + value.imagem_equipamento"
                          />
                          {{ value.nome_equipamento }}
                        </div>
                      </template>

                      <template v-slot:option="{ option }">
                        <img
                          class="character-option-icon"
                          :src="API + '/' + option.imagem_equipamento"
                        />
                        {{ option.nome_equipamento }}
                        <span
                          v-if="!disabled"
                          class="multiselect-tag-remove"
                          @mousedown.prevent="handleTagRemove(option, $event)"
                        >
                          <span class="multiselect-tag-remove-icon"></span>
                        </span>
                      </template>
                    </Multiselect>
                  </div>
                </div>
                <div class="col-md-6">
                  <br />
                  <p><b>Vídeo do Exercício:</b></p>
                  <label
                    for="fileImage"
                    style="
                      background: #204f7f;
                      color: white;
                      padding: 1vw;
                      border-radius: 5px;
                      margin: 5px 0px 10px 0px;
                      width: 100%;
                      text-align: center;
                      cursor: pointer;
                    "
                    >Escolha o Arquivo <i class="el-icon-upload"></i
                  ></label>

                  <input
                    style="display: none"
                    id="fileImage"
                    type="file"
                    class="form-control form-control-sm mb-2 custom-file-upload"
                    ref="loadImage"
                    accept=".mp4"
                    @change="showFile()"
                  />
                  <br />
                  <p v-if="name_video">
                    <b>Nome do Arquivo:</b>
                  </p>
                  <span v-if="name_video">{{ name_video }}</span>
                </div>
                <div class="col-md-6">
                  <br />
                  <p><b>Imagem do Exercício:</b></p>
                  <label
                    for="fileImage2"
                    style="
                      background: #204f7f;
                      color: white;
                      padding: 1vw;
                      border-radius: 5px;
                      margin: 5px 0px 10px 0px;
                      width: 100%;
                      text-align: center;
                      cursor: pointer;
                    "
                    >Escolha o Arquivo <i class="el-icon-upload"></i
                  ></label>

                  <input
                    style="display: none"
                    id="fileImage2"
                    type="file"
                    class="form-control form-control-sm mb-2 custom-file-upload"
                    ref="loadImage2"
                    accept="image/*"
                    @change="showFile2()"
                  />
                  <br />
                  <p v-if="name_image">
                    <b>Nome do Arquivo:</b>
                  </p>
                  <span v-if="name_image">{{ name_image }}</span>
                </div>
                <div class="col-md-6">
                  <br />
                  <p><b>Infográfico:</b></p>
                  <label
                    for="fileImage3"
                    style="
                      background: #204f7f;
                      color: white;
                      padding: 1vw;
                      border-radius: 5px;
                      margin: 5px 0px 10px 0px;
                      width: 100%;
                      text-align: center;
                      cursor: pointer;
                    "
                    >Escolha o Arquivo <i class="el-icon-upload"></i
                  ></label>

                  <input
                    style="display: none"
                    id="fileImage3"
                    type="file"
                    class="form-control form-control-sm mb-2 custom-file-upload"
                    ref="loadImage3"
                    accept="image/*"
                    @change="showFile3()"
                  />
                  <br />
                  <p v-if="name_infografico">
                    <b>Nome do Arquivo:</b>
                  </p>
                  <span v-if="name_infografico">{{ name_infografico }}</span>
                </div>

                <div class="col-md-12 text-center">
                  <br />
                  <button
                    v-if="this.nome != null"
                    style="background: #19ad39; border: 1px solid #19ad39"
                    class="btn btn-secondary ml-3"
                    type="submit"
                  >
                    <i class="el-icon-upload2"></i>
                    Cadastrar
                  </button>
                  <button
                    v-else
                    style="background: #19ad39; border: 1px solid #19ad39"
                    class="btn btn-secondary ml-3"
                    disabled
                  >
                    <i class="el-icon-upload2"></i>
                    Cadastrar
                  </button>
                </div>
              </form>
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
export default {
  name: "Home",
  components: { Header, Multiselect, QuillEditor },
  data() {
    return {
      MusculosSelecionados: [],
      value: [],
      link: "",
      categoria: "",
      categorias: "",
      Musculo: [],
      Musculos: "",
      Equipamento: [],
      Equipamentos: "",
      render_img: false,
      render_infografico: false,
      render: false,
      fileImage: null,
      showModal: false,
      fileName: false,
      activetab: 1,
      referencia: "",
      descricao: "",
      nome: null,
      imagem_musculo: null,
      load: false,
      tableData: [],
      API: null,
      expandRowKeys: [],
      pages: 1,
      tipo: 1,
      name_video: false,
      name_image: false,
      name_infografico: false,
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
    addMusculo() {
      var obj = {};
      let i = 0;
      for (; i <= this.Musculos.length - 1; i++) {
        if (this.Musculos[i].nome === this.value) {
          obj.id = this.Musculos[i].id;
          obj.nome = this.Musculos[i].nome;
          obj.tipo = 1;
        }
      }
      this.MusculosSelecionados.push(obj);
    },

    handleExpandChange(row, expandedRows) {
      const id = row.idParaOrganizar;
      const lastId = this.expandRowKeys[0];
      // disable mutiple row expanded
      this.expandRowKeys = id === lastId ? [] : [id];
    },
    clicker() {},
    rowClicked(row) {
      this.$refs.tableData.toggleRowExpansion(row);
    },
    showFile() {
      this.load = true;
      var file = this.$refs.loadImage.files[0];
      this.name_video = this.$refs.loadImage.files[0].name;
      const getBase64 = (file) =>
        new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject("Error: ", error);
        });
      getBase64(file)
        .then((result) => {
          this.render = result;
          this.load = false;
        })
        .catch((e) => console.log("deu erro:", e));
    },
    showFile2() {
      this.load = true;
      var file = this.$refs.loadImage2.files[0];
      this.name_image = this.$refs.loadImage2.files[0].name;
      const getBase64 = (file) =>
        new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject("Error: ", error);
        });
      getBase64(file)
        .then((result) => {
          this.render_img = result;
          this.load = false;
        })
        .catch((e) => console.log("deu erro:", e));
    },
    showFile3() {
      this.load = true;
      var file = this.$refs.loadImage3.files[0];
      this.name_infografico = this.$refs.loadImage3.files[0].name;
      const getBase64 = (file) =>
        new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject("Error: ", error);
        });
      getBase64(file)
        .then((result) => {
          this.render_infografico = result;
          this.load = false;
        })
        .catch((e) => console.log("deu erro:", e));
    },
    SendImage() {
      this.load = true;
      let data = {
        nome: this.nome,
        arquivo: this.render,
        imagem: this.render_img,
        infografico: this.render_infografico,
        referencia: this.referencia,
        descricao: this.descricao,
        link: this.link,
        categoria: this.categoria,
        musculos: this.MusculosSelecionados,
        equipamentos: this.Equipamento,
      };
      console.log(data);
      Auth.CadastroExercicio(data)
        .then((r) => {
          console.log(r.data.resultado);
          if (r.data.resultado === "Exercício cadastrado anteriormente") {
            this.$notify({
              message: "Exercício já cadastrado!",
              title: "Falha!",
              type: "Error",
            });
          } else {
            this.$notify({
              message: "Cadastrado com Sucesso!",
              title: "Sucesso",
              type: "success",
            });
          }
        })
        .catch((e) => {
          this.$notify({
            message: "Não foi possivel fazer esta ação",
            title: "Erro",
            type: "danger",
          });
        })
        .finally(() => {
          this.showModal = false;
          this.load = false;
          this.render = false;
          this.nome = "";
          this.render_img = null;
          this.render_infografico = null;
          this.render = null;
          this.referencia = "";
          this.descricao = "";
          this.link = "";
          this.categoria = [];
          this.MusculosSelecionados = [];
          this.Equipamento = [];
          this.name_video = false;
          this.name_image = false;
          this.name_infografico = false;
          this.getItens();
          this.pages = 1;
        });
    },
    getItens() {
      this.load = true;
      Auth.getExercicios()
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
    getMusculos() {
      this.load = true;
      Auth.getMusculo()
        .then((r) => {
          this.Musculos = r.data.musculos.reverse();
          let i = 0;
          for (; i <= this.Musculos.length - 1; i++) {
            this.Musculos[i].value = this.Musculos[i].nome;
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    getEquipamentos() {
      this.load = true;
      Auth.getEquipamento()
        .then((r) => {
          this.Equipamentos = r.data.equipamento.reverse();
          let i = 0;
          for (; i <= this.Equipamentos.length - 1; i++) {
            this.Equipamentos[i].value = this.Equipamentos[i].nome_equipamento;
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    exclude(index) {
      let products = this.MusculosSelecionados;
      products.splice(index, 1);
    },
    verifica() {
      let data = {
        id: this.referencia,
      };
      Auth.verificaReferencia(data)
        .then((r) => {
          if (r.data.resultado === 1) {
            this.referencia = '';
            this.$notify({
              message: "Referência já utilizada!",
              title: "Erro",
              type: "danger",
            });
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
    deleteItem(row) {
      this.load = true;
      let data = {
        id: row.id,
        tabela: 4,
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
        });
    },
  },
  mounted() {},
  created() {
    this.getItens();
    this.getCategorias();
    this.getMusculos();
    this.getEquipamentos();
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


<style scoped>
.conteudo-interno {
  padding: 2vw;
}
</style>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 85%;
  max-width: 55%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  margin: 0 2rem 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__content {
  flex-grow: 1;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style><style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

.vfm--inset {
  z-index: 9999999999999999 !important;
}

.modal__close {
  border: none;
  background: none;
}
</style>



<style>
.el-notification .el-icon-success {
  color: green;
}
.el-select {
  width: 100%;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #f1f1f1;
}

h3 {
  margin-top: 0;
}

.example {
  background: #ffffff;
  margin: 20px;
  border-color: #e7e7e7;
  padding: 40px;
}

.example pre {
  background: #1f2937;
  padding: 18px 20px;
  overflow-x: scroll;
  font-size: 0.85em;
}

.output {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  background: #000000;
  color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-size: 13px;
}

.multiselect-tag.is-user {
  padding: 5px 8px;
  border-radius: 22px;
  background: #35495e;
  margin: 3px 3px 8px;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.user-image {
  margin: 0 6px 0 0;
  border-radius: 50%;
  height: 22px;
}

.character-option-icon {
  margin: 0 6px 0 0;
  height: 22px;
}

.character-label-icon {
  margin: 0 6px 0 0;
  height: 26px;
}

.toolbar {
  margin-right: 5px;

  button {
    cursor: pointer;
  }
}

code,
pre {
  color: #f8f8f2;
  background: none;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  font-size: 14px;
  line-height: 1.75;
  border-radius: 8px;
}

/* Code blocks */
pre {
  overflow: auto;
  padding: 1.5rem;
}

/* Inline code */
:not(pre) > code {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6272a4;
}

.token.punctuation {
  color: #f8f8f2;
}

.namespace {
  opacity: 0.7;
}

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
  color: #46ffe2;
}

.token.boolean,
.token.number {
  color: #bd93f9;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin {
  color: #50fa7b;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string,
.token.variable {
  color: #f8f8f2;
}

.token.atrule,
.token.attr-value,
.token.function,
.token.class-name {
  color: #f1fa8c;
}

.keyword-highlight {
  padding: 0 2px;
  position: relative;

  &::after {
    content: "";
    background: currentColor;
    position: absolute;
    opacity: 0.25;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
}

.token.keyword {
  color: #21d8ff;
}

.token.regex,
.token.important {
  color: #ffb86c;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.character-option-icon {
  height: 60px;
}
.ql-editor p,
ul li {
  color: black !important;
}
.lista-ul img {
  width: 100%;
  border-radius: 20px 20px 0px 0px;
}
.lista-ul li {
  width: auto;
  background: #2565d9;
  margin-bottom: 8px;
  margin-right: 5px;
  text-align: center;
  color: white !important;
  font-weight: bold;
  border-radius: 20px;
  padding: 4px 20px;
  font-size: 11px;
  margin-top: 5px;
}
.lista-ul span {
  text-transform: uppercase;
}

.lista-ul {
  display: flex;
  list-style-type: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}

@media screen and (max-width: 1024px) {
  .editor {
    margin-bottom: 120px;
  }
}
</style>


<style src="@vueform/multiselect/themes/default.css"></style>