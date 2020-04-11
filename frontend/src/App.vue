<template>
  <v-app>
    <Header/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    Header,
    HelloWorld
  }
}
</script>

<style>
</style>
