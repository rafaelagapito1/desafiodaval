<template>
  <Header></Header>
  <br />
  <Carousel :Carousel="Carousel"></Carousel>
  <!-- .block-banner -->
  <div class="block block-banner edit" id="edit">
    <div class="container">
      <div class="myorders">
        <div class="one" :style="'width: ' + one + '%'">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-menu-item index="1" @click="isCollapseF()">
              <i class="el-icon-menu"></i>
              <template #title>Menu</template>
            </el-menu-item>
            <el-menu-item @click="goTO('/myaccount')">
              <i class="el-icon-odometer" @click="goTO('/myaccount')"></i>
              <template #title>Dashboard</template>
            </el-menu-item>
            <el-menu-item @click="goTO('/edit-user')">
              <i class="el-icon-user" @click.prevent="goTO('/edit-user')"></i>
              <template #title @click.prevent="goTO('/edit-user')"
                >Editar Informações</template
              >
            </el-menu-item>
            <el-menu-item @click="goTO('/myorders')">
              <i
                class="el-icon-shopping-cart-2"
                @click.prevent="goTO('/myorders')"
              ></i>
              <template #title @click.prevent="goTO('/myorders')"
                >Meus Pedidos</template
              >
            </el-menu-item>
          </el-menu>
        </div>
        <div
          class="two myorder"
          :style="'width: ' + two + '%'"
          v-loading="userLoading"
        >
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                class="nav-link active"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                >Infomações do Usuário</a
              >
              <a
                class="nav-link"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
                >Foto de Perfil</a
              >
              <!-- 
              <a
                class="nav-link"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-contact"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
                >Senha</a
              >
              -->
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div class="row" v-if="userDATA">
                <div class="col-md-12">
                  <h3
                    style="
                      margin-top: 12px;
                      font-weight: 400;
                      margin-bottom: 20px;
                      text-transform: uppercase;
                    "
                  >
                    Editar Perfil
                  </h3>
                </div>
                <div class="col-md-12 row">
                  <div
                    class="col-md-8 text-left"
                    v-if="userDATA.TYPE_DOCUMENT_ID !== 2"
                  >
                    <label for="email "
                      ><i
                        class="fas fa-portrait"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >NOME</label
                    >
                    <input
                      disabled
                      type="email"
                      :placeholder="userDATA.NAME"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-4 text-left">
                    <label for="email "
                      ><i
                        class="fas fa-portrait"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >DOCUMENTO</label
                    >
                    <input
                      disabled
                      type="email"
                      :placeholder="userDATA.DOCUMENT"
                      class="form-control"
                    />
                  </div>
                </div>
                <div
                  class="col-md-12 row"
                  style="margin-bottom: 30px; margin-top: 30px"
                >
                  <div
                    class="col-md-4"
                    v-if="userDATA.TYPE_DOCUMENT_ID !== 2"
                  ></div>
                  <div
                    class="col-md-4 text-left"
                    v-if="userDATA.TYPE_DOCUMENT_ID == 2"
                  >
                    <label for="email "
                      ><i
                        class="fas fa-users"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >Razão Social</label
                    >
                    <input
                      disabled
                      type="text"
                      :placeholder="userDATA.SOCIAL_REASON"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-4 text-left">
                    <label for="email "
                      ><i
                        class="fas fa-envelope"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >EMAIL</label
                    >
                    <input
                      disabled
                      type="email"
                      :placeholder="userDATA.EMAIL"
                      class="form-control"
                    />
                  </div>
                  <div
                    class="col-md-4 text-left"
                    v-if="userDATA.TYPE_DOCUMENT_ID == 2"
                  >
                    <label for="email "
                      ><i
                        class="fas fa-portrait"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >TIPO DE PESSOA</label
                    >
                    <input
                      disabled
                      type="text"
                      placeholder="JURÍDICA"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-4 text-left" v-else>
                    <label for="email "
                      ><i
                        class="fas fa-portrait"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >TIPO DE PESSOA</label
                    >
                    <input
                      disabled
                      type="text"
                      placeholder="FÍSICA"
                      class="form-control"
                    />
                  </div>
                </div>

                <div
                  v-if="userDATA.TYPE_DOCUMENT_ID == 2"
                  class="col-md-12 row"
                  style="margin-bottom: 30px"
                >
                  <div class="col-md-6 text-left">
                    <label for="email ">
                      <i
                        class="fas fa-users"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >Nome Fantasia</label
                    >
                    <input
                      v-model="userDATA.FANTASY_NAME"
                      type="text"
                      :placeholder="userDATA.FANTASY_NAME"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 text-left">
                    <label for="email "
                      ><i
                        class="fas fa-users"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >REPRESENTANTE</label
                    >
                    <input
                      v-model="userDATA.REPRESENTATIVE"
                      type="text"
                      :placeholder="userDATA.REPRESENTATIVE"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-12 row" style="margin-bottom: 30px">
                  <div class="col-md-6 text-left" v-if="dateValid">
                    <label for="email ">
                      <i
                        class="fas fa-calendar-alt"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >DATA DE NASCIMENTO</label
                    >
                    <input
                      @mouseout="isValidDate()"
                      disabled
                      v-model="DT_BIRTHDAY"
                      type="text"
                      :placeholder="dateBRL(userDATA.DT_BIRTHDAY)"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 text-left" v-else>
                    <label for="email ">
                      <i
                        class="fas fa-calendar-alt"
                        style="margin-right: 5px; font-size: 20px"
                      ></i
                      >DATA DE NASCIMENTO</label
                    >
                    <input
                      @mouseout="isValidDate()"
                      v-maska="'##/##/####'"
                      v-model="DT_BIRTHDAY"
                      type="text"
                      :placeholder="dateBRL(userDATA.DT_BIRTHDAY)"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6 text-left">
                    <label for="document-type "
                      ><i
                        class="fas fa-globe-americas"
                        style="margin-right: 5px; font-size: 20px"
                      ></i>
                      Por favor, escolha o País.
                    </label>
                    <el-select
                      v-model="userDATA.COUNTRY_ID"
                      @change="onContry"
                      filterable
                      placeholder="..."
                      :default-first-option="true"
                    >
                      <el-option
                        v-for="item in allCountryDATA"
                        :key="item.ID"
                        :label="item.NAME"
                        :value="item.ID"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <!-- Brazil -->
                <div class="brazil col-md-12" v-if="brazilON">
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-6 text-left">
                      <label for="email ">TELEFONE </label>
                      <input
                        v-model="userDATA.PHONE"
                        type="text"
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                    <div class="col-md-6 text-left">
                      <label for="email ">CÓDIGO POSTAL</label>
                      <input
                        @change="buscaCep"
                        v-maska="'########'"
                        v-model="ZIP_CODE"
                        type="text"
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                      <p
                        style="
                          position: absolute;
                          color: red;
                          font-weight: 600;
                          margin-top: 2.5px;
                          font-size: 13px;
                        "
                        v-if="resultErroCep"
                      >
                        CEP inválido ou Inexistente
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-8 text-left">
                      <label for="email ">LOGRADOURO</label>
                      <input
                        type="text"
                        v-model="ADDRESS"
                        placeholder=""
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                    <div class="col-md-4 text-left">
                      <label for="email ">NÚMERO</label>
                      <input
                        type="text"
                        v-model="NUMBER"
                        v-maska="'#####'"
                        placeholder="..."
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-6 text-left">
                      <label for="email "> BAIRRO</label>
                      <input
                        type="email"
                        v-model="NEIGHBORHOOD"
                        placeholder=""
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>

                    <div class="col-md-6 text-left">
                      <label for="email ">COMPLEMENTO</label>
                      <input
                        type="text"
                        v-model="COMPLEMENT"
                        placeholder="..."
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-6 text-left">
                      <label for="email "> CIDADE</label>
                      <input
                        type="email"
                        v-model="CITY"
                        placeholder="São Paulo"
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                    <div class="col-md-6 text-left">
                      <label for="email ">ESTADO</label>
                      <el-input
                        disabled
                        v-model="STATE"
                        :placeholder="STATE"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <!-- End Brazil -->

                <div class="anotherContry col-md-12" v-else>
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-2 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-phone-volume"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >DDI
                      </label>
                      <input
                        v-maska="['+(##)', '+(###)']"
                        v-model="DDI"
                        type="text"
                        :disabled="countryON == true ? false : true"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-5 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-phone-volume"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >TELEFONE
                      </label>
                      <input
                        v-maska="'##################'"
                        v-model="PHONE"
                        type="text"
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                    <div class="col-md-5 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-map-marker-alt"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >CÓDIGO POSTAL</label
                      >
                      <input
                        v-maska="'##############'"
                        v-model="ZIP_CODE"
                        type="text"
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-8 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-map-marked-alt"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >LOGRADOURO</label
                      >
                      <input
                        type="text"
                        v-model="ADDRESS"
                        placeholder="..."
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                    <div class="col-md-4 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-map-marked-alt"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >NÚMERO</label
                      >
                      <input
                        type="text"
                        v-maska="'#####'"
                        v-model="NUMBER"
                        placeholder="..."
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-6 text-left">
                      <label for="email ">
                        <i
                          class="fas fa-map-marked-alt"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >BAIRRO</label
                      >
                      <input
                        type="email"
                        v-model="NEIGHBORHOOD"
                        placeholder=""
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>

                    <div class="col-md-6 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-map-marked-alt"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >COMPLEMENTO</label
                      >
                      <input
                        type="text"
                        v-model="COMPLEMENT"
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 row" style="margin-bottom: 30px">
                    <div class="col-md-6 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-map-marked-alt"
                          style="margin-right: 5px; font-size: 20px"
                        ></i>
                        CIDADE</label
                      >
                      <input
                        type="email"
                        v-model="CITY"
                        placeholder=""
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-6 text-left">
                      <label for="email "
                        ><i
                          class="fas fa-map-marked-alt"
                          style="margin-right: 5px; font-size: 20px"
                        ></i
                        >ESTADO</label
                      >
                      <input
                        type="text"
                        v-model="STATE"
                        class="form-control"
                        :disabled="countryON == true ? false : true"
                      />
                    </div>
                  </div>
                </div>
                <div class="req">
                  <ul>
                    <li style="text-align: left; color: #ff6a00">
                      Preencha todos os Campos Obrigatórios (*).
                    </li>
                    <li style="text-align: left; color: #ff6a00">
                      Quando inserir todas informações necessárias verifique
                      tudo antes de enviar!
                    </li>
                  </ul>
                </div>
                <div
                  class="col-md-12 text-center"
                  v-if="userDATA.TYPE_DOCUMENT_ID == 2"
                >
                  <el-button
                    v-if="
                      userDATA.FANTASY_NAME.length >= 4 &&
                      userDATA.REPRESENTATIVE.length >= 4 &&
                      PHONE.length >= 9 &&
                      ZIP_CODE.length >= 8 &&
                      ADDRESS.length >= 3 &&
                      NEIGHBORHOOD.length >= 3 &&
                      CITY.length >= 3 &&
                      STATE.length >= 2
                    "
                    style="margin-top: 12px"
                    type="primary"
                    round
                    @click="sendInfoCNPJ"
                    >Atualizar Cadastro CNPJ</el-button
                  >
                  <el-button
                    v-else
                    style="margin-top: 12px"
                    type="info"
                    round
                    disabled
                    >Atualizar Cadastro CNPJ</el-button
                  >
                </div>

                <div class="col-md-12 text-center" v-else>
                  <el-button
                    v-if="
                      DDI.length >= 2 &&
                      PHONE.length >= 9 &&
                      ZIP_CODE.length >= 8 &&
                      ADDRESS.length >= 3 &&
                      NEIGHBORHOOD.length >= 3 &&
                      CITY.length >= 3 &&
                      STATE.length >= 2
                    "
                    style="margin-top: 12px"
                    type="primary"
                    round
                    @click="sendInfo"
                    >Atualizar Cadastro</el-button
                  >
                  <el-button
                    v-else
                    style="margin-top: 12px"
                    type="info"
                    round
                    disabled
                    >Atualizar Cadastro
                  </el-button>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div class="row text-center" v-loading="loadimg">
                <div class="col-md-12" style="margin-bottom: 35px">
                  <p>Imagem Atual</p>
                  <img
                    style="
                      width: 200px;
                      height: 200px;
                      border-radius: 100%;
                      border: 1px solid #191928;
                    "
                    v-if="img"
                    :src="img"
                    alt=""
                  />
                  <img
                    v-else
                    src="../../assets/images/profile-user.png"
                    alt=""
                  />
                </div>
                <div class="col-md-12">
                  <div class="col" v-if="img">
                    <p>Para atualizar imagem por favor exclua a anterior.</p>
                    <a href="#" @click.prevent="removeImage()"
                      >Excluir Imagem</a
                    >
                  </div>
                  <form @submit.prevent="SendImage()" v-else>
                    <input
                      id="fileImage"
                      type="file"
                      class="
                        form-control form-control-sm
                        mb-2
                        custom-file-upload
                      "
                      ref="loadImage"
                      accept="image/*"
                      @change="loadImage()"
                    />
                    <button
                      style="background: #19ad39; border: 1px solid #19ad39"
                      class="btn btn-secondary ml-3"
                      type="submit"
                    >
                      <i class="el-icon-upload2"></i>
                      Enviar Imagem
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              B
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-banner / end -->
  <Footer></Footer>
