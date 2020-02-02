<template>
  <div>
    <Form class="gogo-content-header-form">
      <FormItem>
        <Input type="text" v-model="searchKey" placeholder="请输入搜索关键字">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="btSearch">搜索</Button>
      </FormItem>
    </Form>
    <Divider></Divider>
    <Table :columns="columns" :data="trainOrders">
      <template slot-scope="{row,index}" slot="action">
        <Button type="primary" size="small" @click="show(row)">详情</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
    <template>
      <Page :total="totalOrders" :page-size="pageSize" @on-change="onPage"/>
    </template>
  </div>
</template>

<script>
    import {apiListAllApiTrainOrder} from "../../api/api";

    export default {
        name: "trainBookingList",
        data() {
            return {
                searchKey: '',
                columns: [
                    {
                        title: '订单号',
                        key: 'ordernumber'
                    },
                    {
                        title:'订单价格',
                        key:'payprice',
                        sortable:true
                    },
                    {
                        title: '日期',
                        key: 'fromdate',
                        sortable: true
                    },
                    {
                        title: '始发站',
                        key: 'fromstation'
                    },
                    {
                        title: '终点站',
                        key: 'tostation'
                    },
                    {
                        title: '车次',
                        key: 'trainno'
                    },
                    {
                        title: '状态',
                        key: 'orderstatusmsg',
                        sortable: true
                    },
                    {
                        title: '订票时间',
                        key: 'createtime',
                        sortable: true
                    },
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                trainOrders: [],
                totalPage: 1,
                totalOrders: 0,
                page: 1,
                pageSize: 20
            }
        },
        methods: {
            loadAllData() {
                apiListAllApiTrainOrder({
                    pageIndex: this.page,
                    pageSize: this.pageSize
                }).then((response) => {
                    if (response.data.code === 0) {
                        this.trainOrders = response.data.data.result.orders
                        this.totalPage = response.data.data.result.totalPage
                        this.totalOrders = response.data.data.result.totalCount
                        this.page = response.data.data.result.page
                    } else {
                        this.$Message.error('读取火车票订单失败')
                    }
                }).catch((error) => {
                    this.$Message.error('读取火车票订单失败')
                })
            },
            btSearch() {
            },
            onPage(e) {
                this.page = e
                this.loadAllData()
            },
            show(row){
                this.$router.push({
                    name:'trainOrderDetail',
                    params:{
                        orderId:row.id
                    }
                })
            },
            remove(index){
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>
  .gogo-content-header-form {
    background: #a0b9dd;
    padding: 10px
  }
</style>
