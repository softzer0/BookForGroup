<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>Complete the profile</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-combobox
                                v-model="selected"
                                :items="cities"
                                :rules="[rules.required, rules.selected]"
                                label="Select a city"
                              ></v-combobox>
                            <v-text-field
                            label="Address"
                            v-model="address"
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
                selected: () => !! this.selected || "Required.",
            }}
        },
        data: () => ({
            autoUpdate: true,
            selected: '',
            address: '',
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
                this.valid = this.rules.required(this.address) === true && this.rules.required(this.selected) === true &&
                        this.rules.selected(this.selected) === true
              },
              async addProperties() {
                await this.$store.dispatch('user/completeUser', { city: this.selected, address: this.address })
                this.$router.push({ name: 'User' })
              }
          },
    }
</script>

<style scoped>

</style>