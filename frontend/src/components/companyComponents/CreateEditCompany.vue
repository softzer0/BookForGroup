<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card grey color="grey lighten-5" style="border-radius: 20px;">
                    <v-card-title class="justify-center">{{ exists ? 'Edit company' : 'Create company' }}</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                label="Name"
                                v-model="company.name"
                                prepend-icon="mdi-pencil-outline"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="Phone"
                                v-model="company.phone"
                                prepend-icon="mdi-phone-outline"
                                :rules="[rules.required, rules.digitsWithPlus]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-text-field
                                label="PIB"
                                v-model="company.pib"
                                prepend-icon="mdi-pencil-outline"
                                :rules="[rules.required, rules.digitsOnly]"
                                @input="validate"
                                validate-on-blur
                            />
                            <v-combobox
                                v-model="company.city"
                                :items="cities"
                                prepend-icon="mdi-city"
                                :rules="[rules.selected]"
                                label="Select a city"
                            ></v-combobox>
                            <v-text-field
                                label="Address"
                                v-model="company.address"
                                prepend-icon="mdi-map-marker-outline"
                                :rules="[rules.required]"
                                @input="validate"
                                validate-on-blur
                            />
                        </v-card-text>
                    </v-form>
                    <v-card-actions class="justify-center"><v-btn :disabled="!valid" @click="changeCompany()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "CreateCompany",
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                selected: () => !!this.company.city || "Required.",
                digitsWithPlus: v => /^\+?\d+$/.test(v) || 'Phone contains just digits.',
                digitsOnly: v => /^\d+$/.test(v) || 'PIB contains just digits.',
            }},
            ...mapGetters({
                exists: 'company/doesExist',
                company: 'company/getCompanyData'
            })
        },
        data: () => ({
            valid: false,
            cities: [
              'Beograd',
              'Vranje',
              'Surdulica',
              'Nis',
              'Podgorica',
              'Bar',
              'Kotor',
              'Tivat',
            ],
          }),
        mounted() {
            this.$store.dispatch('company/getusercompany')
        },
        methods: {
              validate () {
                    this.valid = this.rules.required(this.company.name) === true && this.rules.required(this.company.phone) === true &&
                                 this.rules.required(this.company.pib) === true && this.rules.required(this.company.address) &&
                                 this.rules.selected() === true && this.rules.digitsWithPlus(this.company.phone) === true &&
                                 this.rules.digitsOnly(this.company.pib)
              },
              async changeCompany() {
                    const data = { name: this.company.name, phone: this.company.phone,
                           pib: this.company.pib, city: this.company.city, address: this.company.address }
                    await this.$store.dispatch('company/setusercompany', data)
                    this.$router.push({ name: 'User' })
              }
          },
    }
</script>

<style scoped>

</style>