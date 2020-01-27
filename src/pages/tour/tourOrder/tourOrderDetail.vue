<template>

</template>

<script>
    import {apiGetTourOrder} from "../../../api/api";

    export default {
        name: "tourOrderDetail",
        methods: {
            loadAllData() {
                let params = {
                    tourOrderId: this.$route.params.tourOrderId
                }
                apiGetTourOrder(params).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    this.$Message.error(error)
                })
            }
        },
        mounted() {
            console.log(this.$route.params.tourOrderId)
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
