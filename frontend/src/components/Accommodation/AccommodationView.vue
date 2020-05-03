<template>
    <v-container>
        <v-row>
            <v-col>Accommodation type:</v-col>
            <v-col>{{ this.accommodation.type.name }}</v-col>
        </v-row>
        <v-row>
            <v-col>Quantity:</v-col>
            <v-col>{{ this.accommodation.quantity }}</v-col>
        </v-row>
        <v-row>
            <v-col>Number of beds:</v-col>
            <v-col>{{ this.accommodation.bedCount }}</v-col>
        </v-row>
        <v-row>
            <v-col>Price per adult:</v-col>
            <v-col>{{ this.accommodation.pricePerAdult }}</v-col>
        </v-row>
        <v-row>
            <v-col>Price per child:</v-col>
            <v-col>{{ this.accommodation.pricePerChild }}</v-col>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-col>{{ accommodation.smokingAllowed ? "Smoking allowed" : "Smoking is not allowed" }}</v-col>
            <v-col>{{ accommodation.airConditioning ? "Air conditioning" : "No air conditioning" }}</v-col>
        </v-row>
        <v-row>
            <v-col>{{ accommodation.tv ? "TV" : "No TV" }}</v-col>
            <v-col>{{ accommodation.soundIsolation ? "Sound isolation" : "No sound isolation" }}</v-col>
        </v-row>
        <br>
        <v-row>
            <v-col><v-btn v-if="userIsLoggedIn" @click="editAccommodation()">Edit accommodation</v-btn></v-col>
            <v-col><v-btn @click="goToHotelPage()">Go to hotel</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Accommodation",
        props: ['id'],
        computed: mapGetters({
            accommodation: 'accommodation/getAccommodationData',
            userIsLoggedIn: 'user/isLoggedIn',
            hotel: 'hotel/getHotelData'
        }),
        mounted() {
            this.$store.dispatch('accommodation/get_accommodation', this.id)
        },
        methods: {
            editAccommodation () {
                this.$router.push({ name: 'CreateEditAccommodation', params: { id: this.accommodation.id } })
            },
            goToHotelPage () {
                this.$router.push({ name: 'Hotel', params: { id: this.hotel.id } })
            }
        }
    }
</script>

<style scoped>

</style>