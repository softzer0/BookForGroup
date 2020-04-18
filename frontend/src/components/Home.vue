<template>
    <v-container>
        <div>
            <br>
            <ejs-multiselect :dataSource="localData" :fields="localFields" placeholder="Select a city"></ejs-multiselect>
        </div>
    </v-container>
</template>

<script>
    import Vue from 'vue'
    import{ MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns'
    Vue.use(MultiSelectPlugin)


    export default {
        name: "Home",
        data() {
            return {
                localData:[
                    { Id: '1', City: 'Beograd' },
                    { Id: '2', City: 'Nis' },
                    { Id: '3', City: 'Vranje' },
                    { Id: '4', City: 'Novi Sad' },
                    { Id: '5', City: 'Bor' },
                    { Id: '6', City: 'Krusevac' },
                    { Id: '7', City: 'Brus' },
                    { Id: '8', City: 'Kragujevac' },
                    { Id: '9', City: 'Kladovo' },
                    { Id: '10', City: 'Zajecar' },
                    { Id: '11', City: 'Kikinda' },
                    { Id: '12', City: 'Apatin' },
                    { Id: '13', City: 'Subotica' },
                    { Id: '14', City: 'Pristina' },
                    { Id: '15', City: 'Uzice' },
                ],
                localFields: {value: 'Id', text: 'City'}
            }
        }
    }
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>