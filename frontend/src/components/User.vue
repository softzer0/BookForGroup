<template>
    <v-container>
        <v-row>
            <v-col>First name:</v-col>
            <v-col>{{ user.firstName }}</v-col>
        </v-row>
        <v-row>
            <v-col>Last name:</v-col>
            <v-col>{{ user.lastName }}</v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "User",
        computed: {
            user() { return this.$store.getters['user/getUserData']() }
        }
    }
</script>

<style scoped>

</style>