</template>


<script>
// @ is an alias to /src
import Auth from "../../services/Auth";
import Header from "../../components/Header/index.vue";
import Carousel from "../MyAccount/components/Carousel";
import Footer from "../../components/Footer/index.vue";
import LeftBar from "./components/LeftBar.vue";
import Products from "../../services/Products";
import axios from "axios";
import * as moment from "moment";
export default {
  name: "myaccount",
  components: {
    Header,
    LeftBar,
    Carousel,
    Footer,
  },
  methods: {
    isCollapseF() {
      if (this.isCollapse == true) {
        this.isCollapse = false;
        this.one = 18;
        this.two = 82;
      } else {
        this.isCollapse = true;
        this.one = 6;
        this.two = 94;
      }
    },
    goTO(url) {
      this.$router.push(url);
    },
    isValidDate() {
      let BIRTHDAY = this.DT_BIRTHDAY.split("/").reverse().join("");
      const age = moment().diff(BIRTHDAY, "years");
      if (age >= 18 && age <= 100) {
        console.log("R:", age);
      } else {
        console.log("R", age);
        this.DT_BIRTHDAY = "01/01/2003";
        this.$notify.error({
          title: "Atualização necessária",
          message: "Por favor, insira uma  data de nascimento válida!",
        });
      }
    },
    getCarousel() {
      Products.getBanner("4").then((r) => {
        this.Carousel = r.data.DATA;
      });
    },
    removeImage() {
      this.loadimg = true;
      Products.RemoveImage(localStorage.getItem("userID"))
        .then((r) => {
          this.$notify({
            message: "Removido com Sucesso!",
            title: "Sucesso",
            type: "success",
          });
        })
        .catch((e) => {
          this.$notify({
            message: "Não foi possivel fazer esta ação",
            title: "Erro",
            type: "danger",
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.$router.push("/myaccount");
          }, 2000);
          //this.loadData2();
          //  console.clear();
        });
    },
    loadImage() {
      this.fileImage = this.$refs.loadImage.files[0];
    },
    SendImage() {
      this.loadimg = true;
      var file = this.fileImage;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        let data = {
          PROFILE_IMAGE: reader.result,
        };
        Products.SendImage(localStorage.getItem("userID"), data)
          .then((r) => {
            this.onRequest = false;
            alert("Imagem Enviada!!");
            setTimeout(() => {
              this.$router.push("/myaccount");
            }, 2000);
          })
          .catch((e) => {
            alert("Algo deu errado, Tente novamente!");
          })
          .finally(() => {
            this.onRequest = false;
            //  console.clear();
          });
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    getUserImage() {
      this.loadimg = true;
      Products.getUserImage(this.userDATA.ID)
        .then((r) => {
          console.log("verify:", r.data.DATA);
          this.img = r.data.DATA.Data;
          this.loadimg = false;
        })
        .catch((e) => {
          console.log("erro:", e);
          this.loadimg = false;
        });
    },
    buscaCep() {
      let data;
      this.resultErroCep = false;
      if (this.ZIP_CODE.length == 8) {
        axios
          .get(`https://ws.apicep.com/cep/${this.ZIP_CODE}.json`)
          .then((response) => {
            if (response.data.message) {
              this.resultErroCep = true;
              this.STATE = "";
              this.ADDRESS = "";
              this.CITY = "";
              this.NEIGHBORHOOD = "";
            } else {
              this.resultErroCep = false;
              (this.STATE = response.data.state),
                (this.ADDRESS = response.data.address),
                (this.CITY = response.data.city),
                (this.NEIGHBORHOOD = response.data.district);
            }
          })
          .catch((error) =>
            this.$message({
              showClose: true,
              type: "error",
              message: "Algo deu Errado, Tente novamente!",
              offset: 0,
            })
          );
      }
    },
    sendInfo() {
      let newDate = this.DT_BIRTHDAY.split("/").reverse().join("");
      //TELEFONE
      let newPHONE = this.PHONE.split("-").join("");
      newPHONE = newPHONE.split("(").join("");
      newPHONE = newPHONE.split(")").join("");
      newPHONE = newPHONE.split(" ").join("");
      //DDI
      let newDDI = this.DDI.split("-").join("");
      newDDI = newDDI.split("(").join("");
      newDDI = newDDI.split(")").join("");
      newDDI = newDDI.split("+").join("");

      let data = {
        DT_BIRTHDAY: newDate,
        COUNTRY_ID: this.COUNTRY_ID,
        ZIP_CODE: this.ZIP_CODE,
        ADDRESS: this.ADDRESS,
        NUMBER: this.NUMBER,
        COMPLEMENT: this.COMPLEMENT,
        NEIGHBORHOOD: this.NEIGHBORHOOD,
        CITY: this.CITY,
        STATE: this.STATE,
        DDI: newDDI,
        PHONE: newPHONE,
      };

      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");
      Auth.update(userID, data, token)
        .then((r) => {
          this.load = false;
          this.$notify.success({
            title: "Sucesso",
            message: "Perfil Atualizado, Aproveite nossa loja!",
            offset: 120,
            duration: 3000,
          });
          localStorage.setItem(
            "DT_BIRTHDAY",
            this.DT_BIRTHDAY.split("/").reverse().join("-")
          );
          setTimeout(() => {
            window.location.href = "/edit-user";
          }, 2000);
        })
        .catch((e) => {
          this.load = false;
          this.$message({
            showClose: true,
            type: "error",
            message: "ALGO DEU ERRADO, TENTE NOVAMENTE MAIS TARDE!",
            offset: 0,
          });
          setTimeout(() => {
            window.location.href = "/edit-user";
          }, 1000);
        });
    },
    sendInfoCNPJ() {
      this.load = true;
      let newDate = this.DT_BIRTHDAY.split("/").reverse().join("");
      //TELEFONE
      let newPHONE = this.PHONE.split("-").join("");
      newPHONE = newPHONE.split("(").join("");
      newPHONE = newPHONE.split(")").join("");
      newPHONE = newPHONE.split(" ").join("");
      //DDI
      let newDDI = this.DDI.split("-").join("");
      newDDI = newDDI.split("(").join("");
      newDDI = newDDI.split(")").join("");
      newDDI = newDDI.split("+").join("");

      let data = {
        DT_BIRTHDAY: newDate,
        // FANTASY_NAME: this.FANTASY_NAME,
        //   REPRESENTATIVE: this.REPRESENTATIVE,
        COUNTRY_ID: this.COUNTRY_ID,
        ZIP_CODE: this.ZIP_CODE,
        ADDRESS: this.ADDRESS,
        NUMBER: this.NUMBER,
        COMPLEMENT: this.COMPLEMENT,
        NEIGHBORHOOD: this.NEIGHBORHOOD,
        CITY: this.CITY,
        STATE: this.STATE,
        DDI: newDDI,
        PHONE: newPHONE,
      };

      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");
      Auth.updateCNPJ(userID, data, token)
        .then((r) => {
          this.load = false;
          this.$notify.success({
            title: "Sucesso",
            message: "Perfil Atualizado, Aproveite nossa loja!",
            offset: 120,
            duration: 3000,
          });
          localStorage.setItem(
            "DT_BIRTHDAY",
            this.DT_BIRTHDAY.split("/").reverse().join("-")
          );
          setTimeout(() => {
            window.location.href = "/edit-user";
          }, 2000);
        })
        .catch((e) => {
          this.load = false;
          this.$message({
            showClose: true,
            type: "error",
            message: "ALGO DEU ERRADO, TENTE NOVAMENTE MAIS TARDE!",
            offset: 0,
          });
          setTimeout(() => {
            window.location.href = "/edit-user";
          }, 1000);
        });
    },
    dateBRL(data) {
      // return data.split("-").reverse().join("/");
      return data.split("-").reverse().join("/");
    },
    //busca dados do usuário
    getUser() {
      this.userLoading = true;
      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");
      Auth.userInformation(userID, token)
        .then((r) => {
          this.userDATA = r.data.DATA;
          this.getUserImage();
          (this.ZIP_CODE = r.data.DATA.ZIP_CODE),
            (this.ADDRESS = r.data.DATA.ADDRESS),
            (this.NUMBER = r.data.DATA.NUMBER),
            (this.COMPLEMENT = r.data.DATA.COMPLEMENT),
            (this.NEIGHBORHOOD = r.data.DATA.NEIGHBORHOOD),
            (this.CITY = r.data.DATA.CITY),
            (this.STATE = r.data.DATA.STATE),
            (this.DDI = r.data.DATA.DDI),
            (this.PHONE = r.data.DATA.PHONE),
            console.log(r.data.DATA);
          this.userLoading = false;
        })
        .catch((e) => {
          this.userLoading = false;
          if (e.response.status == 403) {
            Auth.logout();
          }
        });
    },
    allCountry() {
      Auth.getCountry()
        .then((r) => {
          this.allCountryDATA = r.data.DATA;
        })
        .catch((e) => {
          if (e.response.status == 403) {
            Auth.logout();
          }
        });
    },
    allGenres() {
      Auth.getGenres()
        .then((r) => {
          this.allGenresDATA = r.data.DATA;
        })
        .catch((e) => {
          if (e.response.status == 403) {
            Auth.logout();
          }
        });
    },
    onContry() {
      (this.ZIP_CODE = ""),
        (this.ADDRESS = ""),
        (this.NUMBER = ""),
        (this.COMPLEMENT = ""),
        (this.NEIGHBORHOOD = ""),
        (this.CITY = ""),
        (this.STATE = ""),
        (this.DDI = ""),
        (this.PHONE = "");

      if (this.COUNTRY_ID !== null) {
        this.countryON = true;
      } else {
        this.countryON = false;
      }

      if (this.COUNTRY_ID == 27) {
        this.brazilON = true;
      } else {
        this.brazilON = false;
      }
      //reseta props do formulário
    },
  },
  created() {
    let BIRTHDAY = localStorage.getItem("DT_BIRTHDAY");
    const age = moment().diff(BIRTHDAY, "years");
    if (age >= 18 && age <= 100) {
      this.dateValid = true;
      console.log("R:", age);
    } else {
      console.log("R", age);
      this.dateValid = false;
    }
    this.getCarousel();
    //verifica login
    if (localStorage.getItem("token") !== null) {
      this.getUser();
      this.allCountry();
      this.allGenres();
    } else {
      console.log(`Logout`);
      Auth.logout();
    }
  },
  mounted() {},
  data() {
    return {
      one: 6,
      two: 94,
      isCollapse: true,
      dateValid: true,
      Carousel: "",
      loadimg: false,
      brazilON: true,
      countryON: true,
      userLoading: false,
      allCountryDATA: "",
      allGenresDATA: "",
      userConfirmed: false,
      userDATA: "",
      newUser: "",
      dataPhone: "",
      dataCode: "",
      optionsPhone: {
        placeholder: "(00) 0000-0000",
      },
      FANTASY_NAME: "",
      REPRESENTATIVE: "",
      DT_BIRTHDAY: "",
      COUNTRY_ID: "",
      ZIP_CODE: "",
      ADDRESS: "",
      NUMBER: "",
      COMPLEMENT: "",
      NEIGHBORHOOD: "",
      CITY: "",
      STATE: "",
      DDI: "",
      PHONE: "",
      value: "",
      resultErroCep: false,
      activetab: 1,
      img: null,
      fileImage: "",
    };
  },
};
</script>


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
  max-width: 70%;
  margin: 0 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  background: #fff;
  min-width: 70%;
  min-height: 50%;
  max-height: -webkit-max-content;
  max-height: -moz-max-content;
  max-height: max-content;
  padding-bottom: 15px;
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
  top: -20px;
  right: 5px;
  z-index: 10;
  background: #0078f5;
  border-radius: 50%;
  width: 30px;
  padding: 1px 4px;
  height: 30px;
  color: white;
  text-align: center;
  font-size: 30px;
}
.modal__close i {
  background: #0078f5;
  color: white;
  padding: 10px;
  border-radius: 50%;
}
</style>
<style scoped>
.myorder .BrowsingHistory {
  margin-top: 50px;
}

