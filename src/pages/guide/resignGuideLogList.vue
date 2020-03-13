<template>
  <div>
    <Card>
      <Table :columns="col1" :data="resignLogs"></Table>
      <Page :total="totalResignLog" @on-change="pageChange"></Page>
    </Card>
  </div>
</template>

<script>
    import {apiListResignLog} from "../../api/api";
    import moment from "moment";

    export default {
        name: "resignGuideLogList",
        data() {
            return {
                pageIndex: 1,
                pageSize: 10,
                totalResignLog: 0,
                resignLogs: [],
                col1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        render: (h, params) => {
                            return h('div', this.showSex(params.row.sex))
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
                        title: '申请时间',
                        render: (h, params) => {
                            return h('div', moment(params.row.create_time).format('YYYY-MM-DD HH:mm'))
                        }
                    },
                    {
                        title: '状态',
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
                apiListResignLog(params).then((response) => {
                    if (response.data.code === 0) {
                        this.resignLogs = response.data.data.resignLogs
                        this.totalResignLog = response.data.data.totalResignLogs
                    } else {
                        this.$Message.error(response.data.code)
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            showSex(sex) {
                if (sex === 'F') {
                    return '女'
                } else {
                    if (sex === 'M') {
                        return '男'
                    }
                }
            },
            showStatus(status) {
                if (status === 'PENDING') {
                    return '等待审核'
                }
            },
            btDetail(row) {
                this.$router.push({
                    name: 'resignLogDetail',
                    params: {
                        guideLogId: row.guide_log_id
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
