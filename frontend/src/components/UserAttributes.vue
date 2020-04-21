<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>Complete the profile</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-combobox
                                v-model="user.city"
                                :items="cities"
                                :rules="[rules.selected]"
                                label="Select a city"
                            ></v-combobox>
                            <v-text-field
                                label="Address"
                                v-model="user.address"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                        </v-card-text>
                    </v-form>
                    <v-card-actions><v-btn :disabled="!valid" @click="addProperties()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "UserAttributes",
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                selected: () => !!this.user.city || "Required.",
            }},
            user() { return this.$store.getters['user/getUserData']() }
        },
        data: () => ({
            autoUpdate: true,
            valid: false,
            cities: [
              'Srbija',
              'Beograd',
              'Vranje',
              'Surdulica',
              'Nis',
              'Crna Gora',
              'Podgorica',
              'Bar',
              'Kotor',
              'Tivat',
            ],
          }),
          methods: {
              validate () {
                this.valid = this.rules.required(this.user.address) === true && this.rules.selected(this.user.city) === true
              },
              async addProperties() {
                await this.$store.dispatch('user/completeUser', { city: this.user.city, address: this.user.address })
                this.$router.push({ name: 'User' })
              }
          },
    }
</script>

<style scoped>

</style>