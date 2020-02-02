<template>
  <div>
    <Card>
      <p slot="title">订单信息</p>
      <p>订单时间: {{createTime}}</p>
      <p>出发地址: {{order.fromStation}}</p>
      <p>到达地址: {{order.toStation}}</p>
      <p>出发时间: {{departTime}}</p>
      <p>乘客数量: {{order.passengerNum}}</p>
      <p>联系人: {{order.contactName}}</p>
      <p>联系人电话: {{order.contactPhone}}</p>
    </Card>
    <Card style="margin-top: 20px">
      <p slot="title">处理信息</p>
      <p>订单状态: {{order.statusMsg}}</p>
      <div v-if="isSuccess">
        <p>车辆牌照：{{order.vehicleNo}}</p>
        <p>司机姓名：{{order.driverName}}</p>
        <p>司机电话：{{order.driverPhone}}</p>
        <p>价格：{{order.price}}</p>
        <p>备注：{{order.processRemark}}</p>
      </div>
      <div v-else="isSuccess">
        <div v-if="isFailed">
          <p>失败说明: {{order.processRemark}}</p>
        </div>
      </div>

    </Card>

    <div style="margin-top: 20px">
      <Row>
        <Col :xs="12" :sm="12" :md="12" :lg="12" style="text-align: center">
          <Button type="primary" @click="modalMatchVehicle=true">分配车辆</Button>
        </Col>
        <Col :xs="12" :sm="12" :md="12" :lg="12" style="text-align: center">
          <Button type="error" @click="modalRejectVehicle=true">拒绝订单</Button>
        </Col>
      </Row>
    </div>

    <Modal
      v-model="modalMatchVehicle"
      title="分配车辆"
      @on-ok="btMatchVehicle"
    >
      <Form>
        <FormItem label="车辆型号">
          <Input v-model="order.vehicleType"></Input>
        </FormItem>
        <FormItem label="车牌号">
          <Input v-model="order.vehicleNo"></Input>
        </FormItem>
        <FormItem label="司机姓名">
          <Input v-model="order.driverName"></Input>
        </FormItem>
        <FormItem label="司机电话">
          <Input v-model="order.driverPhone"></Input>
        </FormItem>
        <FormItem label="包车价格">
          <InputNumber v-model="order.price"></InputNumber>
        </FormItem>
        <FormItem label="说明">
          <Input v-model="order.processRemark"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="modalRejectVehicle"
      title="拒绝包车"
      @on-ok="btRejectVehicle"
    >
      <Form>
        <FormItem label="说明">
          <Input v-model="order.processRemark"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
    import {apiGetRentVehicle, apiProcessRentVehicle} from "../../api/api";
    import moment from "moment";

    export default {
        name: "rentVehicleOrderDetail",
        data() {
            return {
                order: {},
                modalMatchVehicle: false,
                modalRejectVehicle:false,

            }
        },
        computed: {
            createTime() {
                if (this.order.createTime) {
                    return moment(this.order.createTime).format('YYYY-MM-DD HH:mm')
                }
            },
            departTime() {
                if (this.order.departTime) {
                    return moment(this.order.departTime).format('YYYY-MM-DD HH:mm')
                }
            },
            isSuccess(){
                if(this.order.status==='SUCCESS'){
                    return true
                }
                return false
            },
            isFailed(){
                if(this.order.status==='FAILED'){
                    return true
                }
                return false
            }
        },
        methods: {
            loadAllData() {
                let params = {
                    rentVehicleId: this.$route.params.rentVehicleId
                }
                apiGetRentVehicle(params).then((response) => {
                    if (response.data.code === 0) {
                        this.order = response.data.data.rentVehicle
                    } else {
                        throw new Error('读取数据错误')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            btMatchVehicle() {
                let params = {
                    rentVehicleId: this.order.rentVehicleId,
                    vehicleType:this.order.vehicleType,
                    vehicleNo: this.order.vehicleNo,
                    driverName: this.order.driverName,
                    driverPhone: this.order.driverPhone,
                    price: this.order.price,
                    processRemark: this.order.processRemark
                }
                apiProcessRentVehicle(params).then((response) => {
                    if (response.data.code === 0) {
                        this.loadAllData()
                        this.$Message.success('保存成功')
                        this.modalMatchVehicle = false
                    } else {
                        throw new Error('保存失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            btRejectVehicle(){
                let params={
                    rentVehicleId:this.order.rentVehicleId,
                    processRemark: this.order.processRemark
                }
                apiProcessRentVehicle(params).then((response)=>{
                    if(response.data.code===0){
                        this.loadAllData()
                        this.$Message.success('保存成功')
                        this.modalRejectVehicle=false
                    }else{
                        throw new Error('保存失败')
                    }
                }).catch((error)=>{
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
