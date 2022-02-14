<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{state.testes.status||state.testes}}
    <p @click="add">clique aqui</p>
  </div>
</template>

<script>
// @ is an alias to /srctest
import { reactive, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
//test
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){

    const state = reactive({
      testes:'dCasa',
      numero:ref(0)
    });

    async function add(){
      state.testes = await fetch('https://httpbin.org/get')
    }
  
    return {
      state,
      add
    }

  }
}
</script>
