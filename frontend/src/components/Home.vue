<template>
    <v-container>
        <v-row>
            <v-col class="text-center"><router-link to="/login">Login</router-link></v-col>
            <v-col class="text-center"><router-link to="/register">Register</router-link></v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>