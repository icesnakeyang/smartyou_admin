<template>
  <Card>
    <p slot="title">{{row.name}}</p>
    <Form :label-width="100">
      <FormItem label="会员费">
        <InputNumber :min="0" :step="1" v-model="row.fee"></InputNumber>
      </FormItem>
      <FormItem label="加价率">
        <InputNumber :max="1" :min="0" :step="0.01" v-model="row.rate"></InputNumber>
        <span>100元火车票销售价：{{salesPrice}}</span>
      </FormItem>
      <FormItem label="说明">
        <Input type="textarea" v-model="row.remark"></Input>
      </FormItem>
    </Form>
    <Button type="primary" @click="btEdit">修改</Button>
    <Button type="error">删除</Button>
  </Card>
</template>

<script>
  export default {
    name: "memberTypeListRow",
    data() {
      return {}
    },
    props: {
      row: {}
    },
    computed: {
      salesPrice() {
        return parseFloat(100 * (1 + this.row.rate)).toFixed(0)
      }
    },
    methods: {
      btEdit() {
        this.$router.push({
          name: 'editMemberType',
            params:{
              memberTypeId:this.row.memberTypeId
            }
        })
      }
    },
    mounted() {
      console.log(this.row)
    }
  }
</script>

<style scoped>

</style>
