<template>
  <v-app>
    <Header/>
    <router-view/>
    <MessageBox/>
    <Confirm/>
  </v-app>
</template>

<script>
import Header from './components/Header'
import MessageBox from "./components/dialogs/MessageBox";
import Confirm from "./components/dialogs/Confirm";

export default {
  name: 'App',
  components: {
    Confirm,
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
