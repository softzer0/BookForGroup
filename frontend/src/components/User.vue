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
        <v-row v-if="user.city">
            <v-col>City:</v-col>
            <v-col>{{ user.city }}</v-col>
        </v-row>
        <v-row v-if="user.address">
            <v-col>Address:</v-col>
            <v-col>{{ user.address }}</v-col>
        </v-row>
        <v-row>
            <v-col>Hotels:</v-col>
            <v-col>
                <ul>
                    <li v-for="hotel in this.hotels" :key="hotel.name">
                        {{ hotel.name }}
                    </li>
                </ul>
            </v-col>
        </v-row>
        <br>
        <v-row>
            <v-col>
                <v-btn @click="completeProfile()">Complete the profile</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="createHotel()">Create new hotel</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "User",
        computed: {
            user() { return this.$store.getters['user/getUserData']() },
            hotels() { return this.$store.getters['hotel/getHotelList']() }
        },
        methods: {
            async completeProfile () {
                this.$router.push({ name: 'UserAttributes' })
            },
            async createHotel () {
                this.$router.push({ name: 'CreateHotel' })
            }
        },
        mounted() {
            this.$store.dispatch('hotel/userhotels', this.user.id)
        }
    }
</script>

<style scoped>

</style>