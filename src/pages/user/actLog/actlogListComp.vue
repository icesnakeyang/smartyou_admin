<template>
  <div>
    <Card style="margin-top: 20px">
      <p slot="title">用户行为日志</p>
      <Table :columns="col1" :data="userActLogs"></Table>
    </Card>
  </div>
</template>

<script>
  import {apiListUserActLog} from "@/api/api";
  import moment from "moment";

  export default {
    name: "actlogListComp",
    data() {
      return {
        userActLogs: [],
        col1: [
          {
            title: '时间',
            render: (h, params) => {
              return h('div', [
                h('span', moment(params.row.createTime).format('YYYY-MM-DD HH:mm'))
              ])
            }
          },
          {
            title:'行为',
            key:'actType'
          },
          {
            title:'说明',
            key:'memo'
          }
        ]
      }
    },
    props: {
      userId: ''
    },
    methods: {
      loadAllData() {
        let params = {
          userId: this.userId
        }
        apiListUserActLog(params).then((response) => {
          if (response.data.code === 0) {
            this.userActLogs = response.data.data.userActLogs
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
