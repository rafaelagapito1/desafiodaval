<template>
  <div class="login">
    <div class="login-form text-center" v-loading="load">
      <div class="logo">
        <img src="../../assets/images/logo-vg.png" alt="" />
      </div>
      <form
        class="text-left"
        @submit.prevent="userLogin"
        v-if="!internalClientOn"
      >
        <div class="form-group email">
          <label for="exampleInputEmail1"
            ><i
              style="margin-right: 5px; font-size: 22px"
              class="el-icon-user-solid"
            ></i
            >Endereço de E-mail</label
          >
          <input type="email" class="form-control" v-model="dataLogin.EMAIL" />
          <div v-if="validEmail" class="erro-valid">O Campo é Obrigatório</div>
        </div>
        <div class="form-group password">
          <label for="exampleInputPassword1"
            ><i
              style="margin-right: 5px; font-size: 20px"
              class="fas fa-lock"
            ></i
            >Senha</label
          >
          <input
            type="password"
            class="form-control"
            v-model="dataLogin.PASSWORD"
          />
          <div v-if="validPass" class="erro-valid">O Campo é Obrigatório</div>
        </div>
        <button type="submit" class="btn btn-primary entrar">ENTRAR</button>
        <div class="actions">
          <button
            type="button"
            class="btn btn-primary registrar"
            @click="goTO('/register')"
          >
            <i class="fas fa-user-plus"></i> Registrar agora
          </button>
          <button
            type="button"
            class="btn btn-primary esqueci"
            @click="goTO('/reset-password')"
          >
            <i class="fas fa-unlock-alt"></i> Esqueci a senha
          </button>
        </div>
      </form>
      <div class="usernickname" v-if="internalClientSet">
        <el-alert
          title="Selecione uma conta para utilizar a loja."
          type="warning"
          show-icon
        >
        </el-alert>

        <el-select
          v-model="dataUser"
          filterable
          placeholder="Conta"
          style="width: 100%; margin-bottom: 15px; margin-top: 15px"
        >
          <el-option
            v-for="item in dataUsers"
            :key="item.ID"
            :label="item.NICKNAME"
            :value="item.ID"
          >
          </el-option>
        </el-select>
        <button
          v-if="dataUser !== null"
          type="button"
          class="btn btn-primary entrar"
          @click="saveInternal(dataUser)"
        >
          Prosseguir
        </button>
        <button v-else disabled type="button" class="btn btn-primary entrar">
          Prosseguir
        </button>
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
    saveInternal(userID) {
      	localStorage.setItem('SELECTED_ACCOUNT_ID', userID );
        localStorage.setItem('ACCOUNTS', JSON.stringify(this.dataUsers) );
          if (this.UserLogin.User.NAME == null) {
                this.$notify.success({
                  title: "Sucesso",
                  message: "Seja Bem Vindo:  " + this.UserLogin.User.SOCIAL_REASON,
                  offset: 120,
                  duration: 3000,
                });
              } else {
                this.$notify.success({
                  title: "Sucesso",
                  message: "Seja Bem Vindo:  " + this.UserLogin.User.NAME,
                  offset: 120,
                  duration: 3000,
                });
              }
          	window.location.reload();
    },
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
      if (this.dataLogin.PASSWORD === "") {
        this.validPass = true;
      } else {
        this.validPass = false;
      }

      if (this.validPass === false && this.validEmail === false) {
        this.load = true;

        Auth.login(data)
          .then((r) => {
            this.UserLogin = r.data;
            Auth.saveDataLocalStorage(r.data);
            if (r.data.User.EXTERNAL_CLIENT == 0) {
              localStorage.removeItem('SELECTED_ACCOUNT_ID');
                       localStorage.removeItem('ACCOUNTS');
              this.internalClientOn = true;
              this.internalClientSet = true;
              this.dataUsers = r.data.UserAccounts[0];
              this.load = false;
            } else {
              if (r.data.User.NAME == null) {
                this.$notify.success({
                  title: "Sucesso",
                  message: "Seja Bem Vindo:  " + r.data.User.SOCIAL_REASON,
                  offset: 120,
                  duration: 3000,
                });
              } else {
                this.$notify.success({
                  title: "Sucesso",
                  message: "Seja Bem Vindo:  " + r.data.User.NAME,
                  offset: 120,
                  duration: 3000,
                });
              }
              if (r.data.Verified_Data_User == 0) {
                this.$router.push("/confirm-register");
              } else {
               	window.location.reload();
              }
            }
          })
          .catch((e) => {
            console.log("erro:", e);
            this.$message({
              showClose: true,
              type: "error",
              message: "Email ou senha inválido",
              offset: 0,
            });
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
      UserLogin: null,
      load: false,
      alertSuccess: false,
      alertFail: false,
      message: "",
      validEmail: false,
      validPass: false,
      internalClientOn: false,
      internalClientSet: false,
      dataUser: null,
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
   height: 100%;
    margin-top: 0;
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
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: max-content;
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
