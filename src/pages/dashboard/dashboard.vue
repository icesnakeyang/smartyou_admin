<template>
  <!--  <div style="background: cornflowerblue;flex: 1;height: 100%">-->
  <div style="background: cornflowerblue">
    <Row type="flex" justify="center" align="top" class="code-row-bg">
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header">
          <h5>注册人数</h5>
        </div>
        <div class="gogoboard-content">
          <h2>{{totalUser}}</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header">
          <h5>火车票订单</h5>
        </div>
        <div class="gogoboard-content">
          <h2>2240</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header">
          <h5>飞机票订单</h5>
        </div>
        <div class="gogoboard-content">
          <h2>2240</h2>
        </div>
      </Col>
      <Col span="6" style="padding: 10px">
        <div class="gogoboard-header">
          <h5>酒店订单</h5>
        </div>
        <div class="gogoboard-content">
          <h2>2240</h2>
        </div>
      </Col>
    </Row>
    <div style="background: slategray">dashboard</div>
    <div style="background: slategray">dashboard</div>
  </div>
</template>

<script>
    import {apiStatisticUsers} from "../../api/api";

    export default {
        name: "dashboard",
        data() {
            return {
                totalUser: 0
            }
        },
        methods: {
            loadAllData() {
                apiStatisticUsers({}).then((response) => {
                    if (response.data.code === 0) {
                        this.totalUser = response.data.data.totalUser
                    } else {
                        this.$Message.error('统计信息错误')
                    }
                }).catch((error) => {
                    this.$Message.error('统计信息错误')
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
    background: coral;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
  }

  .gogoboard-content {
    background: #a8ed00;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
</style>
