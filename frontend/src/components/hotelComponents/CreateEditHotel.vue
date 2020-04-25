<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>{{ pk ? 'Edit hotel' : 'Create new hotel' }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Name"
                                v-model="hotel.name"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-combobox
                                v-model="hotel.city"
                                :items="cities"
                                :rules="[rules.selected]"
                                @input="validate"
                                label="Select a city"
                            ></v-combobox>
                            <v-text-field
                                label="Address"
                                v-model="hotel.address"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Web site"
                                v-model="hotel.webSite"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="hotel.freeWifi" :label="`Wifi`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.freeParking" :label="`Parking`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.breakfast" :label="`Breakfast`">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="hotel.swimmingPool" :label="`Swimming pool`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.spa" :label="`Spa`">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.gym" :label="`Gym`">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-form>
                    <v-card-actions><v-btn :disabled="!valid" @click="changeHotel()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "CreateHotel",
        props: ['pk'],
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                selected: () => !!this.hotel.city || "Required.",
            }},
            hotel() { return this.$store.getters['hotel/getHotelData']() },
        },
        data: () => ({
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
        mounted() {
            if (this.pk) {
                this.$store.dispatch('hotel/gethotel', this.pk)
            } else {
                this.$store.dispatch('hotel/clearhotel')
            }
        },
        methods: {
              validate () {
                    this.valid = this.rules.required(this.hotel.address) === true && this.rules.required(this.hotel.name) === true &&
                                 this.rules.required(this.hotel.webSite) === true && this.rules.selected() === true
              },
              async changeHotel() {
                    const data = { name: this.hotel.name, city: this.hotel.city,
                           address: this.hotel.address, web_site: this.hotel.webSite, free_parking: this.hotel.freeParking,
                           free_wifi: this.hotel.freeWifi, breakfast: this.hotel.breakfast, swimming_pool: this.hotel.swimmingPool,
                           spa: this.hotel.spa, gym: this.hotel.gym }
                    if (this.pk) {
                        await this.$store.dispatch('hotel/updatehotel', { pk: this.pk, data })
                    } else {
                        await this.$store.dispatch('hotel/createhotel', data)
                    }
                    this.$router.push({ name: 'User' })
              }
          },
    }
</script>

<style scoped>

</style>