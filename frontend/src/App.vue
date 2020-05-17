<template>
  <v-app>
    <Header/>
    <router-view/>
    <MessageBox/>
  </v-app>
</template>

<script>
import Header from './components/Header'
import MessageBox from "./components/dialogs/MessageBox";

export default {
  name: 'App',
  components: {
    MessageBox,
    Header,
  }
}
</script>

<style>
  .v-card{
    border-radius: 20px !important;
  }
</style>
