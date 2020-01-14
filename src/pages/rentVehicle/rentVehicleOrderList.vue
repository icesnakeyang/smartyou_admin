<template>
  <div>
    <Card>
      <p slot="title">搜索条件</p>
    </Card>
    <Card style="margin-top: 20px">
      <p slot="title">包车订单</p>
      <Table border :columns="col1" :data="orders">
      </Table>
    </Card>
  </div>
</template>

<script>
    import {apiListRentVehicle} from "../../api/api";
    import RentVehicleOrderListRow from './rentVehicleOrderListRow'
    import moment from "moment";

    export default {
        name: "rentVehicleOrderList",
        components: {
            RentVehicleOrderListRow
        },
        data() {
            return {
                orders: [],
                col1: [
                    {
                        title: '预订时间',
                        key: 'createTime',
                        render:(h, params)=>{
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
                        title: '说明',
                        key: 'remark'
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
                        title: '管理员处理时间',
                        key: 'createTime',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', moment(params.row.createTime).format('YYYY-MM-DD HH:mm'))
                            ])
                        }
                    }
                ]
            }
        },
        methods: {
            loadAllData() {
                let params = {
                    pageIndex: 1,
                    pageSize: 100
                }
                apiListRentVehicle(params).then((response) => {
                    console.log(response.data.data.rentVehicles)
                    if (response.data.code === 0) {
                        console.log(1)
                        this.orders = response.data.data.rentVehicles
                        console.log(this.orders)
                    } else {
                        throw new Error('读取数据错误')
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
