<template>
  <div class="">a</div>
</template>
<script>
export default {
  methods: {
    on() {
      this.classe = "show";
    },
    off() {
      this.classe = "";
    },
    goTO(url) {
      this.$router.push(url);
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.toggle = false;
      }
    },
  },
  created() {
    this.isMobile();
 
  },

  data() {
    return {
      classe: "",
      toggle: true,
    };
  },
};
</script>

<style >
.x {
  display: none;
  z-index: 999;
}
@media screen and (max-width: 991px) {
  .navigation-sidebar {
    display: none;
  }
  .show {
    display: block;
  }
  .x {
    display: block;
  }
}
@media screen and (max-width: 680px) {
  .navigation-sidebar {
    display: none;
  }
  .navigation-sidebar {
    width: 300px;
  }
  .show {
    display: block;
  }
}
</style>