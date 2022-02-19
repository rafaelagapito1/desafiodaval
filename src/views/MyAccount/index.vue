<template>
  <Header></Header>
  <br />
  <Carousel :Carousel="Carousel"></Carousel>
  <!-- .block-banner -->
  <div class="block block-banner minha-conta" id="minha-conta">
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
        <div class="two" :style="'width: ' + two + '%'">
          <Dashboard></Dashboard>
          <!-- <EditProfile></EditProfile> -->
          <!-- <MyOrders></MyOrders> -->
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- End Left Bar My Account -->
          <BrowsingHistory></BrowsingHistory>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-banner / end -->
  <Footer></Footer>
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

import Header from "../../components/Header/index.vue";
import Carousel from "./components/Carousel.vue";
import LeftBar from "./components/LeftBar.vue";
import Dashboard from "./components/Dashboard.vue";
// import EditProfile from "./components/EditProfile.vue";
// import MyOrders from "./components/MyOrders.vue";
import Footer from "../../components/Footer/index.vue";
import BrowsingHistory from "../../components/BrowsingHistory/index.vue";
import Products from "../../services/Products";

export default {
  name: "myaccount",
  components: {
    Header,
    Carousel,
    LeftBar,
    Dashboard,
    // EditProfile,
    // MyOrders,
    Footer,
    BrowsingHistory,
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
    copyCode() {
      var Url = "http://market.vg.company/register/" + this.nickname;
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
    getCarousel() {
      Products.getBanner("4").then((r) => {
        this.Carousel = r.data.DATA;
      });
    },
  },
  data() {
    return {
      nickname: null,
      Carousel: "",
      one: 6,
      two: 94,
      isCollapse: true,
    };
  },
  mounted() {
    this.getNickname();
    this.getCarousel();
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
.myorders {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: space-between;
}

</style>
<style>
.minha-conta .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 460px;
}
.minha-conta .el-menu--collapse {
  height: 460px;
}

@media (max-width: 1024px) {
  #minha-conta .one {
    width: 100%!important ;
  }
  
  #minha-conta .el-menu--collapse {
    height: auto!important;
  }
  #minha-conta .el-menu--collapse {
    height: auto;
    display: flex;
    flex-flow: initial;
    align-items: flex-start;
    align-content: space-between;
  }
  .el-menu {
    border-bottom: solid 1px #e6e6e6!important;
    border-right: none!important;
    padding-left: 0px!important;
  }
  .el-menu--collapse {
    width: 100%!important;
  }
  .el-menu-item {
    width: 25%!important;
    text-align: center;
  }
  
  .el-menu-item.is-active {
    border-bottom: 1px solid #409eff;
  }
  .block.block-banner {
    margin-bottom: -20px!important;
  }
  .minha-conta .two {
    margin-bottom: 10vw!important;
    padding-left: 0!important;
    width: 100%!important;
  }
  #minha-conta .modal__content .header h4 {
    font-size: 20px !important;
    margin-bottom: 0 !important;
  }
  #minha-conta .modal__content .header p {
    font-size: 12px !important;
  }
  #minha-conta .modal__close {
    top: 0px !important;
    right: 0px !important;
  }
  .minha-conta .tabs a {
    padding: 5px 5px !important;
    font-size: 12px !important;
  }
  #minha-conta .modal__content .header {
    padding: 20px 0px 0px 2vw !important;
  }
  #minha-conta .modal__content {
    height: max-content !important;
    overflow-x: hidden;
  }
  #minha-conta .modal__content .col-9 {
    flex: 0 0 75%;
    max-width: 60%;
  }
  .minha-conta label {
      margin-top: 5px;
  }
  .card-body {
    min-height: auto!important;
}
  }
</style>