.myorder .table thead {
  background: #191928;
  border: none !important;
  color: white;
  background: linear-gradient(144deg, rgb(25 25 40) 0%, rgb(0 132 245) 100%);
}

.myorder .table tbody th {
  padding: 20px 10px;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  background: #fbfbfb;
}
.myorder .table tbody tr:hover th {
  background: #e8f4ff;
}
.myorder .table a,
a:hover {
  color: #0180ed;
}
.myorder .dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

.vfm--inset {
  z-index: 9 !important;
  top: 5%;
}

.modal__close {
  border: none;
  background: none;
}
.el-loading-mask {
  z-index: 1029 !important;
}

.modal__content .header {
  border-bottom: 1px solid #ececec;
  padding: 15px 0px 0px 2vw;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
}

.modal__content .header b {
  color: #8c8c8c;
  font-size: 19px;
}

.modal__content .header h4 {
  color: #0078f5;
  font-size: 30px;
}
.myorder .detalhes {
  padding: 2vw 2vw;
}
.myorder .detalhes h2 {
  font-size: 18px;
  color: #4c4c4c;
  text-transform: uppercase;
}
.myorder .detalhes .product_info {
  margin-bottom: 10px;
  padding: 1vw 1vw;
  background: #f5f5f5;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  border-radius: 2px;
}

