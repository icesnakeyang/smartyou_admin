<template>

</template>

<script>
    import {apiListLineLog} from "../../../api/api";

    export default {
        name: "lineLogApplyList",
        data() {
            return {
                pageIndex: 1,
                pageSize: 20
            }
        },
        methods: {
            loadAllData() {
                let params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
                apiListLineLog(params).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
