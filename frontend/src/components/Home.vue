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
            <v-col cols="12" sm="6" v-for="collection in collections" :key="collection.value">
                <v-card outlined>
                    <v-card-title>
                        <v-row justify="space-between">
                            <v-col>{{ collection.value === 'ST' ? "Studios" : "Apartments" }}</v-col>
                            <v-col class="flex-grow-0 flex-shrink-1">
                                <v-btn icon @click="remove(collection)">
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
                                    v-model="collection.bedroomsNumber"
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
    </v-container>
</template>

<script>
    export default {
        name: "Home",
        data: () => ({
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
                    collection.bedroomsNumber = 1
                }
                this.collections.push(collection)
            },
            remove(collection) {
                this.collections.splice(this.collections.indexOf(collection), 1)
            },
            setBedrooms(collection) {
                if (collection.value === 'AP' && collection.bedroomsNumber > collection.bedCount) collection.bedroomsNumber = collection.bedCount
            }
        },
    }
</script>

<style scoped>

</style>