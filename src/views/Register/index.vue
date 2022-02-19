<template>
  <div class="login">
    <div class="login-form text-center" v-loading="load">
      <div class="logo">
        <img src="../../assets/images/logo-vg.png" alt="" />
      </div>

      <div class="stepers" v-if="showForm">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="Email "> </el-step>
          <el-step title="Documento"> </el-step>
          <el-step :title="documentOut"></el-step>
          <el-step title="Senha"> </el-step>
        </el-steps>
      </div>
      <div class="form-register" v-if="showForm">
        <div class="form-group email" v-if="active === 0">
          <label for="email "><i class="far fa-envelope"></i> Por favor, digite um email válido!</label>
          <input
            @input="validateEmail"
            v-model="emailData"
            type="email"
            placeholder="exemplo@email.com"
            class="form-control"
            required
          />
          <el-button
            v-if="emailValid"
            style="margin-top: 12px"
            type="primary"
            @click="SendEmail()"
            round
            >Prosseguir</el-button
          >
          <el-button v-else style="margin-top: 12px" type="info" disabled round
            >Prosseguir</el-button
          >
        </div>
        <div class="form-group documento" v-if="active === 1">
          <label for="document-type ">
         <i class="far fa-id-card"></i>   Por favor, escolha tipo de documento.
          </label>
          <el-select v-model="documentType" placeholder="Esolha...">
            <el-option
              v-for="item in optionsCPF"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="CPF" v-if="documentType == 1">
            <input
              v-maska="'###.###.###-##'"
              @maska="validateCPF"
              type="text"
              placeholder="CPF"
              class="form-control"
              required
            />
            <el-button
              @click="SendDocument()"
              style="margin-top: 12px"
              type="primary"
              round
              v-if="CPFValid"
              >Prosseguir</el-button
            >
            <el-button
              style="margin-top: 12px"
              type="info"
              disabled
              round
              v-else
              >Prosseguir</el-button
            >
          </div>

          <div class="CNPJ" v-if="documentType == 2">
            <input
              v-maska="'##.###.###/####-##'"
              @maska="validateCNPJ"
              type="text"
              placeholder="CNPJ"
              class="form-control"
              required
            />

            <el-button
              @click="SendDocument"
              style="margin-top: 12px"
              type="primary"
              round
              v-if="CNPJValid"
              >Prosseguir</el-button
            >
            <el-button
              style="margin-top: 12px"
              type="info"
              disabled
              round
              v-else
              >Prosseguir</el-button
            >
          </div>

          <div class="PASSAPORT" v-if="documentType == 3">
            <input
              @input="validatePASSAPORT"
              v-model="PASSPORTData"
              maxlength="15"
              type="text"
              placeholder="PASSAPORT"
              class="form-control"
              required
            />

            <el-button
              @click="SendDocument"
              style="margin-top: 12px"
              type="primary"
              round
              v-if="PASSPORTValid"
              >Prosseguir</el-button
            >
            <el-button
              style="margin-top: 12px"
              type="info"
              disabled
              round
              v-else
              >Prosseguir</el-button
            >
          </div>
        </div>
        <div class="form-group nome" v-if="active === 2">
          <label v-if="documentType == 2">
            <i class="fas fa-id-card"></i>Por favor, digite sua Razão Social</label
          >
          <label v-else><i class="fas fa-id-card"></i> Por favor, digite seu Nome Completo</label>

          <input
            v-if="documentType == 2"
            @input="validateName"
            v-model="nameData"
            type="text"
            placeholder="Razão Social"
            class="form-control"
            required
          />
          <input
            v-else
            @input="validateName"
            v-model="nameData"
            type="text"
            placeholder="Seu nome completo"
            class="form-control"
            required
          />
          <el-button
            v-if="nameValid"
            style="margin-top: 12px"
            type="primary"
            @click="next()"
            round
            >Prosseguir</el-button
          >
          <el-button v-else style="margin-top: 12px" type="info" disabled round
            >Prosseguir</el-button
          >
        </div>
        <div class="form-group senha" v-if="active === 3">
          <label for="email ">
          <i class="fas fa-unlock-alt"></i>  Por favor, digite uma senha para seu usuário</label
          >
          <div class="req">
            <ul>
              <li style="text-align: left; color: #ff6a00">
                Mínimo de  6 até 14 caracteres.
              </li>
            </ul>
          </div>
          <input
            @input="validatePassword"
            v-model="passwordData"
            type="password"
            placeholder="Sua Senha"
            class="form-control"
            required
          />
          <br />
          <input
            @input="validatePassword"
            v-model="passwordData2"
            type="password"
            placeholder="Confirme sua Senha"
            class="form-control"
            required
          />
          <el-button
            v-if="passwordValid"
            style="margin-top: 12px"
            type="primary"
            @click="next()"
            round
            >Prosseguir</el-button
          >
          <el-button v-else style="margin-top: 12px" type="info" disabled round
            >Prosseguir</el-button
          >
        </div>
        <div class="form-group senha" v-if="active === 4">
          <h3>Confirme os dados abaixo.</h3>
          <p v-if="sponsorNickname != 'NULL'"><b><i class="fas fa-users"  style="margin-right: 5px; font-size: 20px;"></i> Seu patrocinador:</b> {{ sponsorNickname }}</p>
          <div class="info text-left">
            <p>
              <b><i  style="margin-right: 5px; font-size: 20px;" class="fas fa-id-card"></i>{{ documentOut }}:</b> {{ nameData }}
            </p>
            <p><b><i class="far fa-envelope" style="margin-right: 5px; font-size: 20px;"></i>Email:</b> {{ emailData }}</p>
            <p>
              <b><i class="far fa-id-card" style="margin-right: 5px; font-size: 20px;"></i> Tipo de Documento:</b> {{ documentType == 1 ? "CPF" : "" }}
              {{ documentType == 2 ? "CNPJ" : ""
              }}{{ documentType == 3 ? "PASSAPORT" : "" }}
            </p>
            <p><b><i class="far fa-id-card" style="margin-right: 5px; font-size: 20px;"></i> Número Documento:</b> {{ ducumentSet }}</p>
          </div>
          <hr />
          <table class="mb-3">
            <tr>
              <td>
                <input v-model="terms" type="checkbox" id="terms" />
              </td>
              <td>
                <label
                  style="color: black; font-size: 12px"
                  class="ml-2"
                  for="terms"
                  >CONCORDO COM OS
                  <a href="#" @click.prevent="showModal = true"
                    >TERMOS DE SERVIÇO</a
                  >.</label
                >
              </td>
            </tr>
          </table>

          <el-button
            @click="sentRegister()"
            :disabled="!terms"
            style="margin-top: 12px"
            type="primary"
            round
            >Concluir Cadastro</el-button
          >

          <vue-final-modal
            v-model="showModal"
            classes="modal-container"
            content-class="modal-content"
          >
            <button class="modal__close" @click="showModal = false">X</button>
            <div class="modal__content">
              <embed
                style="border: 10px solid #eee"
                src="/public/terms.pdf"
                width="100%"
                height="500"
              />
            </div>
          </vue-final-modal>
        </div>
      </div>
      <div class="showemail" v-if="showEmail">
        <h3
          style="
            color: #008c3e;
            text-transform: uppercase;
            font-size: 20px;
            margin-top: 10px;
          "
        >
          Dados enviados com sucesso!
        </h3>
        <p>Agora basta ir em seu email para confirmar sua conta!</p>
        <el-button
          style="margin-top: 12px"
          type="primary"
          @click="ReSendEmail()"
          round
          >Re-Enviar Confirmação</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../services/Auth";
