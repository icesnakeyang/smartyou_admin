<template>
  <div>
    <Card>
      <p slot="title">
        导游信息
      </p>
      <div>
        <img :src="guideLog.guideData.avataUrl">
      </div>
      <p>姓名：{{guideLog.guideData.name}}</p>
      <p>创建时间：{{createTime}}</p>
      <p>当前状态：{{status}}</p>
      <p>身份证号码：{{guideLog.guideData.idcard}}</p>
      <p>性别：{{sex}}</p>
      <p>年龄：{{guideLog.guideData.age}}</p>
      <p>城市：{{guideLog.guideData.location}}</p>
      <p>出生日期：{{brithDate}}</p>
      <p>风格关键词：{{guideLog.guideData.styleKey}}</p>
      <p>擅长语言：{{guideLog.guideData.language}}</p>
      <p>电话：{{guideLog.guideData.phone}}</p>
      <Divider></Divider>
      <div v-html="guideLog.guideData.description"></div>
      <Divider/>
      <Card>
        <p slot="title">导游证</p>
        <p>导游证编号：{{guideLog.guideData.certificateNo}}</p>
        <p>导游证编号：{{guideLog.guideData.organization}}</p>
        <p>导游证编号：{{exprDateFrom}}</p>
        <p>导游证编号：{{exprDateTo}}</p>
        <img :src="guideLog.guideData.certificateImgUrl">
      </Card>
    </Card>

    <div v-if="isPrivate">

    </div>
    <div v-if="isPending">
      <Card style="margin-top: 20px">
        <p slot="title">审核导游申请</p>
        <Button type="primary" @click="btAgree">通过</Button>
        <Button type="error" @click="btReject">拒绝</Button>
      </Card>
    </div>

    <div v-if="isAgree">
      <Card style="margin-top: 20px">
        <p slot="title">审核情况</p>
        <p><Tag color="success">已审核通过</Tag></p>
      </Card>
    </div>
    <UserActLogListComp :userId="guideLog.userId"/>
    <ProcessLogComp :modalStatus="modalStatus" :modalType="modalType" @modalOutHandle="modalOutHandle"></ProcessLogComp>
  </div>
</template>

<script>
  import moment from "moment";
  import {apiGetGuideLog} from "@/api/api";
  import UserActLogListComp from '../user/actLog/actlogListComp'
  import ProcessLogComp from '../common/components/processLogComponent'
  import {apiAgreeGuide, apiRejectGuide} from "../../api/api";

  export default {
    name: "guideLogDetail",
    components: {
      UserActLogListComp,
      ProcessLogComp
    },
    data() {
      return {
        guideLog: {
          guideData: {}
        },
        modalType: '',
        modalStatus: false
      }
    },
    computed: {
      createTime() {
        if (this.guideLog.createTime) {
          return moment(this.guideLog.createTime).format('YYYY-MM-DD HH:mm')
        }
        return ''
      },
      status() {
        if (this.guideLog.status === 'PRIVATE') {
          return '未提交'
        }
      },
      isPrivate() {
        if (this.guideLog.status === 'PRIVATE') {
          return true
        }
        return false
      },
      isPending() {
        if (this.guideLog.status === 'PENDING') {
          return true
        }
        return false
      },
      ifAgree() {
        if (this.guideLog.status === 'AGREE') {
          return true
        }
        return false
      },
      sex() {
        if (this.guideLog.guideData.sex === 'F') {
          return '女'
        } else {
          if (this.guideLog.guideData.sex === 'M') {
            return '男'
          }
        }
      },
      brithDate() {
        if (this.guideLog.guideData.birthDate) {
          return moment(this.guideLog.guideData.birthDate).format('YYYY-MM-DD')
        }
      },
      exprDateFrom() {
        if (this.guideLog.guideData.exprDateFrom) {
          return moment(this.guideLog.guideData.exprDateFrom).format('YYYY-MM-DD')
        }
        return ''
      },
      exprDateTo() {
        if (this.guideLog.guideData.exprDateTo) {
          return moment(this.guideLog.guideData.exprDateTo).format('YYYY-MM-DD')
        }
        return ''
      }
    },
    methods: {
      loadAllData() {
        let params = {
          guideLogId: this.$route.params.guideLogId
        }
        apiGetGuideLog(params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.guideLog = response.data.data.guideLog
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },
      btAgree() {
        this.modalType = 'AGREE'
        this.modalStatus = true
      },

      btReject() {
        this.modalType = 'REJECT'
        this.modalStatus = true
      },
      modalOutHandle(data) {
        this.modalStatus = data.status
        if (data.event === 'ok' && data.result === 'AGREE') {
          //审核通过
          let params = {
            guideId: this.guideLog.guideLogId,
            processRemark: data.processRemark
          }

          apiAgreeGuide(params).then((response) => {
            if (response.data.code === 0) {
              this.$Message.success('已通过导游审核')
              this.loadAllData()
            } else {
              throw new Error('处理失败')
            }
          }).catch((error) => {
            this.$Message.error(error)
          })
        } else {
          if (data.event === 'ok' && data.result === 'REJECT') {
            //审核拒绝
            let params = {
              guideLogId: this.guideLog.guideLogId,
              processRemark: data.processRemark
            }
            apiRejectGuide(params).then((response) => {
              if (response.data.code === 0) {
                this.$Message.success('已拒绝该导游申请')
                this.loadAllData()
              } else {
                throw new Error('处理失败')
              }
            }).catch((error) => {
              this.$Message.error(error)
            })
          }
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
