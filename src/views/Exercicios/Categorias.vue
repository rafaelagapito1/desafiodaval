<template>
  <section class="page-container">
    <Header></Header>

    <div class="content sm-gutter">
      <div class="container-fluid padding-25 sm-padding-10">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h5>Categorias</h5>
            </div>
            <div class="action text-left" style="width: 100%">
              <button
                type="button"
                class="btn btn-primary text-center"
                v-if="pages === 1"
                @click.prevent="pages = 2"
              >
                Cadastrar Categoria <i class="fas fa-plus"></i>
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
                class="select-default mb-3"
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
              <el-table
                v-if="tableData.length != 0"
                :data="queriedData"
                style="width: 100%"
                @row-click="rowClicked"
                :row-key="(row) => row.idParaOrganizar"
                :expand-row-keys="expandRowKeys"
                @expand-change="handleExpandChange"
                ref="tableData"
              >
                <el-table-column type="expand">
                  <template #default="props"> </template>
                </el-table-column>
                <el-table-column
                  label="ID"
                  prop="id"
                  width="100"
                ></el-table-column>
                <el-table-column
                  label="Nome da Categoria"
                  prop="categoria"
                ></el-table-column>
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
            <div class="block table-block mb-4" style="margin-top: 20px">
              <div class>
                <form @submit.prevent="SendImage()">
                  <div class="col-md-12">
                    <h4>Cadastro de Categoria</h4>
                  </div>

                  <div class="col-md-12">
                    <span>Nome da categoria</span>
                    <el-input
                      placeholder="Yoga"
                      v-model="nome_musculo"
                    ></el-input>
                  </div>
                  <br />
                  <div class="col-md-12 text-center">
                    <button
                      v-if="this.nome_musculo != null"
                      style="background: #19ad39; border: 1px solid #19ad39"
                      class="btn btn-primary ml-3"
                      type="submit"
                    >
                      <i class="el-icon-upload2"></i>
                      Cadastrar
                    </button>
                    <button
                      v-else
                      style="background: #19ad39; border: 1px solid #19ad39"
                      class="btn btn-primary ml-3"
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
export default {
  name: "Home",
  components: { Header },
  data() {
    return {
      render: false,
      fileImage: null,
      showModal: false,
      fileName: false,
      activetab: 1,
      nome_musculo: null,
      imagem_musculo: null,
      load: false,
      tableData: [],
      API: null,
      expandRowKeys: [],
      pages: 1,
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
      var file = this.$refs.loadImage.files[0];
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
        })
        .catch((e) => console.log("deu erro:", e));
    },

    SendImage() {
      this.load = true;
      let data = {
        categoria: this.nome_musculo,
      };
      Auth.CadastroCategoria(data)
        .then((r) => {
          console.log(r.data.resultado);
          if (r.data.resultado === "Categoria cadastrada anteriormente") {
            this.$notify({
              message: "Categoria já cadastrada!",
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
            title: "Error",
          });
        })
        .finally(() => {
          this.showModal = false;
          this.load = false;
          this.render = false;
          this.nome_musculo = null;
          this.getItens();
        });
    },
    getItens() {
      this.load = true;
      Auth.getCategoria()
        .then((r) => {
          this.tableData = r.data.categorias.reverse();
          let i = 0;
          for (; i <= this.tableData.length - 1; i++) {
            this.tableData[i].idParaOrganizar = i;
          }
        })
        .finally(() => {
          this.load = false;
        });
    },
  },
  mounted() {},
  created() {
    this.getItens();
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
</style>


