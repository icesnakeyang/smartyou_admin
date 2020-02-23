<template>
  <div>
    <Card>
      <p slot="title">
        姓名：{{guideLog.guideData.name}}
      </p>
    </Card>
  </div>
</template>

<script>
  import {apiGetGuideLog} from "@/api/api";

  export default {
    name: "guideLogDetail",
    data(){
      return{
        guideLog:{}
      }
    },
    methods: {
      loadAllData() {
        let params = {
          guideLogId: this.$route.params.guideLogId
        }
        apiGetGuideLog(params).then((response) => {
          console.log(response)
          if(response.data.code===0){
            this.guideLog=response.data.data.guideLog
          }
        }).catch((error) => {
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
