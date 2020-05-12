<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card class="mx-auto" style="border-radius: 20px;">
                    <v-row class="pr-1 pt-1">
                        <v-spacer></v-spacer>
                        <v-btn icon color="indigo" @click="goToUserPage()">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn icon color="indigo" class="mr-4" v-if="userIsLoggedIn" @click="editHotel()">
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-card-title class="justify-center">
                        {{ hotel.name }}
                    </v-card-title>
                    <v-divider inset></v-divider>
                    <v-list two-line>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-city</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ hotel.city }}</v-list-item-title>
                                <v-list-item-subtitle>City</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-map-marker-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ hotel.address }}</v-list-item-title>
                                <v-list-item-subtitle>Address</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-map-marker-radius-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ hotel.position.name }}</v-list-item-title>
                                <v-list-item-subtitle>Position</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-web</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ hotel.webSite }}</v-list-item-title>
                                <v-list-item-subtitle>Address</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-group>
                            <v-icon slot="prependIcon" color="indigo">mdi-bed</v-icon>
                            <template v-slot:activator>
                                <v-list-item-title>Accommodations</v-list-item-title>
                            </template>
                            <v-list-item v-for="accommodation in this.accommodations" :key="accommodation.id" link>
                                <v-list-item-icon>
                                    <v-icon color="indigo">mdi-chevron-right</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title href="javascript:" @click="showAccommodation(accommodation.id)">
                                        {{ accommodation.quantity }}x {{ accommodation.type.name }} - {{ accommodation.bedCount }} bed(s)
                                        <span v-if="accommodation.type.value === 'AP'">, {{ accommodation.roomCount }} room(s)</span>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>Accommodation</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="createAccommodation()" link>
                                <v-list-item-icon>
                                    <v-icon color="indigo">mdi-plus-circle-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Create accomodation</v-list-item-title>
                                    <v-list-item-subtitle>This way you can create a new accommodation</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                        <v-divider inset></v-divider>
                        <br>
                        <v-row class="ml-2">
                            <v-col v-if="hotel.freeWifi"><v-icon color="green">mdi-wifi</v-icon>Free wifi</v-col>
                            <v-col v-else><v-icon color="red">mdi-wifi</v-icon>No free wifi</v-col>
                            <v-col v-if="hotel.freeParking"><v-icon color="green">mdi-parking</v-icon>Free parking</v-col>
                            <v-col v-else><v-icon color="red">mdi-parking</v-icon>No free parking</v-col>
                            <v-col v-if="hotel.breakfast"><v-icon color="green">mdi-food-variant</v-icon>Breakfast</v-col>
                            <v-col v-else><v-icon color="red">mdi-food-variant</v-icon>No breakfast</v-col>
                        </v-row>
                        <v-row class="ml-2">
                            <v-col v-if="hotel.swimmingPool"><v-icon color="green">mdi-swim</v-icon>Swimming pool</v-col>
                            <v-col v-else><v-icon color="red">mdi-swim</v-icon>No swimming pool</v-col>
                            <v-col v-if="hotel.spa"><v-icon color="green">mdi-spa</v-icon>Spa</v-col>
                            <v-col v-else><v-icon color="red">mdi-spa</v-icon>No spa</v-col>
                            <v-col v-if="hotel.gym"><v-icon color="green">mdi-dumbbell</v-icon>Gym</v-col>
                            <v-col v-else><v-icon color="red">mdi-dumbbell</v-icon>No gym</v-col>
                        </v-row>
                    </v-list>
                </v-card>
            </v-col>
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
            accommodations: 'accommodation/getAccommodationList'
        }),
        mounted() {
            this.$store.dispatch('hotel/get_hotel', this.id)
            this.$store.dispatch('accommodation/get_hotel_accommodations', this.id)
        },
        methods: {
            editHotel () {
                this.$router.push({ name: 'CreateEditHotel', params: { id: this.hotel.id } })
            },
            showAccommodation (id) {
                this.$router.push({ name: 'Accommodation', params: { id } })
            },
            createAccommodation () {
                this.$router.push({ name: 'CreateEditAccommodation', query: { 'hotel-id': this.hotel.id } })
            },
            goToUserPage () {
                this.$router.push({ name: 'User' })
            }
        }
    }
</script>

<style scoped>

</style>