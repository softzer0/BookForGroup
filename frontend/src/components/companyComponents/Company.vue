<template>
    <v-container>
        <v-row>
            <v-col>Company name:</v-col>
            <v-col>{{ company.name }}</v-col>
        </v-row>
        <v-row>
            <v-col>Phone:</v-col>
            <v-col>{{ company.phone }}</v-col>
        </v-row>
        <v-row>
            <v-col>PIB:</v-col>
            <v-col>{{company.pib}}</v-col>
        </v-row>
        <v-row>
            <v-col>City:</v-col>
            <v-col>{{ company.city }}</v-col>
        </v-row>
        <v-row>
            <v-col>Address:</v-col>
            <v-col>{{ company.address }}</v-col>
        </v-row>
        <v-row>
            <v-col><v-btn v-if="userIsLoggedIn" @click="editCompany()">Edit company</v-btn></v-col>
            <v-col><v-btn @click="goToUserPage()">Go back</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Company",
        computed: mapGetters({
            company: 'company/getCompanyData',
            userIsLoggedIn: 'user/isLoggedIn'
        }),
        mounted() {
            this.$store.dispatch('company/getusercompany')
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