.myorder .detalhes .product_info b {
  color: #8c8c8c;
  font-size: 12px;
}

.myorder .detalhes .product_info h5 {
  color: #191928;
  font-size: 15px;
}
.myorder .modal__content .content {
  height: 475px;
  overflow: scroll;
  overflow-x: hidden;
}
.myorder .frete .product_info {
  border-left: 4px solid #0078f5;
}
.myorder .frete p {
  margin: 0;
  font-size: 12px;
}
.myorder .frete .product_info h5 {
  color: #191928;
  font-size: 15px;
}

.myorder .frete .product_info b {
  color: #616161;
  font-size: 15px;
}
.myorder .totals {
  padding: 2vw 0px 0px 2vw;
}
.myorder .totals p {
  margin-bottom: 0;
  font-size: 15px;
}
::-webkit-scrollbar {
  width: 13px;
  height: 13px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(13deg, #737373 14%, #474747 64%);
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(13deg, #047dba 14%, #00ddff 64%);
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 0px;
  box-shadow: inset 7px 10px 12px #f0f0f0;
}

.myorder .box {
  border: 2px solid #eee;
  padding: 5px;
  padding-left: 15px;
  background-color: white;
}

.myorder .tags {
  padding: 3px;
  background-color: #eee;
  border-radius: 2px;
  border: 1px solid #bbb;
  margin-right: 2px;
}

.myorder .tags span {
  background-color: #ffcdd2;
  font-size: 11px;
  cursor: pointer;
  padding: 2px;
  color: #d32f2f;
  border: 1px solid #ef9a9a;
}

.myorder tr {
  cursor: pointer;
}

.myorder .add-suppliers {
  margin-top: 10px;
  border: 1px solid #0a285c;
  color: #ffffff;
  background-color: #0a285c;
}

.myorder .mb-5,
.myorder .my-5 {
  margin-bottom: 0rem !important;
}

.myorder .title-modal h2 {
  margin: 5px 0px;
  margin-top: -40px;
}

.myorder .el-table .cell,
.myorder .el-table--border td:first-child .cell,
.myorder .el-table--border th:first-child .cell {
  padding-left: 0;
}

.myorder .el-table .cell {
  padding-left: 0;
}
.myorder .el-select {
  width: 100%;
}
.myorder .error-msg {
  background: red;
  border-radius: 4px;
  padding: 0px 0px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.myorder .container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.myorder .tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px;
}

.myorder .tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.myorder .tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  color: #484848;
  margin-right: 5px;
}
.myorder .tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.myorder .tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.myorder .tabs a.active {
  background-color: #fff;
  color: #0a285c;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.myorder .tabcontent {
  padding: 5px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
}

@media (max-width: 1400px) {
  .myorder .modal__content .content {
    height: 360px;
  }
  .modal-content {
    top: 55px;
  }
}

.methods-pay {
  text-align: center;
}

.methods-pay .el-radio {
  width: 100%;
}
.methods-pay .item {
  padding: 1vw 0vw;
  background: white;
  border: 2px solid #e2e8f0;
  /* color: red; */
  border-radius: 10px;
}
.methods-pay .is-checked .item {
  color: #0078f5 !important;
  border: 2px solid #0078f5;
}

.methods-pay .item i {
  font-size: 50px;
  margin-bottom: 10px;
}

.cancel {
  background: #790000;
  padding: 15px 0px;
  text-align: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.copy i {
  position: absolute;
  font-size: 30px;
  background: #0078f5;
  color: white;
  padding: 10px;
  cursor: pointer;
  right: 15px;
}

.copy i:hover {
  background: rgb(4, 52, 104) !important;
}

.copy input {
  width: 100%;
  height: 50px;
  padding-left: 15px;
  margin-bottom: 15px;
}
.show-result h4 {
  color: #191928;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 15px;
}

.show-result b {
  color: #191928;
  text-transform: uppercase;
}

.show-result p {
  color: #191928;
  text-transform: uppercase;
}

.show-result .left {
  float: left;
  width: 50%;
}
.show-result .right {
  float: right;
  width: 50%;
  text-align: right;
}
.send-row {
  padding-bottom: 50px;
}
.el-message-box__status.el-icon-warning {
  color: #e63c3c !important;
}
.direct-transfer i {
  font-size: 70px;
  color: #2c6d03;
  margin-bottom: 15px;
}

.direct-transfer p {
  font-size: 25px;
  color: #2c6d03;
  font-weight: 600;
  margin-top: 80px;
}
</style>
<style>
#myorder .myorder .el-loading-mask {
  z-index: 9 !important;
}
#myorder .modal__content .el-loading-mask {
  z-index: 9 !important;
}

