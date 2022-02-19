<template>
  <!-- Content Dashboard -->
  <div>
    <div class="row">
      <div class="col">
        <div class="dashboard__profile card profile-card">
          <div class="card-body profile-card__body">
            <div class="profile-card__avatar">
              <img v-if="img" :src="img" alt="" />
              <img
                v-else
                src="../../../assets/images/profile-user.png"
                alt=""
              />
            </div>
            <div class="profile-card__name text-center">
              <h5><br />{{ userDATA.NAME }}</h5>
              <p v-if="nickname">({{ nickname }})</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div
          class="dashboard__address card address-card address-card--featured"
        >
          <div class="address-card__body">
            <div class="address-card__name">
              <h5>Endereço</h5>
            </div>
            <div class="address-card__row">
              {{ userDATA.ADDRESS }}, n°{{ userDATA.NUMBER }} ,
              {{ userDATA.NEIGHBORHOOD }}<br />
              COMPLEMENTO: {{ userDATA.COMPLEMENT }}<br />{{ userDATA.CITY }} -
              {{ userDATA.STATE }}
              {{ userDATA.ZIP_CODE }}
            </div>
            <div class="address-card__row margin_top">
              <div class="address-card__row-title">
                <h5>Telefone</h5>
              </div>
              <div class="address-card__row-content">{{ userDATA.PHONE }}</div>
            </div>
            <div class="address-card__row margin_top">
              <div class="address-card__row-title">
                <h5>Email</h5>
              </div>
              <div class="address-card__row-content">{{ userDATA.EMAIL }}</div>
            </div>
            <div class="address-card__footer margin_top">
              <a> </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div
          style="
            background-color: rgb(255 255 255);
            border: 2px solid rgb(222 226 230);
            display: flex;
            flex-grow: 1;
            justify-content: center;
            border-radius: 3px;
            padding: 5px;
            margin-bottom: 15px;
            margin-top: 15px;
          "
        >
          <span style="font-size: 15px">
            <b>O seu link de patrocinador:</b>
            <button
              @click.prevent="copyCode()"
              class="btn btn-success btn-sm"
              style="
                margin: 0px;
                font-size: 12px;
                margin-left: 10px;
                height: 35px;
              "
            >
              Copiar link
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- End Dashboard -->
</template>

<style scoped>
.address-card {
  position: relative;
}
.card {
  border: 2px solid #dee2e6;
  border-radius: 2px;
}
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 2px solid #dee2e6 !important;
  border-radius: 0.25rem;
}
.address-card__badge {
  position: absolute;
  background-color: #6a8da5;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 4px 8px 2px;
  top: -2px;
  right: 0.75rem;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.address-card--featured .address-card__body {
  padding: 2rem;
}
.profile-card__avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 16px;
}
.profile-card__avatar img {
  border-radius: 50%;
  max-width: 100%;
}
table.table.able-striped.table-hover.border-table {
  border: 2px solid #dee2e6;
}
.card {
  border: 2px solid #f0f0f0;
  border-radius: 2px;
}
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.profile-card__body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.card-body {
  padding: 2rem;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 24.62rem;
  padding: 4rem;
}
.profile-card__email {
  font-size: 15px;
  margin-bottom: 24px;
}
.row.space-top {
  margin-top: 50px;
}
.margin_top {
  margin-top: 30px;
}
</style>

<script>
import Auth from "../../../services/Auth";
import Products from "../../../services/Products";

export default {
  methods: {
    copyCode() {
      var Url = window.location.host + "/register/" + this.nickname;
      navigator.clipboard.writeText(Url);
      this.$message({
        message: "Copiado com sucesso!",
        type: "success",
      });
    },

    getNickname() {
      if (localStorage.getItem("token") !== null) {
        let nickname = JSON.parse(
          localStorage.getItem("SELECTED_ACCOUNT_NICKNAME")
        );
        this.nickname = nickname;
      } else {
        return false;
      }
    },
    goTO(url) {
      this.$router.push(url);
    },
    outUser() {
      Auth.logoutUser();
    },
    //busca dados do usuário
    getUser() {
      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");
      Auth.userInformation(userID, token)
        .then((r) => {
          this.userDATA = r.data.DATA;
          this.getUserImage();
        })
        .catch((e) => {
          if (e.response.status == 403) {
            Auth.logout();
          }
        });
    },
    getUserImage() {
      Products.getUserImage(this.userDATA.ID)
        .then((r) => {
          this.img = r.data.DATA.Data;
        })
        .catch((e) => {
          console.log("erro:", e);
        });
    },
    verifyLogin() {
      const token = localStorage.getItem("token");
      Auth.verifylogin(token)
        .then((r) => {
          this.img = r.data.DATA;
        })
        .catch((e) => {
          console.log("erro:", e);
        });
    },
  },
  created() {
    //verifica login
    if (localStorage.getItem("token") !== null) {
      this.getUser();
      //  this.verifyLogin();
      this.loginStatus = true;
    } else {
      Auth.logout();
    }
  },
  mounted() {
    this.getNickname();
  },
  data() {
    return {
      loginStatus: false,
      userDATA: "",
      nickname: null,
      img: "",
    };
  },
};
</script>


<style>
.profile-card__avatar img {
  border-radius: 100% !important;
  width: 80px !important;
  height: 80px !important;
}
</style>