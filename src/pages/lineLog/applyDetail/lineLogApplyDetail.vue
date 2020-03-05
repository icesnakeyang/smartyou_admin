<template>
  <div>
    <Card>
      <p slot="title">
        {{lineLog.title}}
      </p>
      <Row>
        <Col :xs="12" :sm="6" :md="2" :lg="4">
          <img style="width: 200px;height: 200px" :src="lineLog.logoImgUrl"/>
        </Col>
        <Col :xs="12" :sm="18" :md="22" :lg="20">
          <p>类型：{{lineLog.type}}</p>

          <p>主题：{{lineLog.theme}}</p>
          <p>价格：{{lineLog.price}}</p>
          <p>特价：{{lineLog.specialPrice}}</p>
          <p>状态：{{status}}</p>
          <p>创建时间：{{createTime}}</p>
        </Col>
      </Row>
      <p>简介：{{lineLog.brief}}</p>
      <Divider/>
      <div v-for="(item, index) in lineLog.tourContents">
        <div v-if="item.detail">
          <div v-html="item.detail"></div>
        </div>
        <div v-if="item.imgUrl">
          <img :src="item.imgUrl">
        </div>
      </div>
    </Card>

    <Card style="margin-top: 20px">
      <Button type="primary" @click="modalAgree=true">通过审核</Button>
      <Button type="error" @click="modalReject=true">拒绝审核</Button>
    </Card>

    <Modal
      v-model="modalAgree"
      title="提示"
      @on-ok="modalAgreeOk">
      <p style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>通过审核即为立刻发布该条旅游线路信息，且进入正式经营状态，确定审核通过吗？</span>
      </p>
      <br>
    </Modal>

    <Modal
      v-model="modalReject"
      title="提示"
      @on-ok="modalRejectOk">
      <p style="color:#f60;text-align: center">拒绝导游的线路申请</p>
      <Form>
        <FormItem label="审核说明">
          <Input type="text" v-model="processRemark" placeholder="请说明拒绝理由"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {apiGetLineLog} from "@/api/api";
  import moment from "moment";

  export default {
    name: "lineLogApplyDetail",
    data() {
      return {
        lineLog: {},
        modalAgree:false,
        modalReject:false,
        processRemark:''
      }
    },
    computed: {
      status() {
        if (this.lineLog.status === 'PENDING') {
          return '等待审核'
        }
      },
      createTime() {
        if (this.lineLog.createTime) {
          return moment(this.lineLog.createTime).format('YYYY-MM-DD HH:mm')
        }
      }
    },
    methods: {
      loadAllData() {
        console.log(this.$route.params.lineLogId)
        let params = {
          lineLogId: this.$route.params.lineLogId
        }
        apiGetLineLog(params).then((response) => {
          if (response.data.code === 0) {
            this.lineLog = response.data.data.lineLog
            console.log(this.lineLog)
          } else {
            this.$Message.error(response.data.code)
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },
      modalAgreeOk(){
        console.log('同意')
      },
      modalRejectOk(){
        console.log('拒绝')
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
