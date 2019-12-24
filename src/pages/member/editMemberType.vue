<template>
  <div>
    <Form>
      <FormItem label="会员名称">
        <Input type="text" v-model="memberType.memberTypeName"></Input>
      </FormItem>
      <FormItem label="会员费">
        <InputNumber :min="0" v-model="memberType.memberTypeFee"></InputNumber>
      </FormItem>
      <FormItem label="加价率">
        <InputNumber :max="1" :min="0" :step="0.01" v-model="memberType.memberTypeRate"></InputNumber>
        <span>100元火车票销售价：{{salesPrice}}</span>
      </FormItem>
      <FormItem label="说明">
        <Input type="textarea" v-model="memberType.memberTypeRemark"></Input>
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
    import {apiGetMemberType} from "../../api/api";

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
                return parseFloat(100 * (1 + this.row.rate)).toFixed(0)
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
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
