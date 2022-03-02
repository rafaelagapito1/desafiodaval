<template>
  <section class="page-container">
    <Header></Header>

    <div class="content sm-gutter">
      <div class="container-fluid padding-25 sm-padding-10">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h5>Treinos</h5>
            </div>
            <div class="action text-left" style="width: 100%">
              <button
                type="button"
                class="btn btn-primary text-center"
                v-if="pages === 1"
                @click.prevent="pages = 2"
              >
                Cadastrar Treinos  <i class="fas fa-plus"></i>
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
                placeholder="Per page"
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
              <h4>Treinos Cadastrados</h4>

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
                      <div class="col-lg-12 text-center">
                        <el-button type="success" round @click="open(props.row)"
                          >Visualizar Treino</el-button
                        >
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
                  <h4>Cadastro de Treino</h4>
                  <br />
                </div>

                <div class="col-md-12">
                  <p><b>Nome</b></p>
                  <el-input placeholder="" v-model="nome"></el-input>
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
                </div>

                <div class="col-md-9">
                  <br />
                  <p><b>Exercícios </b></p>
                  <div>
                    <Multiselect
                    searchable
                      noResultsText="Nenhum resultado encontrado!"
                      v-model="value"
                      placeholder="Escolha os Exercícios"
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
                  <b>Exercícios Escolhidos</b><br /><br />
                  <div class="row">
                    <div
                      class="col-md-12 editor_for"
                      style="margin-bottom: 100px"
                      v-for="(item, index) in MusculosSelecionados"
                      :key="index"
                    >
                      <p>
                        <span>{{ index + 1 + "°  " }}</span>
                        <b>Sets e Repetições: {{ item.nome }}</b>
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
                      <QuillEditor
                        v-model:content="item.descricao"
                        content-type="html"
                        :modules="modules"
                        toolbar="full"
                        theme="snow"
                      />
                      <br /><br />
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <br />
                  <br />
                  <br />
                  <br />
                  <p><b>Image do Treino:</b></p>
                  <label
                    for="fileImage"
                    style="
                      background: #204f7f;
                      color: white;
                      padding: 1vw;
                      border-radius: 5px;
                      margin: 5px 0px 10px 0px;
                    "
                    >Escolha o Arquivo</label
                  >

                  <input
                    style="display: none"
                    id="fileImage"
                    type="file"
                    class="form-control form-control-sm mb-2 custom-file-upload"
                    ref="loadImage"
                    accept="/*"
                    @change="showFile()"
                  />
                  <br />
                  <p v-if="name_video">
                    <b>Nome do Arquivo:</b>
                  </p>
                  <span v-if="name_video">{{ name_video }}</span>
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
    open(dados) {
      console.log(dados);
    },
    addMusculo() {
      var obj = {};
      let i = 0;
      for (; i <= this.Musculos.length - 1; i++) {
        if (this.Musculos[i].nome === this.value) {
          obj.id = this.Musculos[i].id;
          obj.nome = this.Musculos[i].nome;
          obj.descricao = "";
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
          console.log(result);
          this.load = false;
        })
        .catch((e) => console.log("deu erro:", e));
    },
    SendImage() {
      this.load = true;
      let data = {
        nome: this.nome,
        imagem: this.render,
        descricao: this.descricao,
        exercicios: this.MusculosSelecionados,
      };
      console.log(data);
      Auth.CadastroTreino(data)
        .then((r) => {
          console.log(r.data.resultado);
          if (r.data.resultado === "Treino cadastrado com sucesso") {
            this.$notify({
              message: "Cadastrado com Sucesso!",
              title: "Sucesso",
              type: "success",
            });
          } else {
            this.$notify({
              message: "Equipamento já cadastrado!",
              title: "Falha!",
              type: "Error",
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
          this.getItens();
          this.pages = 1;
        });
    },
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
    getEquipamentos() {
      this.load = true;
      Auth.getCategoria()
        .then((r) => {
          this.categorias = r.data.categorias.reverse();
        })
        .finally(() => {
          this.load = false;
        });
    },
    deleteItem(row) {
      this.load = true;
      let data = {
        id: row.id,
        tabela: 3,
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
    exclude(index) {
      let products = this.MusculosSelecionados;
      products.splice(index, 1);
    },
  },
  mounted() {},
  created() {
    this.getItens();
    this.getCategorias();
    this.getExercicios();
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
@media screen and (max-width: 780px) {
  .editor_for {
    width: 100%;
    margin-bottom: 215px !important;
  }
  .editor {
    width: 100%;
    margin-bottom: 115px !important;
  }
}
</style>


<style src="@vueform/multiselect/themes/default.css"></style>