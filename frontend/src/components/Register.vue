<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">Registration</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="First name"
                                v-model="firstName"
                                prepend-icon="mdi-account-outline"
                                counter="20"
                                :rules="[rules.required, rules.lettersOnly, rules.nameLength]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Last name"
                                v-model="lastName"
                                prepend-icon="mdi-account-outline"
                                counter="20"
                                :rules="[rules.required, rules.lettersOnly, rules.nameLength]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Email"
                                v-model="email"
                                prepend-icon="mdi-email-outline"
                                :rules="[rules.required, rules.email]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                v-model="password"
                                prepend-icon="mdi-lock-outline"
                                :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                @click:append="showPassword = !showPassword"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                :type="showConfirmPassword ? 'text' : 'password'"
                                label="Confirm password"
                                v-model="confirmPassword"
                                prepend-icon="mdi-lock-outline"
                                :append-icon="showConfirmPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                @click:append="showConfirmPassword = !showConfirmPassword"
                                :rules="[rules.required, this.rules.confirmPassword]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-card-actions class="justify-center"><v-btn :disabled="!valid" @click="register()">Register</v-btn></v-card-actions>
                        </v-card-text>
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
                lettersOnly: v => /^\w+$/.test(v) || 'Name contains just letters!',
                nameLength: v => v.length <= 20 || 'Name must be less than 20 characters!',
                confirmPassword: v => v === this.password || 'Passwords must match!'
            }}
        },
        data: () => ({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false,
            valid: false
        }),
        methods: {
            validate () {
                this.valid = this.rules.required(this.email) === true && this.rules.required(this.password) === true &&
                             this.rules.required(this.firstName) === true && this.rules.required(this.lastName) === true &&
                             this.rules.required(this.confirmPassword) === true && this.rules.confirmPassword(this.confirmPassword) === true &&
                             this.rules.lettersOnly(this.firstName) === true && this.rules.lettersOnly(this.lastName) === true &&
                             this.rules.nameLength(this.firstName) === true && this.rules.nameLength(this.lastName) === true &&
                             this.rules.email(this.email) === true
            },
            async register () {
                await this.$store.dispatch('user/register', { email: this.email, password1: this.password,
                                                                            password2: this.confirmPassword, first_name: this.firstName,
                                                                            last_name: this.lastName })
                this.$router.push({ name: 'User' })
            }
        }
    }
</script>

<style scoped>

</style>