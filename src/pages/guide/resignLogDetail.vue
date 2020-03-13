<template>
  <div>
    <GuideDataComp :guideData="guideLog.guideData" />
    <Card style="margin-top: 20px">
      <p slot="title">注销申请</p>
      <p>申请时间：{{resignTime}}</p>
      <p>申请理由：</p>
      <div style="background: #eff5f6; padding: 10px" v-html="guideLog.remark"></div>
    </Card>
  </div>
</template>

<script>
    import {apiGetGuideLog} from "../../api/api";
    import GuideDataComp from '../common/components/guideDataComp'
    import moment from "moment";

    export default {
        name: "resignLogDetail",
        components:{
            GuideDataComp
        },
        data(){
            return{
                guideLog:{
                    guideData:{}
                }
            }
        },
        computed:{
            resignTime(){
                if(this.guideLog.createTime){
                    return moment(this.guideLog.createTime).format('YYYY-MM-DD HH:mm')
                }
            }
        },
        methods:{
            loadAllData(){
                let params={
                    guideLogId:this.$route.params.guideLogId
                }
                apiGetGuideLog(params).then((response)=>{
                    if(response.data.code===0){
                        this.guideLog=response.data.data.guideLog
                    }else{
                        this.$Message.error(response.data.code)
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
