<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">Login</v-card-title>
                    <v-form @keyup.enter.native="valid && login()">
                        <v-card-text>
                            <v-alert v-if="showError" type="error">Invalid login</v-alert>
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
                        </v-card-text>
                        <v-card-actions class="justify-center"><v-btn :disabled="!valid" @click="login()">Login</v-btn></v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid e-mail."
            }}
        },
        data: () => ({
            email: null,
            password: null,
            showError: false,
            showPassword: false,
            valid: false
        }),
        methods: {
            validate () {
                this.valid =  this.rules.required(this.email) === true && this.rules.email(this.email) === true && this.rules.required(this.password) === true
            },
            async login () {
                try {
                    await this.$store.dispatch('user/login', {email: this.email, password: this.password})
                    this.$router.push({name: 'User'})
                } catch (e) {
                    this.showError = true
                }
            }
        }
    }
</script>

<style scoped>

</style>