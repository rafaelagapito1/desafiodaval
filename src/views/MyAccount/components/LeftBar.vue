<template>

  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
  <el-menu-item index="2">
      <i class="el-icon-odometer" @click="isCollapse = !isCollapse"></i>
      <template #title @click="isCollapse = !isCollapse">Menu</template>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-odometer" @click="goTO('/myaccount')"></i>
      <template #title @click="goTO('/myaccount')">Dashboard</template>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-user" @click.prevent="goTO('/edit-user')"></i>
      <template #title @click.prevent="goTO('/edit-user')"
        >Editar Informações</template
      >
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-shopping-cart-2" @click.prevent="goTO('/myorders')"></i>
      <template #title @click.prevent="goTO('/myorders')"
        >Meus Pedidos</template
      >
    </el-menu-item>
  </el-menu>
  <!-- Left Bar My Account -->
  <!-- <div class="bg-color">
    <div class="padding_my_acc">
      <h5><i class="fas fa-bars padding_my_acc_title"></i> Minha Conta</h5>
    <div id="main-menu" class="list-group">
        <a
          @click.prevent="goTO('/myaccount')"
          href="#sub-menu"
          class="list-group-item"
        >
          <i
            class="fas fa-tachometer-alt"
            style="float: left; margin-right: 10px"
          ></i
          >Dashboard
        </a>
        <a
          @click.prevent="goTO('/edit-user')"
          href="#sub-menu"
          class="list-group-item"
        >
          <i
            class="fas fa-user-circle"
            style="float: left; margin-right: 10px"
          ></i
          >Editar Informações</a
        >
        <a
          @click.prevent="goTO('/myorders')"
          href="#"
          class="list-group-item"
          data-parent="#sub-menu"
          ><i
            class="fas fa-shopping-cart"
            style="float: left; margin-right: 10px"
          ></i
          >Meus pedidos</a
        >
      </div>
    </div>
  </div> -->

  <!-- End Left Bar My Account -->
</template>
<style scoped>
a,
a:hover {
  color: #212529;
  font-size: 20px;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: transparent;
  border: none;
}
a.list-group-item:active,
a.list-group-item:hover {
  border-left: 4px solid #212529;
  border-radius: 0;
}
#main-menu {
  margin-top: 25px;
}

.list-group-item {
  padding: 10px 5px;
  padding-right: 30px;
  padding-left: 30px;
}
a.list-group-item:active,
a.list-group-item:hover {
  border-left: 2px solid #212529;
  border-radius: 0;
}
a.list-group-item:active,
a.list-group-item {
  border-left: 2px solid transparent;
  border-radius: 0;
}
#sub-menu2 a {
  padding-left: 55px;
  font-size: 15px;
}
#sub-menu a {
  padding-left: 55px;
  font-size: 15px;
}
</style>
<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    goTO(url) {
      this.$router.push(url);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
