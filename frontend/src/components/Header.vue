<template>
  <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar dense>
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

      <router-link to="/register" v-if="!userIsLoggedIn">
        <v-btn icon>
            <v-icon>mdi-file-document-edit-outline</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/login" v-if="!userIsLoggedIn">
        <v-btn icon>
            <v-icon>mdi-login</v-icon>
        </v-btn>
      </router-link>

      <v-btn icon @click="logout()" v-if="userIsLoggedIn">
          <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-toolbar>
  </v-card>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            userIsLoggedIn() {
              return !!(this.$store.getters['user/getAccessToken']())
            }
        },
        methods: {
            async logout () {
                await this.$store.dispatch('user/logout', { })
                this.$router.push({ name: 'Home' })
            }
        }
    }
</script>

<style scoped>

</style>