.content {
  border: 1px solid #cccccc;
  padding: 1vw 2vw 3vw 2vw;
}
</style>




<style scoped>
.ProductDetailss nav {
  position: relative;
  height: max-content;
  padding-top: 0px;
  margin-top: 60px;
}

.ProductDetailss .nav-tabs {
  width: max-content;
  position: absolute;
  top: -67px;
  left: 0;
  right: 0;
  margin: auto;
}

.ProductDetailss .tab-pane {
  border: 2px solid #d4d4d4;
  border-radius: 3px;
  padding: 75px 80px;
  margin-bottom: 50px;
}

.ProductDetailss .description h2 {
  margin-bottom: 25px;
}

.ProductDetailss .description p {
  margin-bottom: 25px;
}

.ProductDetailss .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background-color: #fbfbfb;
  border-color: transparent;
  border-bottom: 2px solid #191928;
}

.ProductDetailss .nav-tabs .nav-link {
  font-size: 20px;
  padding: 18px 48px;
  color: inherit;
  font-weight: 500;
  border-radius: 3px 3px 0 0;
  white-space: nowrap;
  transition: border-color 0.15s, background-color 0.15s;
}
.nav-tabs a {
  margin-left: 5px;
}
.ProductDetailss .nav-tabs .nav-link:hover {
  color: inherit;
  background: #f7f7f7;
  border-bottom-color: #d9d9d9;
}
.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  color: #525960;
  border-color: #fbfbfb;
  border-bottom: 2px solid #191928;
}

