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
          <h3>火车票订单</h3>
        </div>
        <div class="gogoboard-content" style="background: #62c27e">
          <h2>2240</h2>
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
