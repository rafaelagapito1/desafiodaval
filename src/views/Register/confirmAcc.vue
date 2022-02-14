<template>
  <div class="login">
    <div class="login-form text-center" v-loading="load">
      <div class="logo">
        <img src="../../assets/images/logo-vg.png" alt="" />
      </div>
      <div id="emailconfirmed" v-show="emailConfirmed" class="box">
        <h4 class="text-center">
          <i class="el-icon-check" style="color: green"></i> Pronto, Seu email
          foi confirmado
        </h4>

        <hr />
        <p
          style="
            color: green;
            font-size: 13px;
            padding: 5px;
            border: 1px solid green;
            border-radius: 3px;
          "
          class="text-center"
        >
          Agora iremos redirecionar você para a tela de login
        </p>

        <p class="text-center">
          <img id="load" src="/static/img/load.gif" alt="" />
          Você será redirecionado...
        </p>
      </div>

      <div id="tokenexpired" v-show="tokenExpired" class="box">
        <h4 class="text-center">
          <i class="el-icon-error" style="color: red"></i> Seu token expirou !
        </h4>
        <hr />
        <p
          style="
            color: red;
            font-size: 13px;
            padding: 5px;
            border: 1px solid red;
            border-radius: 3px;
          "
          class="text-center"
        >
          O token tem validade de 24h. Mas você pode tentar novamente. Click
          abaixo para reenviar novamente o email
        </p>

        <form>
          <div class="form-group">
            <label for="email">Seu email</label>
            <input
              @input="validateEmail"
              name="email"
              v-model="emailData"
              placeholder="exemplo@gmail.com"
              class="form-control"
              type="email"
            />
            <span style="display: block; color: red; font-size: 12px"></span>
            <hr />
          </div>
          <el-button
            v-if="emailValid"
            style="margin-top: 12px"
            type="primary"
            @click="ReSendEmail()"
            round
            >Re-Enviar Confirmação</el-button
          >
          <el-button v-else style="margin-top: 12px" type="info" disabled round
            >Re-Enviar Confirmação</el-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../services/Auth";

export default {
  name: "login",
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
    //valida email
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.emailValid = re.test(String(this.emailData).toLowerCase());
      console.clear();
    },
    goTO(url) {
      this.$router.push(url);
    },
  },
  data() {
    return {
      emailConfirmed: false,
      tokenExpired: false,
      load: false,
      emailData: "",
      emailValid: false,
    };
  },
  mounted() {
    if (this.$route.params.status === "success") {
      this.emailConfirmed = true;
      this.tokenExpired = false;
      setTimeout(() => {
        this.$router.push({ path: "/login" });
      }, 5000);
    } else if (this.$route.params.status === "fail") {
      this.emailConfirmed = false;
      this.tokenExpired = true;
      this.load = false;
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped>
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
