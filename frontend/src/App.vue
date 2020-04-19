<template>
  <v-app>
    <Header/>
    <router-view/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    Header,
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld
  }
}
</script>

<style>
</style>
