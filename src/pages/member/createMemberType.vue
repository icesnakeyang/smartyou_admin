<template>
  <div>
    <Form>
      <FormItem label="会员名称">
        <Input type="text" v-model="memberTypeName"></Input>
      </FormItem>
      <FormItem label="会员费">
        <InputNumber :min="0" v-model="memberTypeFee"></InputNumber>
      </FormItem>
      <FormItem label="加价率">
        <InputNumber :max="1" :min="0" :step="0.01" v-model="memberTypeRate"></InputNumber>
        <span>100元火车票销售价：{{salesPrice}}</span>
      </FormItem>
      <FormItem label="说明">
        <Input type="textarea" v-model="memberTypeRemark"></Input>
      </FormItem>
      <div v-if="saving">
        <Spin fix>
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>保存中...</div>
        </Spin>
      </div>
      <div v-else>
        <Button type="primary" @click="btSave">创建</Button>
      </div>
    </Form>
  </div>
</template>

<script>
    import {apiCreateMemberType} from "../../api/api";

    export default {
        name: "createMemberType",
        data() {
            return {
                saving: false,
                memberTypeName: '',
                memberTypeFee: 0,
                memberTypeRate: 0,
                memberTypeRemark: ''
            }
        },
        computed: {
            salesPrice() {
                return parseFloat(100 * (1 + this.memberTypeRate)).toFixed(0)
            }
        },
        methods: {
            btSave() {
                this.saving = true
                apiCreateMemberType({
                    memberTypeName: this.memberTypeName,
                    memberTypeFee: this.memberTypeFee,
                    memberTypeRate: this.memberTypeRate,
                    memberTypeRemark: this.memberTypeRemark
                }).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.$Message.success('创建会员类型成功')
                        this.saving = false
                    } else {
                        throw new Error('创建会员类型失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                    this.saving = false
                })
            }
        }
    }
</script>

<style scoped>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
