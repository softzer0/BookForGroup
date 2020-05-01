<template>
    <v-container>
        <v-row>
            <v-col>Room number:</v-col>
            <v-col>{{ this.room.room_number }}</v-col>
        </v-row>
        <v-row>
            <v-col>Choice:</v-col>
            <v-col>{{ this.room.choice }}</v-col>
        </v-row>
        <v-row>
            <v-col>Bed number:</v-col>
            <v-col>{{ this.room.bed_numbers }}</v-col>
        </v-row>
        <v-row>
            <v-col>Price:</v-col>
            <v-col>{{ this.room.price }}</v-col>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-col v-if="room.smoking_allowed">Smoking allowed</v-col>
            <v-col v-else>Smoking is not allowed</v-col>
            <v-col v-if="room.air_conditioning">Air conditioning</v-col>
            <v-col v-else>No air conditioning</v-col>
        </v-row>
        <v-row>
            <v-col v-if="room.tv">TV</v-col>
            <v-col v-else>No TV</v-col>
            <v-col v-if="room.sound_isolation">Sound isolation</v-col>
            <v-col v-else>No sound isolation</v-col>
        </v-row>
        <br>
        <v-row>
            <v-col><v-btn v-if="userIsLoggedIn" @click="editRoom()">Edit room</v-btn></v-col>
            <v-col><v-btn @click="goToHotelPage()">Go to hotel</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        name: "Room",
        props: ['pk'],
        computed: mapGetters({
            room: 'room/getRoomData',
            userIsLoggedIn: 'user/isLoggedIn',
            hotel: 'hotel/getHotelData'
        }),
        mounted() {
            this.$store.dispatch('room/getroom', this.pk)
        },
        methods: {
            editRoom () {
                this.$router.push({ name: 'CreateEditRoom', params: { pk: this.room.pk } })
            },
            goToHotelPage () {
                this.$router.push({ name: 'Hotel', params: { pk: this.hotel.pk } })
            }
        }
    }
</script>

<style scoped>

</style>