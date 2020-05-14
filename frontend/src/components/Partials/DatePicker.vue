<template>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="data"
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
        <v-date-picker v-model="data" @change="validateAndEmit" range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(data)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
    export default {
        name: "DatePicker",
        props: {
            date: Array
        },
        computed: {
            rules() {return {
                requiredPeriod: value => value.indexOf('~') > 1 || "Invalid date range!"
            }},
            dateRangeText () {
                return this.data.join(' ~ ')
            }
        },
        data() { return {
            modal: false,
            data: this.date || []
        }},
        methods: {
            validateAndEmit() {
                this.$emit('update-date', this.rules.requiredPeriod(this.dateRangeText) === true ? this.data : null)
            }
        }
    }
</script>

<style scoped>

</style>