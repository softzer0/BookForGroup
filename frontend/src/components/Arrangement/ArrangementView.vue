<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card class="mx-auto" style="border-radius: 20px;">
                    <v-row class="pr-1 pt-1">
                        <v-spacer></v-spacer>
                        <v-btn icon color="indigo" @click="goToAccommodationPage()">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn icon color="indigo" class="mr-4" v-if="userIsLoggedIn" @click="editArrangement()">
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-card-title class="justify-center">Arrangement</v-card-title>
                    <v-divider inset></v-divider>
                    <v-list two-line>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-numeric-1-box-multiple-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ arrangement.quantity }}
                                </v-list-item-title>
                                <v-list-item-subtitle>Quantity</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-calendar-range</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ arrangement.reservedPeriod[0] }}~{{arrangement.reservedPeriod[1]}}
                                </v-list-item-title>
                                <v-list-item-subtitle>Reserved period</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ArrangementView",
        props: ['id'],
        computed: mapGetters({
            arrangement: 'arrangement/getArrangementData',
            userIsLoggedIn: 'user/isLoggedIn',
            accommodation: 'accommodation/getAccommodationData'
        }),
        mounted() {
            this.$store.dispatch('arrangement/get_arrangement', this.id)
        },
        methods: {
            editArrangement () {
                this.$router.push({ name: 'CreateEditArrangement', params: { id: this.arrangement.id } })
            },
            goToAccommodationPage () {
                this.$router.push({ name: 'Accommodation', params: { id: this.accommodation.id } })
            }
        }
    }
</script>

<style scoped>

</style>