<template>
  <div>
    <Card>
      <Table :columns="col1" :data="lineLogList"></Table>
      <Page style="margin-top: 20px" :total="totalLineLog" @on-change="pageChange"></Page>
    </Card>
  </div>
</template>

<script>
  import {apiListLineLog} from "../../../api/api";

  export default {
    name: "lineLogApplyList",
    data() {
      return {
        pageIndex: 1,
        pageSize: 20,
        lineLogList: [],
        totalLineLog: 0,
        col1: [
          {
            title:'标题',
            key:'title'
          },
          {
            title:'地点',
            key:'location'
          },
          {
            title:'简介',
            key:'brief'
          },
          {
            title:'状态',
            render: (h, params) => {
              return h('div', this.showStatus(params.row.status))
            }
          },
          {
            title: '详情',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.btDetail(params.row)
                    }
                  }
                }, '详情')
              ])
            }
          }
        ]
      }
    },
    methods: {
      loadAllData() {
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        apiListLineLog(params).then((response) => {
          if (response.data.code === 0) {
            this.lineLogList = response.data.data.lineLogs
            this.totalLineLog = response.data.data.totalLineLog
          } else {
            this.$Message.error(response.data.code)
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },

      showStatus(status){
        if(status==='PENDING'){
          return '等待审核'
        }
      },

      btDetail(row){
        this.$router.push({
          name:'lineLogApplyDetail',
          params:{
            lineLogId:row.line_log_id
          }
        })
      },

      pageChange(e){
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
