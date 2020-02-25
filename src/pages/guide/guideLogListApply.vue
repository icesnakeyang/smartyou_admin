<template>
  <div>
    <Card>

    </Card>

    <Card style="margin-top: 10px">
      <p slot="title">导游列表</p>
      <Table border :columns="col1" :data="guideLogList">
      </Table>
      <div style="margin-top: 10px">
        <Page :total="total" :current="pageIndex" show-total
              :page-size="pageSize" @on-change="onTablePage"/>
      </div>
    </Card>
  </div>
</template>

<script>
  import GuideListRow from "./guideListRow";
  import moment from "moment";
  import {apiListGuideApply} from "@/api/api";

  export default {
    name: "guideLogListApply",
    components: {
      GuideListRow
    },
    data() {
      return {
        col1: [
          {
            title: '注册时间',
            render: (h, params) => {
              return h('div', [
                h('span', moment(params.row.create_time).format('YYYY-MM-DD HH:mm'))
              ])
            }
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex',
            render: (h, params) => {
              return h('div', [
                h('span', this.showSex(params.row.sex))
              ])
            }
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '城市',
            key: 'location'
          },
          {
            title: '联系电话',
            key: 'phone'
          },
          {
            title: '订单状态',
            key: 'status',
            render: (h, params) => {
              return h('div', [
                h('span', this.showStatus(params.row.status))
              ])
            }
          },
          {
            title: '详情',
            key: 'action',
            align: 'center',
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
        ],
        guideLogList: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0
      }
    },
    methods: {
      loadAllData() {
        apiListGuideApply({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then((response) => {
          if (response.data.code === 0) {
            this.guideLogList = response.data.data.guideLogs
            this.total = response.data.data.total
            console.log(this.guideLogList)
            console.log(this.total)
          } else {
            throw new Error(error)
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },
      showStatus(status) {
        if(status==='PRIVATE'){
          return '未提交'
        }
        if (status === 'PENDING') {
          return '等待审核'
        }
        if (status === 'BANNED') {
          return '已禁止'
        }
        if (status === 'ACTIVE') {
          return '正常'
        }
      },
      showSex(sex) {
        if (sex === 'F') {
          return '女'
        } else {
          if (sex === 'M') {
            return '男'
          }
        }
        return ''
      },
      onTablePage(page) {
        this.pageIndex = page
        this.loadAllData()
      },
      btDetail(row) {
        console.log(row)
        this.$router.push({
          name: 'guideLogDetail',
          params: {
            guideLogId: row.guide_log_id
          }
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
