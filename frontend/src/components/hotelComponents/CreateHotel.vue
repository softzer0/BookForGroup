<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>Create new hotel</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Name"
                                v-model="name"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-combobox
                                v-model="city"
                                :items="cities"
                                :rules="[rules.selected]"
                                label="Select a city"
                            ></v-combobox>
                            <v-text-field
                                label="Address"
                                v-model="address"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Web site"
                                v-model="website"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="cbWifi" :label="`Wifi`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="cbParking" :label="`Parking`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="cbBreakfast" :label="`Breakfast`">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="cbSwimmingPool" :label="`Swimming pool`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="cbSpa" :label="`Spa`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="cbGym" :label="`Gym`">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-form>
                    <v-card-actions><v-btn :disabled="!valid" @click="createHotel()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "CreateHotel",
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                selected: () => !!this.city || "Required.",
            }},
            user() { return this.$store.getters['user/getUserData']() },
        },
        data: () => ({
            name: '',
            city: '',
            address: '',
            website: '',
            cbWifi: false,
            cbParking: false,
            cbBreakfast: false,
            cbSwimmingPool: false,
            cbSpa: false,
            cbGym: false,
            checkbox1: true,
            checkbox2: false,
            autoUpdate: true,
            valid: false,
            cities: [
              'Beograd',
              'Vranje',
              'Surdulica',
              'Nis',
              'Podgorica',
              'Bar',
              'Kotor',
              'Tivat',
            ],
          }),
          methods: {
              validate () {
                this.valid = this.rules.required(this.address) === true && this.rules.required(this.name) === true &&
                             this.rules.required(this.website) === true && this.rules.selected(this.city) === true
              },
              async createHotel() {
                await this.$store.dispatch('hotel/createhotel', { user: this.user, name: this.name, city: this.city,
                                                                               address: this.address, web_site: this.website, free_parking: this.cbParking,
                                                                               free_wifi: this.cbWifi, breakfast: this.cbBreakfast, swimming_pool: this.cbSwimmingPool,
                                                                               spa: this.cbSpa, gym: this.cbGym})
                this.$router.push({ name: 'User' })
              }
          },
    }
</script>

<style scoped>

</style>