<template>
  <div>
    <Card>
      <Table :columns="col1" :data="guideInfoList">

      </Table>
      <Page :total="totalGuideInfo"></Page>
    </Card>
  </div>
</template>

<script>
    import {apiListGuideInfo} from "../../api/api";
    import moment from "moment";
    import rentVehicleOrderDetail from "../rentVehicle/rentVehicleOrderDetail";

    export default {
        name: "guideInfoList",
        data() {
            return {
                pageIndex: 1,
                pageSize: 10,
                totalGuideInfo: 0,
                guideInfoList: [],
                col1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '城市',
                        key: 'location'
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
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '注册时间',
                        render: (h, params) => {
                            return h('div', [
                                h('span', moment(params.row.register_time).format('YYYY-MM-DD HH:mm'))
                            ])
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
                apiListGuideInfo(params).then((response) => {
                    if (response.data.code === 0) {
                        this.guideInfoList = response.data.data.guideInfos
                        this.totalGuideInfo = response.data.data.totalGuideInfo
                    }
                })
            },
            showSex(sex) {
                if (sex === 'F') {
                    return '女'
                }
                if (sex === 'M') {
                    return '男'
                }
            },
            showStatus(status) {
                if (status === 'ACTIVE') {
                    return '正常'
                }
            },
            btDetail(row) {
                this.$router.push({
                    name: 'guideInfoDetail',
                    params: {
                        guideInfoId: row.guide_id
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
