<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        :retain-focus="false"
    >
        <v-card>
            <v-card-title class="headline">{{ dialogParams.title }}</v-card-title>

            <v-card-text>
                {{ dialogParams.text }}
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click.native="close()">
                    Close
                </v-btn>
                <v-btn v-if="deleteComponent" text color="red" @click.native="confirm()">Delete</v-btn>
                <v-btn v-else text color="green" @click.native="confirm()">Confirm</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Confirm",
        computed: {
            ...mapGetters({
                dialog: 'dialogs/getDialogState',
                dialogParams: 'dialogs/getDialogParams'
            })
        },
        methods: {
            close() {
                this.$store.dispatch('dialogs/set_dialog_response', false)
            },
            confirm() {
                this.$store.dispatch('dialogs/set_dialog_response', true)
            },
            deleteComponent() {
                return this.dialogParams.text.localeCompare('Delete Item') === 0
            }
        }
    }
</script>

<style scoped>

</style>