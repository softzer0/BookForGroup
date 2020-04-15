<template>
    <v-container>
        <v-card>
            <v-card-title>Register</v-card-title>
            <v-form>
                <v-card-text>
                    <!-- Mora da pocne slovom, ali na kraju dozvoljava druge karaktere -->
                    <v-text-field
                        label="First name"
                        v-model="firstName"
                        :rules="nameRules"
                        @input="validate"
                        validate-on-blur
                    />
                    <v-text-field
                        label="Last name"
                        v-model="lastName"
                        :rules="nameRules"
                        @input="validate"
                        validate-on-blur
                    />
                    <v-text-field
                        label="Email"
                        v-model="email"
                        :rules="[rules.email]"
                        @input="validate"
                        validate-on-blur
                    />
                    <v-text-field
                            type="password"
                            label="Password"
                            v-model="password"
                            :rules="[rules.required]"
                            @input="validate"
                            validate-on-blur
                    />
                    <v-text-field
                            type="password"
                            label="Confirm password"
                            v-model="confirmPassword"
                            :rules="[rules.required]"
                            @input="validate"
                            validate-on-blur
                    />
                    <v-text-field
                        label="Phone"
                        v-model="phone"
                        :rules="phoneRules"
                        @input="validate"
                        validate-on-blur
                    />
                </v-card-text>
                <v-card-actions><v-btn :disabled="!valid">Register</v-btn></v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Register",
        computed: {
            rules: () => ({
                required: value => !!value || "Required.",
                email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid e-mail."
            })
        },
        data: () => ({
            firstName: null,
            lastName: null,
            nameRules: [
                v => !!v || 'Name is required!',
                v=> ! /\d/.test(v) || 'Name contains just characters!',
                v => v.length <= 20 || 'Name must be less than 20 characters!',
            ],
            email: null,
            password: null,
            confirmPassword: null,
            phone: null,
            phoneRules: [
                v => /\d/.test(v) || 'Phone contains just digits!',
                v => ! /[a-zA-Z]/.test(v) || 'Phone contains just digits!',
            ],
            valid: false
        }),
        methods: {
            validate () {
                this.valid = this.rules.email(this.email) === true && this.rules.required(this.password)
            }
        }
    }
</script>

<style scoped>

</style>