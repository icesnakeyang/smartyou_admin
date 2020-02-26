<template>
  <div>
    <Card>
      <p slot="title">导游详细信息</p>

        <Divider/>
        <p>当前状态：
          <span v-if="isBanned">
          <Tag color="error">{{status}}</Tag>
        </span>
          <span v-else-if="isPending">
          <Tag color="primary">{{status}}</Tag>
        </span>
          <span v-else-if="isActive">
          <Tag color="primary">{{status}}</Tag>
        </span>
        </p>

        <p>管理员处理时间：{{processTime}}</p>
        <p>管理员处理说明：{{guideInfo.processRemark}}</p>
    </Card>

    <div v-if="isPending">
      <div style="margin-top: 20px">
        <Button type="primary" @click="modalAgree=true">通过审核</Button>
        <Button type="error" @click="modalReject=true">拒绝申请</Button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <Button type="primary" @click="modalBan=true">禁止导游服务</Button>
      <Button type="primary" @click="modalActive=true">恢复导游服务</Button>
    </div>

    <div style="margin-top: 20px">
      <Button type="error" @click="btDelete">删除导游</Button>
    </div>

    <Modal
      v-model="modalAgree"
      title="审核该导游申请"
      @on-ok="btAgree"
      okText="通过">
      <Form>
        <FormItem label="审核说明">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="审核意见说明" v-model="agreeRemark"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="modalReject"
      title="拒绝导游申请"
      @on-ok="btReject"
      okText="拒绝">
      <Form>
        <FormItem label="拒绝说明">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="审核意见说明"
                 v-model="rejectRemark"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="modalBan"
      title="禁止该导游服务"
      @on-ok="btBan"
      okText="禁止">
      <Form>
        <FormItem label="禁止说明">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="禁止服务原因说明"
                 v-model="banRemark"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="modalActive"
      title="恢复导游服务"
      @on-ok="btActive"
      okText="恢复导游服务">
      <Form>
        <FormItem label="说明">
          <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请说明恢复原因"
                 v-model="activeRemark"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {
    apiActiveGuide,
    apiAgreeGuide,
    apiBbanGuide,
    apiDeleteGuide,
    apiGetGuide,
    apiRejectGuide
  } from "../../api/api";
  import moment from "moment";

  export default {
    name: "guideInfoDetail",
    data() {
      return {
        guideInfo: {},
        modalAgree: false,
        modalReject: false,
        modalBan: false,
        modalActive: false,
        agreeRemark: '',
        rejectRemark: '',
        banRemark: '',
        activeRemark: ''
      }
    },
    computed: {
      registerTime() {
        if (this.guideInfo.register_time) {
          return moment(this.guideInfo.register_time).format('YYYY-MM-DD HH:mm')
        }
      },
      status() {
        if (this.guideInfo.status === 'PENDING') {
          return '等待审核'
        }
        if (this.guideInfo.status === 'REJECT') {
          return '已拒绝'
        }
        if (this.guideInfo.status === 'BANNED') {
          return '已禁止导游服务'
        }
        if (this.guideInfo.status === 'ACTIVE') {
          return '正常'
        }
      },
      processTime() {
        if (this.guideInfo.processTime) {
          return moment(this.guideInfo.processTime).format('YYYY-MM-DD HH:mm')
        } else {
          return '未处理'
        }
      },
      isPending() {
        if (this.guideInfo.status === 'PENDING') {
          return true
        } else {
          return false
        }
      },
      isBanned() {
        if (this.guideInfo.status === 'BANNED') {
          return true
        }
        return false
      },
      isActive() {
        if (this.guideInfo.status === 'ACTIVE') {
          return true
        }
        return false
      }
    },
    methods: {
      loadAllData() {
        let params = {
          guideId: this.$route.params.guideInfoId
        }
        apiGetGuide(params).then((response) => {
            console.log(response)
          if (response.data.code === 0) {
            this.guideInfo = response.data.data.guideInfo
          } else {
            throw new Error('读取数据库错误')
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },
      btReject() {
        let params = {
          guideId: this.$route.params.guideId,
          remark: this.remark
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
      },
      btAgree() {
        let params = {
          guideId: this.$route.params.guideId,
          remark: this.remark
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
      },
      btBan() {
        let params = {
          guideId: this.$route.params.guideId,
          remark: this.banRemark
        }
        apiBbanGuide(params).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success('已禁止该导游服务')
            this.loadAllData()
          } else {
            throw new Error('处理失败')
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },
      btActive() {
        let params = {
          guideId: this.$route.params.guideId,
          remark: this.activeRemark
        }
        apiActiveGuide(params).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success('已恢复该导游的服务资格')
            this.loadAllData()
          } else {
            throw new Error('处理失败')
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },
      btDelete() {
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确定要删除该导游吗？</p>',
          onOk: () => {
            let params = {
              guideId: this.$route.params.guideId
            }
            apiDeleteGuide(params).then((response) => {
              if (response.data.code === 0) {
                this.$Message.success('删除成功');
                this.$router.push({
                  name: 'guideList'
                })
              } else {
                throw new Error('删除失败')
              }
            }).catch((error) => {
              this.$Message.error(error)
            })
          }
        });
      }
    },
    created() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
