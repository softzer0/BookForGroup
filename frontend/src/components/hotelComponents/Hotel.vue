<template>
    <v-container>
        <v-row>
            <v-col>Hotel name:</v-col>
            <v-col>{{ hotel.name }}</v-col>
        </v-row>
        <v-row>
            <v-col>City:</v-col>
            <v-col>{{ hotel.city }}</v-col>
        </v-row>
        <v-row>
            <v-col>Address:</v-col>
            <v-col>{{ hotel.address }}</v-col>
        </v-row>
        <v-row>
            <v-col>Web site:</v-col>
            <v-col>{{ hotel.webSite }}</v-col>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-col v-if="hotel.freeWifi">Free wifi</v-col>
            <v-col v-if="!hotel.freeWifi">No free wifi</v-col>
            <v-col v-if="hotel.freeParking">Free parking</v-col>
            <v-col v-if="!hotel.freeParking">No free parking</v-col>
        </v-row>
        <v-row>
            <v-col v-if="hotel.breakfast">Breakfast</v-col>
            <v-col v-if="!hotel.breakfast">No breakfast</v-col>
            <v-col v-if="hotel.swimmingPool">Swimming pool</v-col>
            <v-col v-if="!hotel.swimmingPool">No swimming pool</v-col>
        </v-row>
        <v-row>
            <v-col v-if="hotel.spa">Spa</v-col>
            <v-col v-if="!hotel.spa">No spa</v-col>
            <v-col v-if="hotel.gym">Gym</v-col>
            <v-col v-if="!hotel.gym">No gym</v-col>
        </v-row>
        <v-row>
            <v-col><v-btn v-if="userIsLoggedIn" @click="editHotel()">Edit hotel</v-btn></v-col>
            <v-col><v-btn @click="goToUserPage()">Go back</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Hotel",
        props: ['pk'],
        computed: {
            hotel() { return this.$store.getters['hotel/getHotelData']() },
            userIsLoggedIn() {
              return !!(this.$store.getters['user/getAccessToken']())
            }
        },
        mounted() {
            this.$store.dispatch('hotel/gethotel', this.pk)
        },
        methods: {
            editHotel () {
                this.$router.push({ name: 'CreateEditHotel', params: { pk: this.hotel.pk } })
            },
            goToUserPage () {
                this.$router.push({ name: 'User' })
            }
        }
    }
</script>

<style scoped>

</style>