<template>
  <div>
    <Form :model="formItem" :label-width="100">
      <FormItem label="普通会员加价率">
        <InputNumber :max="1" :min="0" :step="0.01" v-model="ticketRate"></InputNumber>
        <span>100元火车票销售价：{{salesPrice0}}</span>
      </FormItem>
      <FormItem label="会员费1档">
        <InputNumber :min="0" :step="1" v-model="memberFee1"></InputNumber>
        <span>加价率</span>
        <InputNumber :max="1" :min="0" :step="0.01" v-model="memberFee1Rate"></InputNumber>
        <span>100元火车票销售价：{{salesPrice1}}</span>
      </FormItem>
      <FormItem label="会员费2档">
        <InputNumber :min="0" :step="1" v-model="memberFee2"></InputNumber>
        <span>加价率</span>
        <InputNumber :max="1" :min=0 :step="0.01" v-model="memberFee2Rate"></InputNumber>
        <span>100元火车票销售价：{{salesPrice2}}</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
    import {apiUpdateTrainMemberSettings} from "../../api/api";

    export default {
        name: "trainSettings",
        data() {
            return {
                ticketRate: 0,
                basePrice: 100,
                memberFee1: 15,
                memberFee1Rate: 0,
                memberFee2: 30,
                memberFee2Rate: 0
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
            saveSettings() {
                let params =
                    [
                        {
                            keyName: this.ticketRate,
                            keyValue: this.ticketRate,
                        },
                {
                    keyName: memberFee1,
                        keyValue
                :
                    memberFee1Rate,
                }
            ,
                {
                    keyName: memberFee2,
                        keyValue
                :
                    memberFee2Rate,
                }
            ]


                apiUpdateTrainMemberSettings({}).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.success('保存成功')
                    } else {
                        this.$Message.error('保存失败')
                    }
                }).catch((error) => {
                    this.$Message.error('保存失败')
                })
            }
        }
    }
</script>

<style scoped>

</style>