@media (max-width: 991px) {
  .ProductDetailss .nav-tabs {
    display: contents;
  }

  .ProductDetailss .nav-tabs .nav-link {
    font-size: 15px;
    padding: 5px 12px;
    border-left: 2px solid #d4d4d4;
    border-bottom: 0;
    margin-bottom: 5px;
  }

  .ProductDetailss .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    border-bottom: 0;
    border-left: 2px solid #191928;
  }

  .ProductDetailss .tab-pane {
    border: 2px solid #d4d4d4;
    border-radius: 3px;
    padding: 25px 25px;
    margin-bottom: 30px;
    margin-top: 10px;
  }

  .ProductDetailss nav {
    position: relative;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: max-content;
    padding-top: 0px;
    margin-top: -40px;
  }
  .block-header__title {
    margin-bottom: 0;
    font-size: 16px;
  }
}

.tab-content > .active {
  display: block;
  border: 1px solid #ededed;
  margin-top: -2px;
  padding: 3vw 4vw;
  min-height: 40vh;
}
</style>

<style>
.ProductDetailss .el-loading-mask {
  z-index: 1029 !important;
  background-color: rgb(255 255 255) !important;
}

input[type="file"]::-webkit-file-upload-button {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>


<style scoped>
.myorders {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: space-between;
}
</style>
<style>
.edit .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1000px;
}
.edit .el-menu--collapse {
  height: 1000px;
}

