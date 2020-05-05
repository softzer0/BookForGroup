<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card class="mx-auto" style="border-radius: 20px;">
                    <v-card-title class="justify-center">
                        {{ user.firstName }}
                        {{ user.lastName }}
                    </v-card-title>
                    <v-divider inset></v-divider>
                    <v-list two-line>
                        <v-list-item v-if="this.company.name" href="javascript:" @click="showCompany()">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-office-building</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ this.company.name }}</v-list-item-title>
                                <v-list-item-subtitle>Company name</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-else @click="createCompany()">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-office-building</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Create company</v-list-item-title>
                                <v-list-item-subtitle>This way you can create a new company</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-group>
                            <v-icon slot="prependIcon" color="indigo">mdi-bed</v-icon>
                            <template v-slot:activator>
                                <v-list-item-title>Hotels</v-list-item-title>
                            </template>
                            <v-list-item
                                v-for="hotel in this.hotels"
                                :key="hotel.name"
                                link
                            >
                                <v-list-item-icon>
                                    <v-icon color="indigo">mdi-chevron-right</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title href="javascript:" @click="showHotel(hotel.id)" v-text="hotel.name"></v-list-item-title>
                                    <v-list-item-subtitle>Hotel name</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="createHotel()" link>
                                <v-list-item-icon>
                                    <v-icon color="indigo">mdi-plus-circle-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Create hotel</v-list-item-title>
                                    <v-list-item-subtitle>This way you can create a new hotel</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                    <v-divider inset></v-divider>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "User",
        computed: mapGetters({
            user: 'user/getUserData',
            hotels: 'hotel/getHotelList',

            company: 'company/getCompanyData',
            companyExists: 'company/doesExist'
        }),
        methods: {
            createCompany () {
                this.$router.push({ name: 'CreateEditCompany' })
            },
            createHotel () {
                this.$router.push({ name: 'CreateEditHotel' })
            },
            showHotel (id) {
                this.$router.push({ name: 'Hotel', params: { id } })
            },
            showCompany () {
                this.$router.push({ name: 'Company' })
            }
        },
        mounted() {
            this.$store.dispatch('hotel/get_user_hotels', this.user.id)
            if (!this.companyExists) {
                this.$store.dispatch('company/get_user_company')
            }
        }
    }
</script>

<style scoped>

</style>