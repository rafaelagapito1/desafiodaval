<template>
  <div class="login">
    <div class="login-form text-center" v-loading="load">
      <div class="logo">
        <img src="../../assets/images/logo-vg.png" alt="" />
      </div>
      <!-- .block-banner -->
      <div class="block block-banner" style="margin-bottom: 30px">
        <div class="container" v-if="userConfirmed">
          <div class="row" style="min-height: 50vh"></div>
        </div>
        <div v-else class="container">
          <div class="row">
            <div class="col-md-12">
              <h3 style="margin-top: 20px; font-weight: 400">
                Bem vindo,
                <pre class="pre-name" v-if="userDATA.TYPE_DOCUMENT_ID == 2"
                  >{{ userDATA.SOCIAL_REASON }}!</pre
                >
                <pre class="pre-name" v-else>{{ userDATA.NAME }}!</pre>
              </h3>
              <p>Precisamos concluir seu cadastro, vamos continuar ?</p>
            </div>
            <div
              class="col-md-12 row"
              style="margin-bottom: 30px; margin-top: 30px; padding: 0px 30px;"
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
                    style="margin-right: 5px; font-size: 15px"
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
                    style="margin-right: 5px; font-size: 15px"
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
                    style="margin-right: 5px; font-size: 15px"
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
                    style="margin-right: 5px; font-size: 15px"
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
                    style="margin-right: 5px; font-size: 15px"
                  ></i
                  >Nome Fantasia</label
                >
                <input
                  v-model="FANTASY_NAME"
                  type="text"
                  placeholder="..."
                  class="form-control"
                />
              </div>
              <div class="col-md-6 text-left">
                <label for="email "
                  ><i
                    class="fas fa-users"
                    style="margin-right: 5px; font-size: 15px"
                  ></i
                  >REPRESENTANTE</label
                >
                <input
                  v-model="REPRESENTATIVE"
                  type="text"
                  placeholder="..."
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-12 row" style="margin-bottom: 30px;    padding: 15px 30px;">
              <div class="col-md-6 text-left">
                <label for="email ">
                  <i
                    class="fas fa-calendar-alt"
                    style="margin-right: 5px; font-size: 15px"
                  ></i
                  >DATA DE NASCIMENTO</label
                >
                <input
                @mouseout="isValidDate()"
                  v-maska="'##/##/####'"
                  v-model="DT_BIRTHDAY"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  class="form-control"
                />
              </div>
              <div class="col-md-6 text-left">
                <label for="document-type "
                  ><i
                    class="fas fa-globe-americas"
                    style="margin-right: 5px; font-size: 15px"
                  ></i>
                  Por favor, escolha o País.
                </label>
                <el-select
                  v-model="COUNTRY_ID"
                  @change="onContry"
                  filterable
                  placeholder="..."
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
            <div class="brazil col-md-12 " v-if="brazilON">
              <div class="col-md-12 row" style="margin-bottom: 30px">
                <div class="col-md-2 text-left">
                  <label for="email ">
                    <i
                      class="fas fa-phone-volume"
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
                    ></i
                    >TELEFONE
                  </label>
                  <input
                    v-maska="['(##) ####-####', '(##) #####-####']"
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
                      style="margin-right: 5px; font-size: 15px"
                    ></i
                    >CÓDIGO POSTAL</label
                  >
                  <input
                    @keyup="buscaCep"
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
                  <label for="email "
                    ><i
                      class="fas fa-map-marked-alt"
                      style="margin-right: 5px; font-size: 15px"
                    ></i
                    >LOGRADOURO</label
                  >
                  <input
                    type="text"
                    v-model="ADDRESS"
                    placeholder="Av. Faria Lima"
                    class="form-control"
                    :disabled="countryON == true ? false : true"
                  />
                </div>
                <div class="col-md-4 text-left">
                  <label for="email "
                    ><i
                      class="fas fa-map-marked-alt"
                      style="margin-right: 5px; font-size: 15px"
                    ></i
                    >NÚMERO</label
                  >
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
                  <label for="email ">
                    <i
                      class="fas fa-map-marked-alt"
                      style="margin-right: 5px; font-size: 15px"
                    ></i
                    >BAIRRO</label
                  >
                  <input
                    type="email"
                    v-model="NEIGHBORHOOD"
                    placeholder="Centro"
                    class="form-control"
                    :disabled="countryON == true ? false : true"
                  />
                </div>

                <div class="col-md-6 text-left">
                  <label for="email "
                    ><i
                      class="fas fa-map-marked-alt"
                      style="margin-right: 5px; font-size: 15px"
                    ></i
                    >COMPLEMENTO</label
                  >
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
                  <label for="email "
                    ><i
                      class="fas fa-map-marked-alt"
                      style="margin-right: 5px; font-size: 15px"
                    ></i>
                    CIDADE</label
                  >
                  <input
                    type="email"
                    v-model="CITY"
                    placeholder="São Paulo"
                    class="form-control"
                    :disabled="countryON == true ? false : true"
                  />
                </div>
                <div class="col-md-6 text-left">
                  <label for="email "
                    ><i
                      class="fas fa-map-marked-alt"
                      style="margin-right: 5px; font-size: 15px"
                    ></i
                    >ESTADO</label
                  >
                  <input
                    type="text"
                    v-model="STATE"
                    placeholder="SP"
                    class="form-control"
                    :disabled="countryON == true ? false : true"
                  />
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
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
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
                      style="margin-right: 5px; font-size: 15px"
                    ></i>
                    CIDADE</label
                  >
                  <input
                    type="email"
                    v-model="CITY"
                    placeholder=""
                    class="form-control"
                    :disabled="countryON == true ? false : true"
                  />
                </div>
                <div class="col-md-6 text-left">
                  <label for="email "
                    ><i
                      class="fas fa-map-marked-alt"
                      style="margin-right: 5px; font-size: 15px"
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
                  Quando inserir todas informações necessárias verifique tudo
                  antes de enviar!
                </li>
              </ul>
            </div>
            <div
              class="col-md-12 text-center"
              v-if="userDATA.TYPE_DOCUMENT_ID == 2"
            >
              <el-button
                v-if="
                  DT_BIRTHDAY.length >= 10 &&
                  FANTASY_NAME.length >= 4 &&
                  REPRESENTATIVE.length >= 4 &&
                  DDI.length >= 2 &&
                  PHONE.length >= 9 &&
                  ZIP_CODE.length >= 8 &&
                  NUMBER.length >= 1 &&
                  ADDRESS.length >= 3 &&
                  NEIGHBORHOOD.length >= 3 &&
                  CITY.length >= 3 &&
                  STATE.length >= 2
                "
                style="margin-top: 12px"
                type="primary"
                round
                @click="sendInfoCNPJ"
                >Concluir Cadastro CNPJ</el-button
              >
              <el-button
                v-else
                style="margin-top: 12px"
                type="info"
                round
                disabled
                >Concluir Cadastro CNPJ</el-button
              >
            </div>

            <div class="col-md-12 text-center" v-else>
              <el-button
                v-if="
                  DT_BIRTHDAY.length >= 10 &&
                  DDI.length >= 2 &&
                  PHONE.length >= 9 &&
                  ZIP_CODE.length >= 8 &&
                  NUMBER.length >= 1 &&
                  ADDRESS.length >= 3 &&
                  NEIGHBORHOOD.length >= 3 &&
                  CITY.length >= 3 &&
                  STATE.length >= 2
                "
                style="margin-top: 12px"
                type="primary"
                round
                @click="sendInfo"
                >Concluir Cadastro</el-button
              >
              <el-button
                v-else
                style="margin-top: 12px"
                type="info"
                round
                disabled
                >Concluir Cadastro
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- .block-banner / end -->
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-item + .breadcrumb-item:before {
  display: block;
}

