<template>
  <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar dense flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <v-btn icon v-if="!userIsLoggedIn" @click="register()">
          <v-icon>mdi-file-document-edit-outline</v-icon>
      </v-btn>

      <v-btn icon v-if="!userIsLoggedIn" @click="login()">
          <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn icon v-if="userIsLoggedIn" @click="logout()">
          <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-toolbar>
  </v-card>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        name: "Header",
        computed: mapGetters({ userIsLoggedIn: 'user/isLoggedIn' }),
        methods: {
            login () {
                this.$router.push({ name: 'Login' })
            },
            register () {
                this.$router.push({ name: 'Register' })
            },
            async logout () {
                await this.$store.dispatch('user/logout')
                this.$router.push({ name: 'Home' })
            }
        }
    }
</script>

<style scoped>

</style>