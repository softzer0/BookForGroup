<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
    >
        <v-card>
            <v-card-title class="headline">{{ dialogParams.title }}</v-card-title>

            <v-card-text>
                {{ dialogParams.text }}
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    text
                    @click="close()"
                >
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from "vuex"

    export default {
        name: "MessageBox",
        computed: {
            ...mapGetters({
                dialog: 'dialogs/getDialogState',
                dialogParams: 'dialogs/getDialogParams'
            })
        },
        methods: {
            close() {
                this.$store.dispatch('dialogs/close_dialog')
            }
        }
    }
</script>

<style scoped>

</style>