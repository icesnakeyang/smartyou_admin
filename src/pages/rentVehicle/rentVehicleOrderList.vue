<template>
  <div>
    <Card>
      <p slot="title">搜索条件</p>
    </Card>
    <Card style="margin-top: 20px">
      <p slot="title">包车订单</p>
      <Table border :columns="col1" :data="orders">
      </Table>
      <div style="margin-top: 10px">
        <Page :total="total" :current="pageIndex" show-total
              :page-size="pageSize" @on-change="onTablePage"/>
      </div>
    </Card>
  </div>
</template>

<script>
    import {apiListRentVehicle} from "../../api/api";
    import moment from "moment";

    export default {
        name: "rentVehicleOrderList",
        data() {
            return {
                orders: [],
                col1: [
                    {
                        title: '预订时间',
                        key: 'createTime',
                        render: (h, params) => {
                            return h('div', [
                                h('span', moment(params.row.createTime).format('YYYY-MM-DD HH:mm'))
                            ])
                        }
                    },
                    {
                        title: '出发地',
                        key: 'fromStation'
                    },
                    {
                        title: '目的地',
                        key: 'toStation'
                    },
                    {
                        title: '人数',
                        key: 'passengerNum'
                    },
                    {
                        title: '联系人',
                        key: 'contactName'
                    },
                    {
                        title: '联系电话',
                        key: 'contactPhone'
                    },
                    {
                        title: '订单状态',
                        key: 'statusMsg'
                    },
                    {
                        title: '操作',
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
                total: 0,
                pageIndex: 1,
                pageSize:20
            }
        },
        methods: {
            loadAllData() {
                let params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
                apiListRentVehicle(params).then((response) => {
                    if (response.data.code === 0) {
                        this.orders = response.data.data.rentVehicles
                        this.total = response.data.data.total
                    } else {
                        throw new Error('读取数据错误')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            btDetail(row) {
                this.$router.push({
                    name: 'rentVehicleOrderDetail',
                    params: {
                        rentVehicleId: row.rentVehicleId
                    }
                })
            },
            onTablePage(page) {
                this.pageIndex = page
                this.loadAllData()
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
