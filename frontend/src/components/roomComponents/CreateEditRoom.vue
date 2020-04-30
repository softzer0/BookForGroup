<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>{{ pk ? 'Edit hotel' : 'Create new hotel' }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Choice"
                                v-model="room.choice"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Bed number"
                                v-model="room.bed_numbers"
                                :rules="[rules.required, rules.digitsOnly]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Floor number"
                                v-model="room.floor_number"
                                :rules="[rules.required, rules.digitsOnly]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Price"
                                v-model="room.price"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Room number"
                                v-model="room.room_number"
                                :rules="[rules.required, rules.digitsOnly]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Room size"
                                v-model="room.room_size"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-row>
                                <v-col><v-checkbox v-model="room.smoking_allowed" :label="`Smoking`"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.people_with_disabilities_adapted" :label="`Disabilities adapted`"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.terrace" :label="`Terrace`"></v-checkbox></v-col>
                            </v-row>
                            <v-row>
                                <v-col><v-checkbox v-model="room.air_conditioning" :label="`Air conditioning`"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.tv" :label="`TV`"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.sound_isolation" :label="`Sound isolation`"></v-checkbox></v-col>
                            </v-row>
                            <v-row>
                                <v-col><v-checkbox v-model="room.heating" :label="`Heating`"></v-checkbox></v-col>
                                <v-col><v-checkbox v-model="room.kitchen" :label="`Kitchen`"></v-checkbox></v-col>
                            </v-row>
                        </v-card-text>
                    </v-form>
                    <v-card-actions><v-btn :disabled="!valid" @click="changeRoom()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "CreateEditRoom",
        props: ['pk'],
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                digitsOnly: v => /^\d+$/.test(v) || 'Just digits.',
            }},
            room() { return this.$store.getters['room/getRoomData']() },
            hotel() { return this.$store.getters['hotel/getHotelData']() }
        },
        data: () => ({
            valid: false,
          }),
        mounted() {
            if (this.pk) {
                this.$store.dispatch('room/getroom', this.pk)
            } else {
                this.$store.dispatch('room/clearroom')
            }
        },
        methods: {
              validate () {
                    this.valid = this.rules.required(this.room.choice) === true && this.rules.required(this.room.bed_numbers) === true &&
                                 this.rules.required(this.room.floor_number) === true && this.rules.required(this.room.price) === true &&
                                 this.rules.required(this.room.room_number) === true && this.rules.required(this.room.room_size) === true &&
                                 this.rules.digitsOnly(this.room.bed_numbers) === true && this.rules.digitsOnly(this.room.floor_number) === true &&
                                 this.rules.digitsOnly(this.room.room_number) === true
              },
              async changeRoom() {
                    const data = { hotel: this.hotel.pk, choice: this.room.choice, bed_numbers: this.room.bed_numbers,
                            floor_number: this.room.floor_number, price: this.room.price, smoking_allowed: this.room.smoking_allowed,
                            people_with_disabilities_adapted: this.room.people_with_disabilities_adapted, room_number: this.room.room_number,
                            room_size: this.room.room_size, terrace: this.room.terrace, air_conditioning: this.room.air_conditioning,
                            tv: this.room.tv, sound_isolation: this.room.sound_isolation, heating: this.room.heating, kitchen: this.room.kitchen }
                    if (this.pk) {
                        await this.$store.dispatch('room/updateroom', { pk: this.pk, data })
                    } else {
                        await this.$store.dispatch('room/createroom', data)
                    }
                    this.$router.push({ name: 'Hotel', params: { pk: this.hotel.pk } })
              }
          },
    }
</script>

<style scoped>

</style>