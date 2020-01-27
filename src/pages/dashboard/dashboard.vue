<template>
  <!--  <div style="background: cornflowerblue;flex: 1;height: 100%">-->
  <div>
    <Row type="flex" justify="center" align="top" class="code-row-bg">
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #54729d">
          <h3>注册人数</h3>
        </div>
        <div class="gogoboard-content" style="background: #54729d">
          <h2>{{totalUser}}</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #62c27e">
          <h3>火车票订单（接口/本地）</h3>
        </div>
        <div class="gogoboard-content" style="background: #62c27e">
          <h2>{{totalTrainOrderApi}}/{{totalTrainOrderLocal}}</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #ec3a45">
          <h3>飞机票订单</h3>
        </div>
        <div class="gogoboard-content" style="background: #ec3a45">
          <h2>2240</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #f3b23d">
          <h3>酒店订单</h3>
        </div>
        <div class="gogoboard-content" style="background: #f3b23d">
          <h2>2240</h2>
        </div>
      </Col>
    </Row>
    <Row type="flex" justify="center" align="top" class="code-row-bg">
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #ff6f01">
          <h3>旅游线路订单</h3>
        </div>
        <div class="gogoboard-content" style="background: #ff7060">
          <h2>{{totalTourOrder}}</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #c2189f">
          <h3>总收入</h3>
        </div>
        <div class="gogoboard-content" style="background: #c220a4">
          <h2>{{totalIncome}}</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #6974ec">
          <h3>飞机票订单</h3>
        </div>
        <div class="gogoboard-content" style="background: #6974ec">
          <h2>2240</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header" style="background: #00832e">
          <h3>酒店订单</h3>
        </div>
        <div class="gogoboard-content" style="background: #00832e">
          <h2>2240</h2>
        </div>
      </Col>
    </Row>
    <div style="background: slategray">dashboard</div>
    <div style="background: slategray">dashboard</div>
  </div>
</template>

<script>
  import {apiStatisticFinance, apiStatisticTour, apiStatisticTrain, apiStatisticUsers} from "../../api/api";

  export default {
    name: "dashboard",
    data() {
      return {
        totalUser: 0,
        totalTrainOrderApi: 0,
        totalTrainOrderLocal: 0,
        totalTourOrder: 0,
        totalIncome:0
      }
    },
    methods: {
      loadAllData() {
        apiStatisticUsers({}).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.totalUser = response.data.data.totalUser
          } else {
            this.$Message.error('统计失败')
          }
        }).catch((error) => {
          this.$Message.error('统计失败')
        })

        apiStatisticTrain({}).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.totalTrainOrderApi = response.data.data.totalTrainOrderApi
            this.totalTrainOrderLocal = response.data.data.totalTrainOrderLocal
          } else {
            this.$Message.error('统计失败')
          }
        }).catch((error) => {
          this.$Message.error('统计失败')
        })

        apiStatisticTour({}).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.totalTourOrder = response.data.data.totalTourOrder
          } else {
            throw new Error('统计失败')
          }
        }).catch((error) => {
          this.$Message.error(error)
        })

        apiStatisticFinance({}).then((response) => {
          console.log(response)
          if(response.data.code===0){
            this.totalIncome=response.data.data.totalIncome
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
  .gogoboard-header {
    background: #9d7e9d;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    color: #f1f4ff;
  }

  .gogoboard-content {
    background: #90f5a7;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: #f1f4ff;
  }
</style>
