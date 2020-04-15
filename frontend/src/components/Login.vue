<template>
    <v-container>
        <v-card>
            <v-card-title>Login</v-card-title>
            <v-form>
                <v-card-text>
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
                </v-card-text>
                <v-card-actions><v-btn :disabled="!valid">Login</v-btn></v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        computed: {
            rules: () => ({
                required: value => !!value || "Required.",
                email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Invalid e-mail."
            })
        },
        data: () => ({
            email: null,
            password: null,
            valid: false
        }),
        methods: {
            validate () {
                this.valid = this.rules.email(this.email) === true && this.rules.required(this.password) === true
            }
        }
    }
</script>

<style scoped>

</style>