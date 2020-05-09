<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6">
                <v-autocomplete
                    v-model="city"
                    :items="cities"
                    item-text="name"
                    return-object
                    dense
                    filled
                    label="City"
                />
            </v-col>
            <v-col>
                <v-autocomplete
                    v-model="position"
                    :items="positions"
                    item-text="name"
                    return-object
                    dense
                    filled
                    multiple
                    label="Position"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
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
                    <v-date-picker v-model="date" range>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-autocomplete
                v-model="type"
                :items="types"
                item-text="name"
                return-object
                label="Type of accommodation">
                    <v-btn icon slot="append-outer" @click="add()">
                        <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" v-for="(collection, index) in collections" :key="collection.value">
                <v-card outlined>
                    <v-card-title>
                        <v-row justify="space-between">
                            <v-col>{{ collection.value === 'ST' ? "Studios" : "Apartments" }}</v-col>
                            <v-col class="flex-grow-0 flex-shrink-1">
                                <v-btn icon @click="remove(index)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4" sm="6" md="4">
                                <v-text-field
                                    v-model="collection.quantity"
                                    type="number"
                                    :min="1"
                                    label="How many?"
                                />
                            </v-col>
                            <v-col cols="4" sm="6" md="4">
                                <v-text-field
                                    v-model="collection.bedCount"
                                    type="number"
                                    :min="1"
                                    label="Number of beds"
                                    @input="setBedrooms(collection)"
                                />
                            </v-col>
                            <v-col cols="4" sm="6" md="4" v-if="collection.value === 'AP' && collection.bedCount > 1">
                                <v-text-field
                                    v-model="collection.roomCount"
                                    type="number"
                                    :min="1"
                                    :max="collection.bedCount"
                                    label="Number of bedrooms"
                                />
                            </v-col>
                        </v-row>
                        <v-row justify="space-around">
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.smokingAllowed" :label="`Smoking`" prepend-icon="mdi-smoking" hide-details></v-checkbox></v-col>
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.peopleWithDisabilitiesAdapted" :label="`Disabilities adapted`" prepend-icon="mdi-wheelchair-accessibility" hide-details></v-checkbox></v-col>
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.terrace" :label="`Terrace`" prepend-icon="mdi-flower" hide-details></v-checkbox></v-col>
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.airConditioning" :label="`Air conditioning`" prepend-icon="mdi-air-conditioner" hide-details></v-checkbox></v-col>
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.tv" :label="`TV`" prepend-icon="mdi-television-classic" hide-details></v-checkbox></v-col>
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.soundIsolation" :label="`Sound isolation`" prepend-icon="mdi-volume-off" hide-details></v-checkbox></v-col>
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.heating" :label="`Heating`" prepend-icon="mdi-radiator" hide-details></v-checkbox></v-col>
                            <v-col class="flex-grow-0"><v-checkbox v-model="collection.kitchen" :label="`Kitchen`" prepend-icon="mdi-silverware" hide-details></v-checkbox></v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-btn class="mt-3" block @click="search()">Search</v-btn>
        <ul>
            <li v-for="accommodation in this.accommodations" :key="accommodation.id" link>
                {{ accommodation.quantity }}x {{ accommodation.type.name }} - {{ accommodation.bedCount }} bed(s)
                <span v-if="accommodation.type.value === 'AP'">, {{ accommodation.roomCount }} room(s)</span>
            </li>
        </ul>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Home",
        computed: {
            rules() {return {
                requiredPeriod: value => value.indexOf('~') > 1 || "Invalid date range!"
            }},
            dateRangeText () {
                return this.date.join(' ~ ')
            },
            ...mapGetters ({
                accommodations: 'search/getAccommodationList'
            })
        },
        data: () => ({
            date: [],
            modal: false,
            cities: [
              { header: 'Srbija' },
              { name: 'Beograd' },
              { name: 'Vranje' },
              { name: 'Surdulica' },
              { name: 'Nis' },
              { divider: true },
              { header: 'Crna Gora' },
              { name: 'Podgorica' },
              { name: 'Bar' },
              { name: 'Kotor' },
              { name: 'Tivat' },
            ],
            city: null,

            types: [
                { name: "Studio", value: 'ST' },
                { name: "Apartment", value: 'AP' }
            ],
            type: { name: "Studio", value: 'ST' },

            position: null,
            positions: [
                { name: "Inner center" },
                { name: "Outer center" },
                { name: "Near airport" },
                { name: "Peripheral" },
                { name: "Near sports center" }
            ],

            collections: [],
        }),
        mounted() {
            this.$store.dispatch('search/reset')
        },
        methods: {
            add() {
                const collection = {
                    value: this.type.value,
                    quantity: 1,
                    bedCount: 1,
                    smokingAllowed: false,
                    peopleWithDisabilitiesAdapted: false,
                    terrace: false,
                    airConditioning: false,
                    tv: false,
                    soundIsolation: false,
                    heating: false,
                    kitchen: false
                }
                if (collection.value === 'AP') {
                    collection.roomCount = 1
                }
                this.collections.push(collection)
            },
            remove(index) {
                this.collections.splice(index, 1)
            },
            setBedrooms(collection) {
                if (collection.value === 'AP' && collection.roomCount > collection.bedCount) collection.roomCount = collection.bedCount
            },
            search() {
                this.$store.dispatch('search/get_filtered_accommodation', { rangeDate: this.date })
            }
        },
    }
</script>

<style scoped>

</style>