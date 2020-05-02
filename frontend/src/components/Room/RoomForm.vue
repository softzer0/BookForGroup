<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">{{ id ? "Edit room" : "Create new room" }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Choice"
                                v-model="room.choice"
                                prepend-icon="mdi-pencil-outline"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Bed number"
                                v-model="room.bedNumber"
                                prepend-icon="mdi-bed"
                                :rules="[rules.required, rules.digitsOnly]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Floor number"
                                v-model="room.floorNumber"
                                prepend-icon="mdi-format-list-bulleted"
                                :rules="[rules.required, rules.digitsOnly]"
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
                            <v-text-field
                                label="Room number"
                                v-model="room.roomNumber"
                                prepend-icon="mdi-numeric"
                                :rules="[rules.required, rules.digitsOnly]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Room size"
                                v-model="room.roomSize"
                                prepend-icon="mdi-pencil-outline"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-row>
                                <v-col><v-checkbox v-model="room.smokingAllowed" :label="`Smoking`" prepend-icon="mdi-smoking"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.peopleWithDisabilitiesAdapted" :label="`Disabilities adapted`" prepend-icon="mdi-wheelchair-accessibility"></v-checkbox></v-col>
                            </v-row>
                            <v-row>
                                <v-col><v-checkbox v-model="room.terrace" :label="`Terrace`" prepend-icon="mdi-flower"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.airConditioning" :label="`Air conditioning`" prepend-icon="mdi-air-conditioner"></v-checkbox></v-col>
                            </v-row>
                            <v-row>
                                <v-col><v-checkbox v-model="room.tv" :label="`TV`" prepend-icon="mdi-television-classic"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.soundIsolation" :label="`Sound isolation`" prepend-icon="mdi-volume-off"></v-checkbox></v-col>
                            </v-row>
                            <v-row>
                                <v-col><v-checkbox v-model="room.heating" :label="`Heating`" prepend-icon="mdi-radiator"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.kitchen" :label="`Kitchen`" prepend-icon="mdi-silverware"></v-checkbox></v-col>
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
                digitsOnly: v => /^\d+$/.test(v) || 'Just digits.',
            }},
            ...mapGetters({
                room: 'room/getRoomData',
                hotel: 'hotel/getHotelData'
            })
        },
        data: () => ({
            valid: false,
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
                    this.valid = this.rules.required(this.room.choice) === true && this.rules.required(this.room.bedNumber) === true &&
                                 this.rules.required(this.room.floorNumber) === true && this.rules.required(this.room.price) === true &&
                                 this.rules.required(this.room.roomNumber) === true && this.rules.required(this.room.roomSize) === true &&
                                 this.rules.digitsOnly(this.room.bedNumber) === true && this.rules.digitsOnly(this.room.floorNumber) === true &&
                                 this.rules.digitsOnly(this.room.roomNumber) === true
              },
              async changeRoom() {
                    const data = { hotel: this.hotel, choice: this.room.choice, bed_number: this.room.bedNumber,
                            floor_number: this.room.floorNumber, price: this.room.price, smoking_allowed: this.room.smokingAllowed,
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