.breadcrumb-item {
  position: relative;
  padding-right: 11px;
}

.breadcrumb {
  background: transparent;
  padding: 0;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 0;
  margin: 21px 0px 15px 0px;
}

.breadcrumb-item.active {
  color: #4dcbf7;
}
</style>

<script>
// @ is an alias to /src
import { reactive, ref } from "vue";
import Auth from "../../services/Auth";
import ApiAddressHelper from "../../services/ApiAddressHelper";
import Header from "../../components/Header/index.vue";
import Carousel from "../MyAccount/components/Carousel";
import Footer from "../../components/Footer/index.vue";
import axios from "axios";
import * as moment from "moment";
export default {
  name: "confirm-register",
  components: {
    Header,
    Carousel,
    Footer,
  },
  methods: {
      isValidDate() {
        let BIRTHDAY = this.DT_BIRTHDAY.split("/").reverse().join("");
      const age = moment().diff(BIRTHDAY, "years");
      if (age >= 18 && age <= 100) {
        console.log("R:", age);
      } else {
        console.log("R", age);
        this.DT_BIRTHDAY = '01/01/2003';
      this.$message({
              showClose: true,
              type: "error",
              message: "insira uma  data de nascimento válida!!",
              offset: 0,
            })
      }
    },
    buscaCep() {
      let data;
      if (this.ZIP_CODE.length == 8) {
        axios
          .get(`https://viacep.com.br/ws/${this.ZIP_CODE}/json/`)
          .then(
            (response) => (
              response.data.erro == true
                ? (this.resultErroCep = true)
                : (this.resultErroCep = false),
              (this.STATE = response.data.uf),
              (this.ADDRESS = response.data.logradouro),
              (this.CITY = response.data.localidade),
              (this.NEIGHBORHOOD = response.data.bairro)
            )
          )
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
            message: "Cadastro Concluído, Aproveite nossa loja!",
            offset: 120,
            duration: 3000,
          });
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/login";
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
            window.location.href = "/";
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
        FANTASY_NAME: this.FANTASY_NAME,
        REPRESENTATIVE: this.REPRESENTATIVE,
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
      Auth.updateCNPJ(userID, data, token)
        .then((r) => {
          this.load = false;
          this.$notify.success({
            title: "Sucesso",
            message: "Cadastro Concluído, Aproveite nossa loja!",
            offset: 120,
            duration: 3000,
          });
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/login";
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
            window.location.href = "/";
          }, 1000);
        });
    },
    verifyConfirm() {
      //verifica se já foi confirmado
      if (localStorage.getItem("Verified_Data_User") == 1) {
        this.userConfirmed = true;
        window.location.href = "/";
      }
    },
    //busca dados do usuário
    getUser() {
      this.load = true;
      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");
      Auth.userInformation(userID, token)
        .then((r) => {
          this.userDATA = r.data.DATA;
          this.load = false;
        })
        .catch((e) => {
          this.load = false;
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
    //verifica login
    if (localStorage.getItem("token") !== null) {
      //verifica se já foi confirmado
      // this.verifyConfirm();
      this.getUser();
      this.allCountry();
      this.allGenres();
    } else {
      console.log(`Logout`);
      //Auth.logout();
    }
  },
  data() {
    return {
      brazilON: false,
      countryON: false,
      load: false,
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
    };
  },
};
</script>
<style scoped>
.el-select {
  width: 100%;
  height: 50px;
}
.pre-name {
  font-size: 25px;
  color: #212529;
  text-transform: uppercase;
  color: #0e79ec;
  line-height: 30px;
  letter-spacing: 0px;
}
.erro-valid {
  color: red;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
}

.registrar {
  width: 49%;
  float: left;
  border-color: transparent;
  background: #d6d6d6;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0px;
}

.esqueci {
  width: 49%;
  float: right;
  border-color: transparent;
  background: #d6d6d6;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0px;
}

.actions {
  margin-top: 15px;
  width: 100%;
}

.login-form .form-control:focus {
  color: #0e79ec;
  outline: 0;
  box-shadow: 0 0 0 0.1rem rgb(14 121 236 / 0%);
  border: 1px solid #409eff;
}

.login {
  height: 100vh;
  background: linear-gradient(90deg, rgb(0 0 0 / 92%) 0%, rgb(0 0 0 / 71%) 100%),
    url(../../assets/images/login.jpg);
  background-size: cover;
  margin-top: -158px;
}

.login-form form {
  margin-top: 20px;
}

.login-form label {
  margin-bottom: 2px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(92, 92, 92);
  font-size: 14px;
}

.login-form .form-control {
  background: #ffffff;
  color: rgb(101, 100, 100);
  border: 1px solid #dcdfe6;

  height: 50px;
  border-radius: 4px;
}

.login-form {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 1000px;
  height: 90vh;
  background: white;
  border-radius: 5px;
  padding: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.login-form .entrar {
  background: linear-gradient(
    90deg,
    rgba(36, 198, 220, 1) 0%,
    rgba(127, 33, 185, 1) 100%
  );
  background-size: 400% 400%;
  -webkit-animation: AnimationName 6s ease infinite;
  -moz-animation: AnimationName 6s ease infinite;
  -o-animation: AnimationName 6s ease infinite;
  animation: AnimationName 6s ease infinite;
  width: 100%;
  color: white;
  border: none;
  height: 50px;
}
.el-loading-mask {
  height: 150% !important;
}
.btn-primary:not(:disabled):not(.disabled).active,
.btn-primary:not(:disabled):not(.disabled):active {
  border: none;
  background: rgba(36, 198, 220, 1);
  color: #fff;
  fill: #fff;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 51%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 51%;
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 51%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 51%;
  }
}

@-o-keyframes AnimationName {
  0% {
    background-position: 0% 51%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 51%;
  }
}

@keyframes AnimationName {
  0% {
    background-position: 0% 51%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 51%;
  }
}
</style>
<style scoped>
@media (max-width: 991px) {
  .login {
    margin-top: -120px;
  }

  .login-form {
    width: 90%;
    background: white;
    border-radius: 5px;
    padding: 15px;
  }

  .registrar {
    font-size: 12px;
  }

  .esqueci {
    font-size: 12px;
  }
  .el-notification {
    top: 0px !important;
  }
}

.el-message--error {
  top: 200px !important;
}
@media (max-width: 1024px) { 
  .pre-name[data-v-448b058e] {
    font-size: 16px;
}
.col-md-12 {
  padding: 0!important;
  margin-bottom: 0!important;
}
.login-form label {
  margin-bottom: 6px!important;
  margin-top: 10px!important;
  margin-left: 6px!important;
}
.login-form input {
      width: 110%;
}
.el-select {
    width: 110%;
    height: 50px;
}
.req{
    margin-top: 20px!important;
}
.req dl, ol, ul {
    margin-top: 0;
    margin-bottom: 0rem;
    list-style-type: disc;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 20px;
    font-size: 15px;
}
}
</style>

<style scope>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #0e79ec;
  border: 26px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3309ce;
}
::-webkit-scrollbar-thumb:active {
  background: #06f0f4;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 79px;
}
::-webkit-scrollbar-track:hover {
  background: #6e6e6e;
}
::-webkit-scrollbar-track:active {
  background: #adadad;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
.el-input--suffix .el-input__inner {
  height: 50px !important;
}

</style>