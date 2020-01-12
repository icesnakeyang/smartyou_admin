<template>
  <div>
    <Form>
      <FormItem label="类型">
        <Input type="text" v-model="tour.type"></Input>
      </FormItem>
      <FormItem label="标题">
        <Input type="text" v-model="tour.title"></Input>
      </FormItem>
      <FormItem label="简要说明">
        <Input type="text" v-model="tour.brief"></Input>
      </FormItem>
      <FormItem label="地理位置关键字">
        <Input type="text" v-model="tour.location"></Input>
      </FormItem>
      <FormItem label="定价">
        <Input type="text" v-model="tour.price"></Input>
      </FormItem>
      <FormItem label="特价">
        <Input type="text" v-model="tour.specialPrice"></Input>
      </FormItem>
      <FormItem label="详细内容">
        <Input type="textarea" :maxlength="100" :show-word-limit="true" v-model="tour.detail"></Input>
      </FormItem>
      <Button type="primary" @click="saveTour">保存</Button>
    </Form>
  </div>
</template>

<script>
  import {apiGetTourDetail} from "@/api/api";

  export default {
    name: "tourDetail",
    data() {
      return {
        tour: {}
      }
    },
    methods: {
      loadAllData() {
        console.log(this.$route.params.tourId)
        apiGetTourDetail({
          tourId: this.$route.params.tourId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.tour=response.data.data.tour
          } else {
            throw new Error('读取数据失败')
          }
        }).catch((error) => {
          console.log(error)
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
