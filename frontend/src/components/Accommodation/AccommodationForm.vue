<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5">
                    <v-card-title class="justify-center">{{ id ? "Edit accommodation" : "Create new accommodation" }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-combobox
                                v-model="accommodation.type"
                                :items="types"
                                item-text="name"
                                return-object
                                prepend-icon="mdi-pencil-outline"
                                label="Accommodation type"
                            ></v-combobox>
                            <v-text-field
                                v-if="accommodation.type.value === 'AP'"
                                label="Number of accommodations"
                                v-model="accommodation.roomCount"
                                prepend-icon="mdi-bed"
                                type="number"
                                :min="1"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Quantity"
                                v-model="accommodation.quantity"
                                prepend-icon="mdi-numeric-1-box-multiple-outline"
                                type="number"
                                :min="1"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Number of beds"
                                v-model="accommodation.bedCount"
                                prepend-icon="mdi-bed"
                                type="number"
                                :min="1"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Floors"
                                v-model="accommodation.floors"
                                prepend-icon="mdi-format-list-bulleted"
                                type="text"
                                :min="0"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Price per adult"
                                v-model="accommodation.pricePerAdult"
                                prepend-icon="mdi-cash"
                                :min="1"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Price per child"
                                v-model="accommodation.pricePerChild"
                                prepend-icon="mdi-cash"
                                :min="1"
                                validate-on-blur
                            />
                            <v-row justify="space-around">
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.smokingAllowed" :label="`Smoking`" prepend-icon="mdi-smoking" hide-details /></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.peopleWithDisabilitiesAdapted" :label="`Disabilities adapted`" prepend-icon="mdi-wheelchair-accessibility" hide-details /></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.terrace" :label="`Terrace`" prepend-icon="mdi-flower" hide-details /></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.airConditioning" :label="`Air conditioning`" prepend-icon="mdi-air-conditioner" hide-details/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.tv" :label="`TV`" prepend-icon="mdi-television-classic" hide-details /></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.soundIsolation" :label="`Sound isolation`" prepend-icon="mdi-volume-off" hide-details /></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.heating" :label="`Heating`" prepend-icon="mdi-radiator" hide-details /></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.kitchen" :label="`Kitchen`" prepend-icon="mdi-silverware" hide-details /></v-col>
                            </v-row>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="justify-center"><v-btn @click="changeAccommodation()">Complete</v-btn></v-card-actions>
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
                roomCountRequired: value => this.accommodation.type.value === 'ST' || !!value || "Required.",
            }},
            ...mapGetters({
                accommodation: 'accommodation/getAccommodationData'
            })
        },
        data: () => ({
            types: [
                { name: "Studio", value: 'ST' },
                { name: "Apartment", value: 'AP' },
            ]
        }),
        watchers: {
            accommodation: {
                deep: true,
                handler(newAccommodation) {
                    this.$store.dispatch('accommodation/model_changed', newAccommodation)
                }
            }
        },
        mounted() {
            if (this.id) {
                this.$store.dispatch('accommodation/get_accommodation', this.id)
            } else if (this.$route.query['hotel-id']) {
                this.$store.dispatch('accommodation/reset_accommodation', this.$route.query['hotel-id'])
            } else {
                this.$router.push({ name: 'Hotel' })
            }
        },
        methods: {
            async changeAccommodation() {
                if (this.id) {
                    await this.$store.dispatch('accommodation/update_accommodation')
                    this.$router.push({ name: 'Accommodation', params: { id: this.accommodation.id } })
                } else {
                    await this.$store.dispatch('accommodation/create_accommodation')
                    this.$router.push({ name: 'Hotel', params: { id: this.accommodation.hotelId } })
                }
            }
          },
    }
</script>

<style scoped>

</style>