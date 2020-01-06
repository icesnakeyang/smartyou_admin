<template>
  <Card>
    <p slot="title">{{item.passengername}}</p>
    <p>身份证：{{item.idnumber}}</p>
    <p>状态：{{item.statusmsg}}</p>
    <p>座位类型：{{item.seattypename}}</p>
    <p>车厢：{{item.coach}}</p>
    <p>座位号：{{item.seatno}}</p>
  </Card>
</template>

<script>
    export default {
        name: "trainOrderDetailPassengerRow",
        props: {
            item: {}
        },
        mounted() {
            console.log(this.item)
        }
    }
</script>

<style scoped>

</style>
