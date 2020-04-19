<template>
    <v-container>
        <v-autocomplete
            v-model="places"
            :items="cities"
            :search-input.sync="searchInput"
            @change="searchInput=''"
            filled
            chips
            flat
            color="blue-grey lighten-2"
            label="Select"
            item-text="name"
            item-value="name"
            multiple
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
    </v-container>
</template>

<script>
    export default {
        name: "Home",
        data () { return {
          autoUpdate: true,
          places: [],
          searchInput: '',
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
        }},
          methods: {
            remove (item) {
              const index = this.places.indexOf(item.name)
              if (index >= 0) this.places.splice(index, 1)
            },
          },
    }
</script>

<style scoped>

</style>