@media (max-width: 1024px) {
  #edit .one {
    width: 100% !important ;
  }

  #edit .el-menu--collapse {
    height: auto !important;
  }
  #edit .el-menu--collapse {
    height: auto;
    display: flex;
    flex-flow: initial;
    align-items: flex-start;
    align-content: space-between;
  }
  .el-menu {
    border-bottom: solid 1px #e6e6e6 !important;
    border-right: none !important;
    padding-left: 0px !important;
  }
  .el-menu--collapse {
    width: 100% !important;
  }
  .el-menu-item {
    width: 25% !important;
    text-align: center;
  }

  .el-menu-item.is-active {
    border-bottom: 1px solid #409eff;
  }
  .block.block-banner {
    margin-bottom: -20px !important;
  }
  .edit .two {
    margin-bottom: 10vw !important;
    padding-left: 0 !important;
    width: 100% !important;
  }
  #edit .modal__content .header h4 {
    font-size: 20px !important;
    margin-bottom: 0 !important;
  }
  #edit .modal__content .header p {
    font-size: 12px !important;
  }
  #myorder .modal__close {
    top: 0px !important;
    right: 0px !important;
  }
  .edit .tabs a {
    padding: 5px 5px !important;
    font-size: 12px !important;
  }
  #edit .modal__content .header {
    padding: 20px 0px 0px 2vw !important;
  }
  #edit .modal__content {
    height: max-content !important;
    overflow-x: hidden;
  }
  #edit .modal__content .col-9 {
    flex: 0 0 75%;
    max-width: 60%;
  }
  .myorder label {
    margin-top: 5px;
  }
}
</style>