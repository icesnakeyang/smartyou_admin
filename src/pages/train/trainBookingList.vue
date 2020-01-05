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
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  import {apiListAllApiTrainOrder} from "../../api/api";

    export default {
        name: "trainBookingList",
        data() {
            return {
                searchKey: '',
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                trainOrders: [],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {
            loadAllData() {
                apiListAllApiTrainOrder({
                    pageIndex: 1,
                    pageSize: 20
                }).then((response) => {
                  console.log(response)
                    if (response.data.code === 0) {
                        this.trainOrders = response.data.data.data
                        console.log('读取火车票订单成功')
                    } else {
                        this.$Message.error('读取火车票订单失败')
                    }
                }).catch((error) => {
                    this.$Message.error('读取火车票订单失败')
                })
            },
            btSearch() {
                console.log('搜搜')
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
