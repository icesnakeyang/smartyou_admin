<template>
  <div>
    <div style="padding-top: 20px">
      <Card>
        <p slot="title">普通用户价格</p>
        <Form :label-width="100">
          <FormItem label="加价率">
            <InputNumber :max="1" :min="0" :step="0.01" v-model="ticketRate"></InputNumber>
            <span>100元火车票销售价：{{salesPrice0}}</span>
          </FormItem>
        </Form>
      </Card>
    </div>
    <div style="padding-top: 20px">
      <Card>
        <p slot="title">会员1</p>
        <Form :label-width="100">
          <FormItem label="会员名称">
            <Input type="text" v-model="memberType1"></Input>
          </FormItem>
          <FormItem label="会员费">
            <InputNumber :min="0" :step="1" v-model="memberFee1"></InputNumber>
            <span>加价率</span>
            <InputNumber :max="1" :min="0" :step="0.01" v-model="memberFee1Rate"></InputNumber>
            <span>100元火车票销售价：{{salesPrice1}}</span>
          </FormItem>
        </Form>
      </Card>
    </div>
    <div style="padding-top: 20px">
      <Card>
        <p slot="title">会员2</p>
        <Form :label-width="100">
          <FormItem label="会员名称">
            <Input type="text" v-model="memberType2"></Input>
          </FormItem>
          <FormItem label="会员费2档">
            <InputNumber :min="0" :step="1" v-model="memberFee2"></InputNumber>
            <span>加价率</span>
            <InputNumber :max="1" :min=0 :step="0.01" v-model="memberFee2Rate"></InputNumber>
            <span>100元火车票销售价：{{salesPrice2}}</span>
          </FormItem>
        </Form>
      </Card>
    </div>
    <Button type="primary" @click="saveSettings">保存</Button>
  </div>
</template>

<script>

  import {apiListMemberType} from "../../api/api";

  export default {
    name: "memberTypeList",
    data() {
      return {
        ticketRate: 0.0,
        basePrice: 100,
        memberType1: '',
        memberFee1: 15,
        memberFee1Rate: 0.0,
        memberType2: '',
        memberFee2: 30,
        memberFee2Rate: 0.0
      }
    },
    computed: {
      salesPrice0() {
        return parseFloat(this.basePrice * (1 + this.ticketRate)).toFixed(0)
      },
      salesPrice1() {
        return parseFloat(this.basePrice * (1 + this.memberFee1Rate)).toFixed(0)
      },
      salesPrice2() {
        return parseFloat(this.basePrice * (1 + this.memberFee2Rate)).toFixed(0)
      }
    },
    methods: {
      loadAllData() {
        apiListMemberType({}).then((response) => {
          if (response.data.code === 0) {
            console.log(response.data.data)
            let list = response.data.data.keys;
            list.forEach((item, index) => {
              console.log(item)
              if (item.keyName === 'ticketRate') {
                this.ticketRate = Number(item.value)
              }
              if (item.keyName === 'memberFee1') {
                this.memberFee1 = Number(item.value)
                this.memberType1 = item.memberTypeName
              }
              if (item.keyName === 'memberFee1Rate') {
                this.memberFee1Rate = Number(item.value)
              }
              if (item.keyName === 'memberFee2') {
                this.memberFee2 = Number(item.value)
                this.memberType2 = item.memberTypeName
              }
              if (item.keyName === 'memberFee2Rate') {
                this.memberFee2Rate = Number(item.value)
              }
            })
          } else {
            this.$Message.error('读取会员配置信息失败')
          }
        }).catch((error) => {
          this.$Message.error('读取会员配置信息失败')
        })
      },
      saveSettings() {
        this.$Modal.confirm({
          title: '提问',
          content: '<p>确定要修改所有的设置吗？</p>',
          okText: '确定',
          cancelText: '取消',
          onCancel: () => {
            return
          },
          onOk: () => {
            let params = {
              keys: [{
                keyName: 'ticketRate',
                keyValue: this.ticketRate
              },
                {
                  memberTypeName: this.memberType1,
                  keyName: 'memberFee1',
                  keyValue: this.memberFee1,
                },
                {
                  keyName: 'memberFee1Rate',
                  keyValue: this.memberFee1Rate,
                },
                {
                  memberTypeName: this.memberType2,
                  keyName: 'memberFee2',
                  keyValue: this.memberFee2,
                },
                {
                  keyName: 'memberFee2Rate',
                  keyValue: this.memberFee2Rate,
                }]
            }
            apiUpdateTrainMemberSettings(params).then((response) => {
              if (response.data.code === 0) {
                this.$Message.success('保存成功')
              } else {
                this.$Message.error('保存失败')
              }
            }).catch((error) => {
              this.$Message.error('保存失败')
            })
          },
        });
      }
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>
</style>
