<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">{{ id ? 'Edit hotel' : 'Create new hotel' }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Name"
                                v-model="hotel.name"
                                prepend-icon="mdi-pencil-outline"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-combobox
                                v-model="hotel.city"
                                :items="cities"
                                prepend-icon="mdi-city"
                                :rules="[rules.selected]"
                                @input="validate"
                                label="Select a city"
                            ></v-combobox>
                            <v-text-field
                                label="Address"
                                v-model="hotel.address"
                                prepend-icon="mdi-map-marker-outline"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Web site"
                                v-model="hotel.webSite"
                                prepend-icon="mdi-pencil-outline"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="hotel.freeWifi" :label="`Wifi`" prepend-icon="mdi-wifi">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.freeParking" :label="`Parking`" prepend-icon="mdi-parking">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.breakfast" :label="`Breakfast`" prepend-icon="mdi-food-variant">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="hotel.swimmingPool" :label="`Swimming pool`" prepend-icon="mdi-swim">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.spa" :label="`Spa`" prepend-icon="mdi-spa">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.gym" :label="`Gym`" prepend-icon="mdi-dumbbell">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="justify-center"><v-btn :disabled="!valid" @click="changeHotel()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "CreateHotel",
        props: ['id'],
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                selected: () => !!this.hotel.city || "Required.",
            }},
            ...mapGetters({ hotel: 'hotel/getHotelData' })
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
            if (this.id) {
                this.$store.dispatch('hotel/gethotel', this.id)
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
                    if (this.id) {
                        await this.$store.dispatch('hotel/updatehotel', { id: this.id, data })
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