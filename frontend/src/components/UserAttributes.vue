<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6">
                <v-card>
                    <v-card-title>Complete the profile</v-card-title>
                    <v-form>
                        <v-card-text>
                            <v-autocomplete
                                v-model="places"
                                :items="cities"
                                :search-input.sync="searchInput"
                                :rules="[rules.required, rules.selected]"
                                @input="validate"
                                @change="searchInput=''"
                                validate-on-blur
                                filled
                                chips
                                flat
                                color="blue-grey lighten-2"
                                background-color="white"
                                label="Select"
                                item-text="name"
                                item-value="name"
                              >
                                <template v-slot:selection="data">
                                  <v-chip
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    close
                                    @click="data.select"
                                    @click:close="remove(data.item)"
                                  >
                                    {{ data.item.name }}
                                  </v-chip>
                                </template>
                                <template v-slot:item="data">
                                  <template v-if="typeof data.item !== 'object'">
                                    <v-list-item-content v-text="data.item"></v-list-item-content>
                                  </template>
                                  <template v-else>
                                    <v-list-item-content>
                                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                                    </v-list-item-content>
                                  </template>
                                </template>
                              </v-autocomplete>
                            <v-text-field
                            label="Address"
                            v-model="address"
                            :rules="[rules.required]"
                            @input="validate"
                            validate-on-blur
                        />
                        </v-card-text>
                    </v-form>
                    <v-card-actions><v-btn :disabled="!valid" @click="addProperties()">Complete</v-btn></v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "UserAttributes",
        computed: {
            rules() { return {
                required: value => !!value || "Required.",
                selected: () => this.places != '' || "Required.",
            }}
        },
        data: () => ({
            autoUpdate: true,
            places: '',
            searchInput: '',
            address: '',
            valid: false,
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
          }),
          methods: {
            remove (item) {
              const index = this.places.indexOf(item.name)
              if (index >= 0) this.places.splice(index, 1)
            },
              validate () {
                this.valid = this.rules.required(this.address) === true && this.rules.required(this.places) === true &&
                        this.rules.selected(this.places) === true
              },
              addProperties() {

              }
          },
    }
</script>

<style scoped>

</style>