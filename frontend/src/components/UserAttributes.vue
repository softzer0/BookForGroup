<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>Complete the profile</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="First name"
                                v-model="user.firstName"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Last name"
                                v-model="user.lastName"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                        </v-card-text>
                    </v-form>
                    <v-card-actions><v-btn :disabled="!valid" @click="update()">Update</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "UserAttributes",
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
            }},
            ...mapGetters({ user: 'user/getUserData' })
        },
        data: () => ({
            valid: false,
        }),
        methods: {
            validate () {
                this.valid = this.rules.required(this.user.firstName) === true && this.rules.selected(this.user.lastName) === true
            },
            async addProperties() {
                await this.$store.dispatch('user/update_user', { first_name: this.user.firstName, last_name: this.user.lastName })
                this.$router.push({ name: 'User' })
            }
        }
    }
</script>

<style scoped>

</style>