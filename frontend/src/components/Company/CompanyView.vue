<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card class="mx-auto" style="border-radius: 20px;">
                    <v-row style="float: right">
                        <v-spacer></v-spacer>
                        <v-btn icon color="indigo" @click="goToUserPage()">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn icon color="indigo" class="mr-4" v-if="userIsLoggedIn" @click="editCompany()">
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                    </v-row>
                    <v-card-title class="justify-center">{{ company.name }}</v-card-title>
                    <v-divider inset></v-divider>
                    <v-list two-line>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-phone</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ company.phone }}</v-list-item-title>
                                <v-list-item-subtitle>Phone</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-numeric</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ company.pib }}</v-list-item-title>
                                <v-list-item-subtitle>PIB</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-city</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ company.city }}</v-list-item-title>
                                <v-list-item-subtitle>City</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-map-marker-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ company.address }}</v-list-item-title>
                                <v-list-item-subtitle>Address</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: mapGetters({
            company: 'company/getCompanyData',
            userIsLoggedIn: 'user/isLoggedIn'
        }),
        mounted() {
            this.$store.dispatch('company/get_user_company')
        },
        methods: {
            editCompany () {
                this.$router.push({ name: 'CreateEditCompany'})
            },
            goToUserPage () {
                this.$router.push({ name: 'User' })
            }
        }
    }
</script>

<style scoped>

</style>