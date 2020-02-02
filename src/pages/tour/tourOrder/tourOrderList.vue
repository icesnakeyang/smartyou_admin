<template>
  <div>
    <Card>
      <p slot="title">查询条件</p>
      <Form :label-width="100">
        <FormItem label="线路名称">
          <Input type="text"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">查询</Button>
        </FormItem>
      </Form>
    </Card>
    <Card style="margin-top: 20px">
      <p slot="title">旅游线路</p>
      <Table border :columns="colListTourOrders" :data="tourOrders">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.title }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="btDetail(row)">详情</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
    import {apiListTourOrder} from "../../../api/api";
    import moment from "moment";

    export default {
        name: "tourOrderList",
        data() {
            return {
                tourOrders: [],
                colListTourOrders: [
                    {
                        title: '订单时间',
                        key: 'order_time',
                        render: (h, params) => {
                            return h('div', [
                                h('span', moment(params.row.order_time).format('YYYY-MM-DD HH:mm'))
                            ])
                        }
                    },
                    {
                        title: '线路名称',
                        key: 'title'
                    },
                    {
                        title: '用户',
                        key: 'nick_name'
                    },
                    {
                        title: '人数',
                        key: 'persons'
                    },
                    {
                        title: '出发时间',
                        key: 'depart_time',
                        render: (h, params) => {
                            return h('div', [
                                h('span', moment(params.row.depart_time).format('YYYY-MM-DD HH:mm'))
                            ])
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div',[
                                h('span', this.showStatus(params.row.status))
                            ])
                        }
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
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
                apiListTourOrder(params).then((response) => {
                    if (response.data.code === 0) {
                        this.tourOrders = response.data.data.tourOrders
                    } else {
                        throw new Error('读取数据库错误')
                    }
                }).catch((error) => {
                })
            },
            btDetail(row) {
                this.$router.push({
                    name:'tourOrderDetail',
                    params:{
                        tourOrderId:row.tour_order_id
                    }
                })
            },
            showStatus(status){
                if(status==='PAID'){
                    return '已支付'
                }else{
                    return '未处理'
                }
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
