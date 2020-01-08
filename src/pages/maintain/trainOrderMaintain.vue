<template>
<div>
  <div>接口订单：{{totalTrainOrderApi}}</div>
  <div>本地订单：{{totalTrainOrderLocal}}</div>
  <Button type="error" @click="btSyncTrainOrder">一键同步</Button>

  <Modal
    v-model="modal1"
    title="同步火车票接口数据？"
    @on-ok="ok"
    @on-cancel="cancel">
    <p>本操作会把火车票接口的所有订单数据同步到本地数据，以保持数据一致性。</p>
    <p>本操作可以解决火车票信息和状态不一致造成的问题，但仍然可能有一定风险。</p>
    <p>若同步后某些用户不能查看火车票了，请及时与开发者联系。</p>
  </Modal>
</div>
</template>

<script>
    import {apiStatisticTrain} from "../../api/api";

    export default {
        name: "trainOrderMaintain",
        data(){
            return{
                totalTrainOrderLocal:0,
                totalTrainOrderApi:0,
                modal1: false
            }
        },
        methods:{
            loadAllData(){
                apiStatisticTrain({}).then((response)=>{
                    console.log(response)
                    if(response.data.code===0){
                        this.totalTrainOrderApi=response.data.data.totalTrainOrderApi
                        this.totalTrainOrderLocal=response.data.data.totalTrainOrderLocal
                    }else {
                        throw new Error('读取统计数据错误')
                    }
                }).catch((error)=>{
                    this.$Message.error(error)
                })
            },
            btSyncTrainOrder(){
                this.modal1=true
            },
            ok () {
                //同步火车票接口订单

            },
            cancel () {
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
