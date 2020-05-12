<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">{{ id ? "Edit accommodation" : "Create new accommodation" }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-combobox
                                v-model="accommodation.type"
                                :items="types"
                                item-text="name"
                                return-object
                                prepend-icon="mdi-pencil-outline"
                                @input="validate"
                                label="Accommodation type"
                            ></v-combobox>
                            <v-text-field
                                v-if="accommodation.type.value === 'AP'"
                                label="Number of accommodations"
                                v-model="accommodation.roomCount"
                                prepend-icon="mdi-bed"
                                type="number"
                                :rules="[rules.roomCountRequired]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Quantity"
                                v-model="accommodation.quantity"
                                prepend-icon="mdi-numeric-1-box-multiple-outline"
                                type="number"
                                :min="1"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Number of beds"
                                v-model="accommodation.bedCount"
                                prepend-icon="mdi-bed"
                                type="number"
                                :min="1"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Floors"
                                v-model="accommodation.floors"
                                prepend-icon="mdi-format-list-bulleted"
                                type="number"
                                :min="0"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Price per adult"
                                v-model="accommodation.pricePerAdult"
                                prepend-icon="mdi-cash"
                                :min="1"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Price per child"
                                v-model="accommodation.pricePerChild"
                                prepend-icon="mdi-cash"
                                :min="1"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="accommodation.reservedPeriod"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="dateRangeText"
                                        :rules="[rules.requiredPeriod]"
                                        label="Date range"
                                        prepend-icon="mdi-calendar-range"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="accommodation.reservedPeriod" range @change="validate">
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.dialog.save(accommodation.reservedPeriod)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-row justify="space-around">
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.smokingAllowed" :label="`Smoking`" prepend-icon="mdi-smoking" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.peopleWithDisabilitiesAdapted" :label="`Disabilities adapted`" prepend-icon="mdi-wheelchair-accessibility" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.terrace" :label="`Terrace`" prepend-icon="mdi-flower" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.airConditioning" :label="`Air conditioning`" prepend-icon="mdi-air-conditioner" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.tv" :label="`TV`" prepend-icon="mdi-television-classic" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.soundIsolation" :label="`Sound isolation`" prepend-icon="mdi-volume-off" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.heating" :label="`Heating`" prepend-icon="mdi-radiator" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="accommodation.kitchen" :label="`Kitchen`" prepend-icon="mdi-silverware" hide-details @change="valid === null && validate()"/></v-col>
                            </v-row>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="justify-center"><v-btn :disabled="!valid" @click="changeAccommodation()">Complete</v-btn></v-card-actions>
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
                requiredPeriod: value => value.indexOf('~') > 1 || "Invalid date range!"
            }},
            ...mapGetters({
                accommodation: 'accommodation/getAccommodationData'
            }),
            dateRangeText () {
                return this.accommodation.reservedPeriod.join(' ~ ')
            }
        },
        data: () => ({
            valid: null,
            types: [
                { name: "Studio", value: 'ST' },
                { name: "Apartment", value: 'AP' },
            ],
            modal: false,
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
                this.$router.push({ name: 'User' })
            }
        },
        methods: {
              validate () {
                    this.valid = this.rules.requiredPeriod(this.dateRangeText) === true
              },
              async changeAccommodation() {
                    if (this.id) {
                        await this.$store.dispatch('accommodation/update_accommodation')
                    } else {
                        await this.$store.dispatch('accommodation/create_accommodation')
                    }
                    this.$router.push({ name: 'Hotel', params: { id: this.accommodation.hotelId } })
              }
          },
    }
</script>

<style scoped>

</style>