<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card class="mx-auto" style="border-radius: 20px;">
                    <v-row class="pr-1 pt-1">
                        <v-spacer></v-spacer>
                        <v-btn icon color="indigo" @click="goToHotelPage()">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn icon color="indigo" class="mr-4" v-if="userIsLoggedIn" @click="editAccommodation()">
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-card-title class="justify-center">Accommodation</v-card-title>
                    <v-divider inset></v-divider>
                    <v-list two-line>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-bed</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ accommodation.quantity }}x {{ accommodation.type.name }} - {{ accommodation.bedCount }} bed(s)
                                    <span v-if="accommodation.type.value === 'AP'">, {{ accommodation.roomCount }} room(s)</span>
                                </v-list-item-title>
                                <v-list-item-subtitle>Mean</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-format-list-bulleted</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ accommodation.floors }}
                                </v-list-item-title>
                                <v-list-item-subtitle>Floors</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-cash</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ accommodation.pricePerAdult }}
                                </v-list-item-title>
                                <v-list-item-subtitle>Price per adult</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-cash</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ accommodation.pricePerChild }}
                                </v-list-item-title>
                                <v-list-item-subtitle>Price per child</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-calendar-range</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ accommodation.reservedPeriod[0] }}~{{accommodation.reservedPeriod[1]}}
                                </v-list-item-title>
                                <v-list-item-subtitle>Reserved period</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <br>
                        <v-row class="ml-1">
                            <v-col v-if="accommodation.smokingAllowed"><v-icon color="green">mdi-smoking</v-icon>Smoking</v-col>
                            <v-col v-else><v-icon color="red">mdi-smoking</v-icon>No smoking</v-col>
                            <v-col v-if="accommodation.peopleWithDisabilitiesAdapted"><v-icon color="green">mdi-wheelchair-accessibility</v-icon>Disabilities adapted</v-col>
                            <v-col v-else><v-icon color="red">mdi-wheelchair-accessibility</v-icon>No disabilities adapted</v-col>
                            <v-col v-if="accommodation.terrace"><v-icon color="green">mdi-flower</v-icon>Terrace</v-col>
                            <v-col v-else><v-icon color="red">mdi-flower</v-icon>No terrace</v-col>
                        </v-row>
                        <v-row class="ml-1">
                            <v-col v-if="accommodation.airConditioning"><v-icon color="green">mdi-air-conditioner</v-icon>Air conditioning</v-col>
                            <v-col v-else><v-icon color="red">mdi-air-conditioner</v-icon>No air conditioning</v-col>
                            <v-col v-if="accommodation.tv"><v-icon color="green">mdi-television-classic</v-icon>TV</v-col>
                            <v-col v-else><v-icon color="red">mdi-television-classic</v-icon>No TV</v-col>
                            <v-col v-if="accommodation.soundIsolation"><v-icon color="green">mdi-volume-off</v-icon>Sound isolation</v-col>
                            <v-col v-else><v-icon color="red">mdi-volume-off</v-icon>No sound isolation</v-col>
                        </v-row>
                        <v-row class="ml-6">
                            <v-col v-if="accommodation.heating"><v-icon color="green">mdi-radiator</v-icon>Heating</v-col>
                            <v-col v-else><v-icon color="red">mdi-radiator</v-icon>No heating</v-col>
                            <v-col v-if="accommodation.kitchen"><v-icon color="green">mdi-silverware</v-icon>Kitchen</v-col>
                            <v-col v-else><v-icon color="red">mdi-silverware</v-icon>No kitchen</v-col>
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