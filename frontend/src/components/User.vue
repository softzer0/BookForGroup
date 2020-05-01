<template>
    <v-container>
        <v-row>
            <v-col>First name:</v-col>
            <v-col>{{ user.firstName }}</v-col>
        </v-row>
        <v-row>
            <v-col>Last name:</v-col>
            <v-col>{{ user.lastName }}</v-col>
        </v-row>
        <v-row v-if="user.city">
            <v-col>City:</v-col>
            <v-col>{{ user.city }}</v-col>
        </v-row>
        <v-row v-if="user.address">
            <v-col>Address:</v-col>
            <v-col>{{ user.address }}</v-col>
        </v-row>
        <v-row>
            <v-col>Company:</v-col>
            <v-col><a v-if="this.company" href="javascript:" @click="showCompany()">{{ this.company.name }}</a></v-col>
        </v-row>
        <v-row>
            <v-col>Hotels:</v-col>
            <v-col>
                <ul>
                    <li v-for="hotel in this.hotels" :key="hotel.name">
                        <a href="javascript:" @click="showHotel(hotel.pk)">{{ hotel.name }}</a>
                    </li>
                </ul>
            </v-col>
        </v-row>
        <br>
        <v-row>
            <v-col>
                <v-btn v-if="!this.companyExists" @click="createCompany()">Create company</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="createHotel()" class="cyan darken-1 white--text">Create new hotel</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from "vuex"

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
            showHotel (pk) {
                this.$router.push({ name: 'Hotel', params: { pk } })
            },
            showCompany () {
                this.$router.push({ name: 'Company' })
            }
        },
        mounted() {
            this.$store.dispatch('hotel/userhotels', this.user.id)
            this.$store.dispatch('company/getusercompany')
        }
    }
</script>

<style scoped>

</style>