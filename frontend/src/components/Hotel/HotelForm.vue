<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5">
                    <v-card-title class="justify-center">{{ id ? "Edit hotel" : "Create new hotel" }}</v-card-title>
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
                            <v-combobox
                                v-model="hotel.position"
                                :items="positions"
                                item-text="name"
                                return-object
                                prepend-icon="mdi-map-marker-radius-outline"
                                :rules="[rules.selected]"
                                @input="validate"
                                label="Position"
                            ></v-combobox>
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
                                    <v-checkbox v-model="hotel.freeWifi" :label="`Wifi`" prepend-icon="mdi-wifi" hide-details @change="valid === null && validate()"/>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.freeParking" :label="`Parking`" prepend-icon="mdi-parking" hide-details @change="valid === null && validate()"/>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.breakfast" :label="`Breakfast`" prepend-icon="mdi-food-variant" hide-details @change="valid === null && validate()"/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-checkbox v-model="hotel.swimmingPool" :label="`Swimming pool`" prepend-icon="mdi-swim" hide-details @change="valid === null && validate()">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.spa" :label="`Spa`" prepend-icon="mdi-spa" hide-details @change="valid === null && validate()">
                                    </v-checkbox>
                                </v-col>
                                <v-col>
                                    <v-checkbox v-model="hotel.gym" :label="`Gym`" prepend-icon="mdi-dumbbell" hide-details @change="valid === null && validate()">
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
        props: ['id'],
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                selected: () => !!this.hotel.city || "Required.",
            }},
            ...mapGetters({ hotel: 'hotel/getHotelData' })
        },
        data: () => ({
            valid: null,
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
            positions: [
                { name: "Inner center", value: 1 },
                { name: "Outer center", value: 2 },
                { name: "Near airport", value: 3 },
                { name: "Peripheral", value: 4 },
                { name: "Near sports center", value: 5 }
            ],
        }),
        watchers: {
            hotel: {
                deep: true,
                handler(newHotel) {
                    this.$store.dispatch('hotel/model_changed', newHotel)
                }
            }
        },
        mounted() {
            if (this.id) {
                this.$store.dispatch('hotel/get_hotel', this.id)
            } else {
                this.$store.dispatch('hotel/clear_hotel')
            }
        },
        methods: {
              validate () {
                    this.valid = this.rules.required(this.hotel.address) === true && this.rules.required(this.hotel.name) === true &&
                                 this.rules.required(this.hotel.webSite) === true && this.rules.selected() === true
              },
              async changeHotel() {
                    if (this.id) {
                        await this.$store.dispatch('hotel/update_hotel')
                    } else {
                        await this.$store.dispatch('hotel/create_hotel')
                    }
                    this.$router.push({ name: 'User' })
              }
          },
    }
</script>

<style scoped>

</style>