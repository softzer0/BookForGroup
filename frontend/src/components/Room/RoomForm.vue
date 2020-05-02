<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">{{ id ? "Edit room" : "Create new room" }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-combobox
                                v-model="room.roomType"
                                :items="types"
                                item-text="name"
                                return-object
                                prepend-icon="mdi-pencil-outline"
                                :rules="[rules.selected]"
                                @input="validate"
                                label="Room type"
                            ></v-combobox>
                            <v-text-field
                                v-if="room.roomType.value === 'AP'"
                                label="Number of rooms"
                                v-model="room.roomCount"
                                prepend-icon="mdi-bed"
                                type="number"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Number of beds"
                                v-model="room.bedsNumber"
                                prepend-icon="mdi-bed"
                                type="number"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Floor number"
                                v-model="room.floorNumber"
                                prepend-icon="mdi-format-list-bulleted"
                                type="number"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Price"
                                v-model="room.price"
                                prepend-icon="mdi-cash"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-row justify="space-around">
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.smokingAllowed" :label="`Smoking`" prepend-icon="mdi-smoking" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.peopleWithDisabilitiesAdapted" :label="`Disabilities adapted`" prepend-icon="mdi-wheelchair-accessibility" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.terrace" :label="`Terrace`" prepend-icon="mdi-flower" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.airConditioning" :label="`Air conditioning`" prepend-icon="mdi-air-conditioner" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.tv" :label="`TV`" prepend-icon="mdi-television-classic" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.soundIsolation" :label="`Sound isolation`" prepend-icon="mdi-volume-off" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.heating" :label="`Heating`" prepend-icon="mdi-radiator" hide-details @change="valid === null && validate()"/></v-col>
                                <v-col class="flex-grow-0"><v-checkbox v-model="room.kitchen" :label="`Kitchen`" prepend-icon="mdi-silverware" hide-details @change="valid === null && validate()"/></v-col>
                            </v-row>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="justify-center"><v-btn :disabled="!valid" @click="changeRoom()">Complete</v-btn></v-card-actions>
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
                selected: () => this.room.type.value || "Required.",
            }},
            ...mapGetters({
                room: 'room/getRoomData'
            })
        },
        data: () => ({
            valid: null,
            types: [
                { name: "Studio", value: 'ST' },
                { name: "Apartment", value: 'AP' },
            ],
        }),
        mounted() {
            if (this.id) {
                this.$store.dispatch('room/get_room', this.id)
            } else {
                this.$store.dispatch('room/clear_room')
            }
        },
        methods: {
              validate () {
                    this.valid = this.rules.selected(this.room.roomType) === true && this.rules.required(this.room.bedsNumber) === true &&
                                 this.rules.required(this.room.roomCount) === true && this.rules.required(this.room.floorNumber) === true &&
                                 this.rules.required(this.room.price) === true
              },
              async changeRoom() {
                    const data = { hotel: this.room.hotel, type: this.room.roomType.value, beds_number: this.room.bedsNumber,
                            floor_number: this.room.floorNumber, room_count: this.room.roomCount, price: this.room.price, smoking_allowed: this.room.smokingAllowed,
                            people_with_disabilities_adapted: this.room.peopleWithDisabilitiesAdapted, room_number: this.room.roomNumber,
                            room_size: this.room.roomSize, terrace: this.room.terrace, air_conditioning: this.room.airConditioning,
                            tv: this.room.tv, sound_isolation: this.room.soundIsolation, heating: this.room.heating, kitchen: this.room.kitchen }
                    if (this.id) {
                        await this.$store.dispatch('room/update_room', { id: this.id, data })
                    } else {
                        await this.$store.dispatch('room/create_room', data)
                    }
                    this.$router.push({ name: 'Hotel', params: { id: this.hotel.id } })
              }
          },
    }
</script>

<style scoped>

</style>