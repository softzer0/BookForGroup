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
                                @input="validate"
                                label="Room type"
                            ></v-combobox>
                            <v-text-field
                                v-if="room.roomType.value === 'AP'"
                                label="Number of rooms"
                                v-model="room.roomCount"
                                prepend-icon="mdi-bed"
                                type="number"
                                :min="1"
                                :rules="[rules.roomCountRequired]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Number of beds"
                                v-model="room.bedsNumber"
                                prepend-icon="mdi-bed"
                                type="number"
                                :min="1"
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
                                label="Price per adult"
                                v-model="room.pricePerAdult"
                                prepend-icon="mdi-cash"
                                :min="1"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Price per child"
                                v-model="room.pricePerChild"
                                prepend-icon="mdi-cash"
                                :min="1"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="room.reservedPeriod"
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
                                <v-date-picker v-model="room.reservedPeriod" range>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.dialog.save(room.reservedPeriod)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
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
                roomCountRequired: value => this.room.roomType.value === 'ST' || !!value || "Required.",
                requiredPeriod: value => value.indexOf('~') > 1 || "Invalid date range!."
            }},
            ...mapGetters({
                room: 'room/getRoomData'
            }),
            dateRangeText () {
                return this.room.reservedPeriod.join(' ~ ')
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
            room: {
                deep: true,
                handler(newRoom) {
                    this.$store.dispatch('room/model_changed', newRoom)
                }
            }
        },
        mounted() {
            if (this.id) {
                this.$store.dispatch('room/get_room', this.id)
            } else {
                this.$store.dispatch('room/reset_room', this.$route.query.hotelId)
            }
        },
        methods: {
              validate () {
                    this.valid = this.rules.required(this.room.bedsNumber) === true && this.rules.required(this.room.pricePerAdult) === true &&
                                 this.rules.required(this.room.pricePerChild) === true && this.rules.required(this.room.floorNumber) === true &&
                                 this.rules.roomCountRequired(this.room.roomCount) === true && this.rules.requiredPeriod(this.dateRangeText) === true
              },
              async changeRoom() {
                    if (this.id) {
                        await this.$store.dispatch('room/update_room')
                    } else {
                        await this.$store.dispatch('room/create_room')
                    }
                    this.$router.push({ name: 'Hotel', params: { id: this.room.hotelId } })
              }
          },
    }
</script>

<style scoped>

</style>