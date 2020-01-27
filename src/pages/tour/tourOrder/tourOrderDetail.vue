<template>
  <div>
    <Card>
      <p slot="title">
        {{title}}
      </p>
      <p>订单价格：{{orderPrice}}</p>
      <p>用户：{{nickname}}</p>
      <p>出发时间：{{formatDepartTime}}</p>
      <p>联系电话：{{contactPhone}}</p>
      <p>联系人：{{contactName}}</p>
      <p>人数：{{persons}}</p>
      <p v-if="showPaid">
        <span>订单状态：<Tag color="success">已支付</Tag></span>
      </p>
      <p v-else>
        <span>订单状态：<Tag color="warning">未支付</Tag></span>
      </p>
      <p>订单时间：{{formatOrderTime}}</p>
      <divider></divider>
      <p>地点：{{location}}</p>
      <p>主题：{{theme}}</p>
      <p>简介：{{brief}}</p>
      <p>类型：{{type}}</p>
      <p>{{detail}}</p>
    </Card>
  </div>
</template>

<script>
  import {apiGetTourOrder} from "../../../api/api";
  import moment from "moment";

  export default {
    name: "tourOrderDetail",
    data() {
      return {
        title: '',
        orderPrice: 0,
        nickname: '',
        departTime: '',
        contactPhone: '',
        contactName: '',
        persons: '',
        orderStatus: '',
        orderTime: '',
        location: '',
        theme: '',
        brief: '',
        type: '',
        detail: ''
      }
    },
    computed: {
      formatOrderTime() {
        if (this.orderTime) {
          return moment(this.orderTime).format('YYYY-MM-DD HH:mm')
        }
        return ''
      },
      formatDepartTime() {
        if (this.departTime) {
          return moment(this.departTime).format('YYYY-MM-DD HH:mm')
        }
        return ''
      },
      showPaid() {
        if (this.orderStatus === 'PAID') {
          return true
        }
        return false
      }
    },
    methods: {
      loadAllData() {
        let params = {
          tourOrderId: this.$route.params.tourOrderId
        }
        apiGetTourOrder(params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.title = response.data.data.title
            this.orderPrice = response.data.data.orderPrice
            this.nickname = response.data.data.nickname
            this.departTime = response.data.data.departTime
            this.contactPhone = response.data.data.contactPhone
            this.contactName = response.data.data.contactName
            this.persons = response.data.data.persons
            this.orderStatus = response.data.data.orderStatus
            this.orderTime = response.data.data.orderTime
            this.location = response.data.data.location
            this.theme = response.data.data.theme
            this.brief = response.data.data.brief
            this.type = response.data.data.type
            this.detail=response.data.data.detail
          } else {
            throw new Error('读取数据库错误')
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      }
    },
    mounted() {
      console.log(this.$route.params.tourOrderId)
      this.loadAllData()
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 20px;
  }
</style>
