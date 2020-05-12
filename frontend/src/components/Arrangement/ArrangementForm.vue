<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">{{ id ? "Edit arrangement" : "Create new arrangement" }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Quantity"
                                v-model="arrangement.quantity"
                                prepend-icon="mdi-numeric-1-box-multiple-outline"
                                type="number"
                                :min="1"
                                :max="allowedQuantity()"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="arrangement.reservedPeriod"
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
                                <v-date-picker v-model="arrangement.reservedPeriod" range @change="validate">
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.dialog.save(arrangement.reservedPeriod)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="justify-center"><v-btn @click="changeArrangement()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'CreateEditArrangement',
        props: ['id'],
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                requiredPeriod: value => value.indexOf('~') > 1 || "Invalid date range!"
            }},
            ...mapGetters({
                arrangement: 'arrangement/getArrangementData',
                arrangements: 'arrangement/getArrangementList',
                accommodation: 'accommodation/getAccommodationData'
            }),
            dateRangeText () {
                return this.arrangement.reservedPeriod.join(' ~ ')
            }
        },
        data: () => ({
            valid: null,
            modal: false
        }),
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
                this.valid = this.rules.requiredPeriod(this.dateRangeText) === true
            },
            async changeArrangement() {
                if (this.id) {
                    await this.$store.dispatch('arrangement/update_arrangement')
                } else {
                    await this.$store.dispatch('arrangement/create_arrangement')
                }
                this.$router.push({ name: 'Accommodation', params: { id: this.arrangement.accommodationId } })
            },
            allowedQuantity() {
                let sumQuantity = this.accommodation.quantity
                this.arrangements.forEach(function(item){ sumQuantity -= item.quantity })
                return sumQuantity
            }
          },
    }
</script>

<style scoped>

</style>