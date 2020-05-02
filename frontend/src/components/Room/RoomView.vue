<template>
    <v-container>
        <v-row>
            <v-col>Room number:</v-col>
            <v-col>{{ this.room.roomNumber }}</v-col>
        </v-row>
        <v-row>
            <v-col>Choice:</v-col>
            <v-col>{{ this.room.choice }}</v-col>
        </v-row>
        <v-row>
            <v-col>Number of beds:</v-col>
            <v-col>{{ this.room.bedsNumber }}</v-col>
        </v-row>
        <v-row>
            <v-col>Price:</v-col>
            <v-col>{{ this.room.price }}</v-col>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-col>{{ room.smokingAllowed ? "Smoking allowed" : "Smoking is not allowed" }}</v-col>
            <v-col>{{ room.airConditioning ? "Air conditioning" : "No air conditioning" }}</v-col>
        </v-row>
        <v-row>
            <v-col>{{ room.tv ? "TV" : "No TV" }}</v-col>
            <v-col>{{ room.soundIsolation ? "Sound isolation" : "No sound isolation" }}</v-col>
        </v-row>
        <br>
        <v-row>
            <v-col><v-btn v-if="userIsLoggedIn" @click="editRoom()">Edit room</v-btn></v-col>
            <v-col><v-btn @click="goToHotelPage()">Go to hotel</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Room",
        props: ['id'],
        computed: mapGetters({
            room: 'room/getRoomData',
            userIsLoggedIn: 'user/isLoggedIn',
            hotel: 'hotel/getHotelData'
        }),
        mounted() {
            this.$store.dispatch('room/get_room', this.id)
        },
        methods: {
            editRoom () {
                this.$router.push({ name: 'CreateEditRoom', params: { id: this.room.id } })
            },
            goToHotelPage () {
                this.$router.push({ name: 'Hotel', params: { id: this.hotel.id } })
            }
        }
    }
</script>

<style scoped>

</style>