<template>
    <div>
      <Card>
        <p slot="title">订单ID:{{order.ordernumber}}</p>
        <p>预订日期：{{order.createtime}}</p>
        <p>出发站：{{order.fromstation}}</p>
        <p>终点站：{{order.tostation}}</p>
        <p>车次：{{order.trainno}}</p>
        <p>出发时间：{{order.departtime}}</p>
        <p>到达时间：{{order.arrivetime}}</p>
        <p>是否无座：{{order.isnoseat}}</p>
        <p>座位信息：{{order.chooseseatinfo}}</p>
        <p>联系人：{{order.contactname}}</p>
        <p>联系人电话：{{order.contactmobile}}</p>
        <p>订单状态：{{order.orderstatusmsg}}</p>
      </Card>
      <Card>
        <p slot="title">乘客信息</p>
        <trainOrderDetailPassengerRow v-for="(item, index) in passengerList"
                                      :item="item"
                                      :key="index"
        >

        </trainOrderDetailPassengerRow>
      </Card>
    </div>
</template>

<script>
    import {apiGetTrainOrderDetail} from "../../api/api";
    import trainOrderDetailPassengerRow from "./trainOrderDetailPassengerRow";

    export default {
        name: "trainOrderDetail",
        components:{
            trainOrderDetailPassengerRow
        },
        data(){
            return{
                order:{},
                passengerList:[]
            }
        },
        methods:{
            loadAllData(){
                console.log(this.$route.params.orderId)
                let params={
                    orderId:this.$route.params.orderId
                }
                apiGetTrainOrderDetail(params).then((response)=>{
                    console.log(response)
                    if(response.data.code===0){
                        this.order=response.data.data.order
                        this.passengerList=this.order.passengers
                        console.log(this.order)
                        console.log(this.passengerList)
                    }else{
                        this.$Message.error('读取数据库失败')
                    }
                }).catch((error)=>{
                    this.$Message.error(error)
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
