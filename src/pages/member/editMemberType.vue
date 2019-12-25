<template>
  <div>
    <Form>
      <FormItem label="会员名称">
        <Input type="text" v-model="memberType.name"></Input>
      </FormItem>
      <FormItem label="会员费">
        <InputNumber :min="0" v-model="memberType.fee"></InputNumber>
      </FormItem>
      <FormItem label="加价率">
        <InputNumber :max="1" :min="0" :step="0.01" v-model="memberType.rate"></InputNumber>
        <span>100元火车票销售价：{{salesPrice}}</span>
      </FormItem>
      <FormItem label="说明">
        <Input type="textarea" v-model="memberType.remark"></Input>
      </FormItem>
      <div v-if="saving">
        <Spin fix>
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
          <div>保存中...</div>
        </Spin>
      </div>
      <div v-else>
        <Button type="primary" @click="btSave">保存</Button>
      </div>
    </Form>
  </div>
</template>

<script>
    import {apiGetMemberType, apiUpdateMemberType} from "../../api/api";

    export default {
        name: "editMemberType",
        data() {
            return {
                saving: false,
                memberType: {}
            }
        },
        computed: {
            salesPrice() {
                return parseFloat(100 * (1 + this.memberType.rate)).toFixed(0)
            }
        },
        methods: {
            loadAllData() {
                console.log(this.$route.params.memberTypeId)
                apiGetMemberType({
                    memberTypeId: this.$route.params.memberTypeId
                }).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.memberType = response.data.data.memberType
                    } else {
                        throw new Error('读取会员信息错误')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            btSave() {
                console.log(this.memberType)
                apiUpdateMemberType({
                    memberTypeName: this.memberType.name,
                    memberTypeFee: this.memberType.fee,
                    memberTypeRate: this.memberType.rate,
                    memberTypeRemark: this.memberType.remark,
                    memberTypeId: this.memberType.memberTypeId,
                }).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.success('保存成功')
                        this.$router.push({
                            name: 'memberTypeList'
                        })
                    } else {
                        throw new Error('保存失败')
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
