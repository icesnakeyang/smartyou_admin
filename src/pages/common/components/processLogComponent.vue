<template>
  <div>
    <div v-if="modal"></div>
    <Modal
      v-model="modal1"
      title="审核说明"
      @on-ok="ok"
      @on-cancel="cancel">
      <div v-if="isAgree">
        <p>同意通过用户申请</p>
        <Form>
          <FormItem label="审核说明">
            <Input type="text" v-model="processRemark"></Input>
          </FormItem>
        </Form>
      </div>
      <div v-if="isReject">
        <p>拒绝用户申请</p>
        <Form>
          <FormItem label="拒绝说明">
            <Input type="text" v-model="processRemark"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
    import {apiProcessRentVehicle} from "../../../api/api";

    export default {
        name: "processLogComponent",
        data() {
            return {
                modal1: false,
                processType: '',
                processRemark: 'init'
            }
        },
        props: {
            modalStatus: false,
            modalType: ''
        },
        computed: {
            modal() {
                this.modal1 = this.modalStatus
                this.processType = this.modalType
            },
            isAgree() {
                if (this.processType === 'AGREE') {
                    return true
                }
                return false
            },
            isReject() {
                if (this.processType === 'REJECT') {
                    return true
                }
                return false
            }
        },
        methods: {
            ok() {
                let processResult = {
                    status: false,
                    processRemark: this.processRemark,
                    event: 'ok',
                    result: this.processType
                }
                this.$emit("modalOutHandle", processResult)
            },
            cancel() {
                let processResult = {
                    status: false,
                    processRemark: this.processRemark,
                    event: 'cancel',
                    result: this.processType
                }
                this.$emit("modalOutHandle", processResult)
            }
        }
    }
</script>

<style scoped>

</style>
