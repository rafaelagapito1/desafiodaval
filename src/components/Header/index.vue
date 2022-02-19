<template>
  <nav id="navigation" class="navigation-sidebar bg-primary">
    <div class="navigation-header">
      <a href="https://wicombit.com/demo/fitpro"
        ><img
          src="../../assets/images/logovalwhite.png"
          style="max-width: 70px"
      /></a>
    </div>

    <div class="welcome">
      Bem vinda, <b>Val!</b>
      <a href="../controller/logout.php" class="sidebar-user"
        ><i class="dripicons-exit"></i
      ></a>
    </div>

    <!--Navigation Menu Links-->
    <div class="navigation-menu">
      <ul
        class="
          menu-items
          custom-scroll
          mCustomScrollbar
          _mCS_1
          mCS_no_scrollbar
        "
      >
        <div
          id="mCSB_1"
          class="mCustomScrollBox mCS-dark mCSB_vertical mCSB_inside"
          style="max-height: none"
          tabindex="0"
        >
          <div
            id="mCSB_1_container"
            class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
            style="position: relative; top: 0; left: 0"
            dir="ltr"
          >
            <li>
              <a
                href="#"
                class="have-submenu"
                @click.prevent="goTO('/exercicios')"
              >
                <span class="icon-thumbnail"
                  ><i class="dripicons-stopwatch"></i
                ></span>
                <span class="title">Exercícios</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                class="have-submenu"
           
              >
                <span class="icon-thumbnail"
                  ><i class="dripicons-to-do"></i
                ></span>
                <span class="title">Treinos</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                class="have-submenu"
                @click.prevent="goTO('/Categoria')"
              >
                <span class="icon-thumbnail"
                  ><i class="dripicons-folder"></i
                ></span>
                <span class="title">Categorias</span>
              </a>
            </li>

            <li>
              <a
                href=""
                class="have-submenu"
                @click.prevent="goTO('/Musculos')"
              >
                <span class="icon-thumbnail"
                  ><i class="dripicons-user"></i
                ></span>
                <span class="title">Músculos</span>
              </a>
            </li>

            <li>
              <a
                href="javascript:void(0);"
                class="have-submenu"
                @click.prevent="goTO('/Equipamentos')"
              >
                <span class="icon-thumbnail"
                  ><i class="dripicons-lifting"></i
                ></span>
                <span class="title">Equipamentos</span>
              </a>
            </li>

            <li>
              <a href="javascript:void(0);" class="have-submenu">
                <span class="icon-thumbnail"
                  ><i class="dripicons-cutlery"></i
                ></span>
                <span class="title">Receitas</span>
              </a>
            </li>

            <li>
              <a href="javascript:void(0);" class="have-submenu">
                <span class="icon-thumbnail"
                  ><i class="dripicons-article"></i
                ></span>
                <span class="title">Posts</span>
              </a>
              <!--Submenu-->
              <ul class="sub-menu" style="display: ">
                <li>
                  <a href="../controller/posts.php">
                    <span class="icon-thumbnail"
                      ><i class="dripicons-dot"></i
                    ></span>
                    <span class="title">Show All</span>
                  </a>
                </li>

                <li>
                  <a href="../controller/new_post.php">
                    <span class="icon-thumbnail"
                      ><i class="dripicons-dot"></i
                    ></span>
                    <span class="title">New Post</span>
                  </a>
                </li>
              </ul>
            </li>
          </div>
          <div
            id="mCSB_1_scrollbar_vertical"
            class="
              mCSB_scrollTools mCSB_1_scrollbar
              mCS-dark
              mCSB_scrollTools_vertical
            "
            style="display: none"
          >
            <div class="mCSB_draggerContainer">
              <div
                id="mCSB_1_dragger_vertical"
                class="mCSB_dragger"
                style="
                  position: absolute;
                  min-height: 30px;
                  height: 0px;
                  top: 0px;
                "
              >
                <div class="mCSB_dragger_bar" style="line-height: 30px"></div>
              </div>
              <div class="mCSB_draggerRail"></div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </nav>
  <div class="header fixed-header">
    <div class="container-fluid side-padding">
      <div class="row">
        <div class="col-7 col-md-6 d-lg-none">
          <a
            id="toggle-navigation"
            href="javascript:void(0);"
            class="icon-btn mr-3"
            ><i class="fa fa-bars"></i
          ></a>
          <img class="logo-side-dark" />
        </div>
        <div class="col-lg-8 d-none d-lg-block">
          <p class="sidebar-relative">
            Bem vinda, <b>Val!</b>
            <a href="../controller/logout.php" class="sidebar-logout"
              ><i class="dripicons-exit"></i
            ></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goTO(url) {
      this.$router.push(url);
    },
  },

  data() {
    return {};
  },
};
</script>

