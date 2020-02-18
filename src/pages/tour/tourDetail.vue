<template>
  <div>
    <EditTourComponent :tourProps="tour" :editStatus="true" @onSave="saveTour"></EditTourComponent>
    <Divider/>
    <Button type="primary" @click="modalAgree=true">审核通过</Button>
    <Button type="error" @click="modalReject=true">审核拒绝</Button>

    <Modal
      v-model="modalAgree"
      title="审核通过确认"
      @on-ok="btAgree">
      <Alert type="warning">通过审核即正式公开发布</Alert>
      <Form>
        <FormItem label="审核说明">
          <Input type="textarea" v-model="processRemark"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="modalReject"
      title="审核拒绝确认"
      @on-ok="btReject">
      <Alert type="warning">拒绝审核通过后，导游可修改后再次申请发布</Alert>
      <Form>
        <FormItem label="拒绝说明">
          <Input type="textarea" v-model="processRemark"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
    import {apiGetTourDetail} from "@/api/api";
    import {apiAgreeTour, apiRejectTour, apiUpdateTour} from "../../api/api";
    import EditTourComponent from './editTourComponent'

    export default {
        name: "tourDetail",
        components: {
            EditTourComponent
        },
        data() {
            return {
                tour: {},
                modalAgree: false,
                modalReject: false,
                processRemark: ''
            }
        },
        methods: {
            /**
             * 读取数据库数据
             */
            loadAllData() {
                apiGetTourDetail({
                    tourId: this.$route.params.tourId
                }).then((response) => {
                    if (response.data.code === 0) {
                        this.tour = response.data.data.tour
                    } else {
                        throw new Error('读取数据失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },

            /**
             * 保存编辑的旅游线路
             */
            saveTour(params) {
                this.$Modal.confirm({
                    title: '确定保存修改吗？',
                    onOk: () => {
                        apiUpdateTour(params).then((response) => {
                            if (response.data.code === 0) {
                                this.$Message.success('保存成功')
                            } else {
                                throw new Error('保存失败')
                            }
                        }).catch((error) => {
                            this.$Message.error(error)
                        })
                    },
                    onCancel: () => {

                    }
                });
            },

            btAgree() {
                console.log(this.processRemark)
                let params = {
                    tourId: this.tour.tourId,
                    processRemark: this.processRemark
                }
                apiAgreeTour(params).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.$Message.success('审核通过，旅游线路已发布')
                        this.$router.push({
                            name: 'tourList'
                        })
                    } else {
                        this.$Message.error(response.data.code)
                    }
                }).then((error) => {
                    this.$Message.error(error)
                })
            },

            btReject() {
                console.log(this.processRemark)
                let params = {
                    tourId: this.tour.tourId,
                    processRemark: this.processRemark
                }
                apiRejectTour(params).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.$Message.info('已拒绝该旅游线路')
                        this.$router.push({
                            name: 'tourList'
                        })
                    } else {
                        this.$Message.error(response.data.code)
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

</style>
