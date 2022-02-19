<template>
<div class="Backtohome" @click="redirectToHome">
    Voltar ao Início
</div>
</template>

<script>
export default {
    methods: {
        redirectToHome() {
                window.scrollTo(0,0);
        },
    }
}
</script>

<style scoped>
.Backtohome {
    height: 70px;
    text-align: center;
    cursor: pointer;
    background: #3f4959;
    color: white;
    padding: 25px 0px;
    border-bottom: 1px solid white;
}
.Backtohome:hover {
    background: #2b3340;
    color: white;
}
</style>
