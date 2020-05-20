<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5">
                    <v-card-title class="justify-center">{{ id ? "Edit arrangement" : "Create new arrangement" }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Quantity"
                                v-model="arrangement.quantity"
                                prepend-icon="mdi-numeric-1-box-multiple-outline"
                                type="number"
                                :min="1"
                            />
                            <DatePicker :date="id ? arrangement.reservedPeriod : ['', '']" @update-date="updateDate"/>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="justify-center"><v-btn :disabled="!valid" @click="changeArrangement()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    import DatePicker from "../partials/DatePicker"

    export default {
        name: 'CreateEditArrangement',
        props: ['id'],
        components: {
            DatePicker,
        },
        computed: {
            rules() { return {
                required: value => !!value || "Required."
            }},
            ...mapGetters({
                arrangement: 'arrangement/getArrangementData',
                arrangements: 'arrangement/getArrangementList',
                accommodation: 'accommodation/getAccommodationData'
            })
        },
        data() { return {
            valid: false,
            modal: false,
            data: this.date
        }},
        watchers: {
            arrangement: {
                deep: true,
                handler(newArrangement) {
                    this.$store.dispatch('arrangement/model_changed', newArrangement)
                }
            }
        },
        mounted() {
            if (this.id) {
                this.$store.dispatch('arrangement/get_arrangement', this.id)
            } else if (this.$route.query['accommodation-id']) {
                this.$store.dispatch('arrangement/reset_arrangement', this.$route.query['accommodation-id'])
            } else {
                this.$router.push({ name: 'Accommodation' })
            }
        },
        methods: {
            validate () {
                this.valid = this.arrangement.reservedPeriod
            },
            async changeArrangement() {
                try {
                    if (this.id) {
                        await this.$store.dispatch('arrangement/update_arrangement')
                        this.$router.push({name: 'Arrangement', params: {id: this.arrangement.id}})
                    } else {
                        await this.$store.dispatch('arrangement/create_arrangement')
                        this.$router.push({name: 'Accommodation', params: {id: this.accommodation.id}})
                    }

                } catch (response) {
                    if (response.non_field_errors) {
                        this.$store.dispatch('dialogs/show_error', response.non_field_errors.join(' '))
                    }
                }
            },
            updateDate(value) {
                this.arrangement.reservedPeriod = value || ['', '']
                this.validate()
            }
          },
    }
</script>

<style scoped>

</style>