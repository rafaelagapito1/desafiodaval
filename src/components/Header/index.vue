<template>
  <div class="menu-lateral">
    <div class="logo text-center">Desafio da Val</div>
    <ul>
      <li :class="$route.name === 'Dashboard' ? 'ativo' : 'padrao'" @click="goTO('/Dashboard')">
        <i class="fas fa-home"></i>
        Dashboard
      </li>
      <li :class="$route.name === 'Exercicios' ? 'ativo' : 'padrao'" @click="goTO('/Exercicios')">
        <i class="fas fa-running"></i>Exercícios
      </li>
    </ul>
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
    return {

    };
  },
};
</script>

