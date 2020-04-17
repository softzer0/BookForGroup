<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>Register</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="First name"
                                v-model="firstName"
                                :rules="[rules.required, rules.lettersOnly, rules.nameLength]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Last name"
                                v-model="lastName"
                                :rules="[rules.required, rules.lettersOnly, rules.nameLength]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Email"
                                v-model="email"
                                :rules="[rules.required, rules.email]"
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
                                    :rules="[rules.required, this.rules.confirmPassword]"
                                    @input="validate"
                                    validate-on-blur
                            />
                            <v-text-field
                                label="Phone"
                                v-model="phone"
                                :rules="[rules.required, rules.digitsOnly]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Address"
                                v-model="address"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                        </v-card-text>
                        <v-card-actions><v-btn :disabled="!valid" @click="register()">Register</v-btn></v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Register",
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid e-mail.",
                lettersOnly: v => ! /\d/.test(v) || 'Name contains just characters!',
                nameLength: v => v.length <= 20 || 'Name must be less than 20 characters!',
                digitsOnly: v => /^\+?\d+$/.test(v) || 'Phone contains just digits!',
                confirmPassword: v => v === this.password || 'Passwords must match!'
            }}
        },
        data: () => ({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            valid: false
        }),
        methods: {
            validate () {
                this.valid = this.rules.required(this.email) === true && this.rules.required(this.password) === true &&
                             this.rules.required(this.firstName) === true && this.rules.required(this.lastName) === true &&
                             this.rules.required(this.confirmPassword) === true && this.rules.required(this.phone) === true &&
                             this.rules.confirmPassword(this.confirmPassword) === true && this.rules.required(this.address) &&
                             this.rules.lettersOnly(this.firstName) === true && this.rules.lettersOnly(this.lastName) === true &&
                             this.rules.nameLength(this.firstName) === true && this.rules.nameLength(this.lastName) === true &&
                             this.rules.digitsOnly(this.phone) === true && this.rules.email(this.email) === true
            },
            async register () {
                await this.$store.dispatch('user/register', { email: this.email, password1: this.password,
                                                                            password2: this.confirmPassword, first_name: this.firstName,
                                                                            last_name: this.lastName, phone: this.phone, address: this.address })
                this.$router.push({ name: 'User' })
            }
        }
    }
</script>

<style scoped>

</style>