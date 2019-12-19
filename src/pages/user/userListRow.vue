<template>
  <div>
    <div>{{formatTime}}</div>
  </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "userListRow",
        props: {
            createTime: ''
        },
        computed: {
            formatTime() {
                if (this.createTime) {
                    // return this.moment(this.createTime).format('YYYY-MM-DD')
                    return moment(this.createTime).format('YYYY-MM-DD')
                }
                return ''
            }
        }
    }
</script>

<style scoped>

</style>
