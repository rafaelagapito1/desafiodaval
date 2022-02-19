<template>
  <div class="login">
    <div class="login-form text-center" v-loading="load">
      <div class="logo">
        <img src="../../assets/images/logo-vg.png" alt="" />
      </div>
      <form class="text-left" @submit.prevent="userLogin">
        <div class="form-group email">
          <label for="exampleInputEmail1">Endereço de E-mail</label>
          <input
            type="email"
            class="form-control"
            v-model="dataLogin.EMAIL"
            placeholder="exemplo@gmail.com"
          />
          <div v-if="validEmail" class="erro-valid">O Campo é Obrigatório</div>
        </div>

        <button type="submit" class="btn btn-primary entrar">
          RECUPERAR SENHA
        </button>
        <div class="actions">
          <button
            type="button"
            class="btn btn-primary registrar"
            @click="goTO('/register')"
          >
            Registrar agora
          </button>
          <button
            type="button"
            class="btn btn-primary esqueci"
            @click="goTO('/login')"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Auth from "../../services/Auth";

export default {
  name: "login",
  components: {},
  methods: {
    goTO(url) {
      this.$router.push(url);
    },
    userLogin() {
      const data = {
        EMAIL: this.dataLogin.EMAIL,
        PASSWORD: this.dataLogin.PASSWORD,
      };

      if (this.dataLogin.EMAIL === "") {
        this.validEmail = true;
      } else {
        this.validEmail = false;
      }

      if (this.validEmail === false) {
        this.load = true;

        Auth.recoveyPassword(data)
          .then((r) => {
            if (r.data.SUCCESS) {
              this.$notify.success({
                title: "Sucesso",
                message:
                  "AS INSTRUÇÕES PARA RECUPERAR A SENHA FORAM ENVIADAS PARA SEU E-MAIL",
                offset: 120,
                duration: 3000,
              });
            }
            if (r.data.WARNING) {
              this.$message({
                showClose: true,
                type: "error",
                message: "SEU EMAIL NÃO FOI ENCONTRADO EM NOSSO BANCO DE DADOS",
                offset: 0,
              });
            }
          })
          .catch((e) => {
            console.log("erro:", e);
            this.$message({
              showClose: true,
              type: "error",
              message: "Algo deu errado, tente novamente!",
              offset: 0,
            });
            this.load = false;
          })
          .finally(() => {
            this.load = false;
          });
      }
    },
  },
  data() {
    return {
      dataLogin: {
        EMAIL: "",
        PASSWORD: "",
        subscribe: true,
      },
      load: false,
      alertSuccess: false,
      alertFail: false,
      message: "",
      validEmail: false,
      validPass: false,
    };
  },
  mounted() {},
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