import { cpf } from "cpf-cnpj-validator";
import { cnpj } from "cpf-cnpj-validator";
export default {
  name: "register",
  components: {},
  methods: {
    //Reenvia Confirmaçao
    ReSendEmail() {
      this.load = true;
      Auth.ResendEmail(this.emailData)
        .then((r) => {
          this.$notify.success({
            title: "Sucesso",
            message: "AS INSTRUÇÕES FORAM REENVIADAS PARA SEU E-MAIL",
            offset: 120,
            duration: 3000,
          });
          this.load = false;
        })
        .catch((e) => {
          //return false;
          this.$message({
            showClose: true,
            type: "error",
            message: "Algo deu errado, Tente novamente!",
            offset: 0,
          });
          this.load = false;
        });
    },
    //valida senha
    validatePassword() {
      if (
        this.passwordData.length >= 6 &&
        this.passwordData == this.passwordData2
      ) {
        this.passwordValid = true;
      } else {
        this.passwordValid = false;
      }
    },
    //documentos
    validatePASSAPORT() {
      if (this.PASSPORTData.length > 7) {
        this.PASSPORTValid = true;
        this.ducumentSet = this.PASSPORTData;
      } else {
        this.PASSPORTValid = false;
      }
      console.clear();
    },
    validateCNPJ: function (event) {
      this.rawCNPJ = event.target.dataset.maskRawValue;
      this.CNPJValid = cnpj.isValid(event.target.dataset.maskRawValue);
      if (this.CNPJValid == true) {
        this.ducumentSet = event.target.dataset.maskRawValue;
      }
    },
    validateCPF: function (event) {
      this.rawCPF = event.target.dataset.maskRawValue;
      this.CPFValid = cpf.isValid(event.target.dataset.maskRawValue);
      if (this.CPFValid == true) {
        this.ducumentSet = event.target.dataset.maskRawValue;
      }
    },
    //valida nome
    validateName() {
      if (this.nameData.length >= 3) {
        this.nameValid = true;
      } else {
        this.nameValid = false;
      }
      console.clear();
    },
    //valida email
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.emailValid = re.test(String(this.emailData).toLowerCase());
      console.clear();
    },
    //verifica email
    SendEmail() {
      this.load = true;
      Auth.verifyEmailExisting(this.emailData)
        .then((r) => {
          this.next();
          this.load = false;
        })
        .catch((e) => {
          //return false;
          if (e.response.data.REF == "I0024") {
            this.$message({
              showClose: true,
              type: "error",
              message: "Email Já Cadastrado!",
              offset: 700,
              duration: 2000,
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "Algo deu errado, Tente novamente!",
              offset: 0,
            });
          }
          this.load = false;
        });
    },
    //verifica documento
    SendDocument() {
      this.load = true;
      Auth.verifyDocumentExisting(this.ducumentSet)
        .then((r) => {
          this.next();
          this.load = false;
          if (this.documentType == 2) {
            this.documentOut = "Razão Social";
          } else {
            this.documentOut = "Nome";
          }
        })
        .catch((e) => {
          if (e.response.data.REF == "I0006") {
            this.$message({
              showClose: true,
              type: "error",
              message: "Documento Já Cadastrado!",
              offset: 750,
              duration: 2000,
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "Algo deu errado, Tente novamente!",
              offset: 0,
            });
          }
          this.load = false;
        });
    },
    // Registra usuário
    sentRegister() {
      let strings = "{";
      strings += '"NAME":"' + this.nameData + '",';
      strings += '"EMAIL":"' + this.emailData + '",';
      strings += '"PASSWORD":"' + this.passwordData + '",';
      strings += '"TYPE_DOCUMENT_ID":"' + this.documentType + '",';
      strings += '"DOCUMENT":"' + this.ducumentSet + '"';
      strings += "}";

      let dataUser = {
        NAME: this.nameData,
        EMAIL: this.emailData,
        PASSWORD: this.passwordData,
        TYPE_DOCUMENT_ID: "" + this.documentType + "",
        DOCUMENT: this.ducumentSet,
        SPONSOR_NICKNAME: this.sponsorNickname,
      };

      this.load = true;
      Auth.register(dataUser)
        .then((r) => {
          this.load = false;
          this.showEmail = true;
          this.showForm = false;
        })
        .catch((e) => {
          if (e.response.data.REF == "I0006") {
            this.$message({
              showClose: true,
              type: "error",
              message: "Documento Já Cadastrado!",
              offset: 750,
              duration: 2000,
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: "Algo deu errado, Tente novamente!",
              offset: 0,
            });
          }
          this.load = false;
        });
    },

    next() {
      if (this.active++ > 3) this.active = 0;
    },
    prev() {
      this.active = this.active - 1;
    },
  },
  data() {
    return {
      sponsorNickname: "",
      documentOut: "Nome",
      showForm: true,
      showEmail: false,
      showModal: false,
      terms: false,
      load: false,
      active: 0,
      //password
      passwordData: "",
      passwordData2: "",
      passwordValid: "",
      //email
      emailData: "",
      emailValid: "",
      msgEmail: [],
      //nome
      nameData: "",
      nameValid: "",
      //PASSAPORT
      PASSPORTData: "",
      PASSAPORTValid: "",
      //CNPJ
      CNPJValid: "",
      rawCNPJ: "",
      msgCNPJ: [],
      //CPF
      CPFValid: "",
      rawCPF: "",
      msgCPF: [],
      //documents
      ducumentSet: "",
      documentType: "",
      optionsCPF: [
        {
          value: 1,
          label: "CPF",
        },
        {
          value: 2,
          label: "CNPJ",
        },
        {
          value: 3,
          label: "PASSAPORT",
        },
      ],
    };
  },
  mounted() {
    if (this.$route.params.nickname == 0) {
      this.$router.push({ path: "/register/" });
      this.sponsorNickname = "NULL";
    } else {
      this.sponsorNickname = this.$route.params.nickname.toUpperCase();
    }
  },
};
</script>
<style >
.el-step__title.is-process {
  color: #0ea6ff !important;
}
.el-step__head.is-process {
  color: #0ea6ff !important;
  border-color: #51bfff !important;
}
.el-select {
  width: 100%;
  margin-bottom: 25px;
}
</style>

<style scoped>
.stepers {
  margin-top: 30px;
}
.form-register {
  margin-top: 30px;
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
  background: #d8d8d8;
  color: #272727;
  border-color: transparent;
  outline: 0;
  box-shadow: 0 0 0 0.1rem rgb(36 198 220);
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
  margin-bottom: 15px;
  font-weight: 600;
  text-transform: uppercase;
}

.login-form .form-control {
  background: #d8d8d8;
  color: #272727;
  border: transparent;
  font-weight: bold;
  height: 50px;
}

.login-form {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: max-content;
  background: white;
  border-radius: 5px;
  padding: 30px;
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
  max-width: 75%;
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
</style>
<style scoped>
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
