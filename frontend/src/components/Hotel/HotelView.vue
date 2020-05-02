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
            <v-col v-else>No free wifi</v-col>
            <v-col v-if="hotel.freeParking">Free parking</v-col>
            <v-col v-else>No free parking</v-col>
        </v-row>
        <v-row>
            <v-col v-if="hotel.breakfast">Breakfast</v-col>
            <v-col v-else>No breakfast</v-col>
            <v-col v-if="hotel.swimmingPool">Swimming pool</v-col>
            <v-col v-else>No swimming pool</v-col>
        </v-row>
        <v-row>
            <v-col v-if="hotel.spa">Spa</v-col>
            <v-col v-else>No spa</v-col>
            <v-col v-if="hotel.gym">Gym</v-col>
            <v-col v-else>No gym</v-col>
        </v-row>
        <br>
        <br>
        <v-row>
            <v-col>Rooms:</v-col>
            <v-col>
                <ul>
                    <li v-for="room in this.rooms" :key="room.roomNumber">
                        <a href="javascript:" @click="showRoom(room.id)">{{ room.roomNumber }}</a>
                    </li>
                </ul>
            </v-col>
        </v-row>
        <v-row>
            <v-col><v-btn v-if="userIsLoggedIn" @click="editHotel()">Edit hotel</v-btn></v-col>
            <v-col><v-btn @click="createRoom()">Create room</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Hotel",
        props: ['id'],
        computed: mapGetters({
            hotel: 'hotel/getHotelData',
            userIsLoggedIn: 'user/isLoggedIn',
            rooms: 'room/getRoomList'
        }),
        mounted() {
            this.$store.dispatch('hotel/get_hotel', this.id)
            this.$store.dispatch('room/get_hotel_rooms', this.id)
        },
        methods: {
            editHotel () {
                this.$router.push({ name: 'CreateEditHotel', params: { id: this.hotel.id } })
            },
            showRoom (id) {
                this.$router.push({ name: 'Room', params: { id } })
            },
            createRoom () {
                this.$router.push({ name: 'CreateEditRoom'})
            }
        }
    }
</script>

<style scoped>

</style>