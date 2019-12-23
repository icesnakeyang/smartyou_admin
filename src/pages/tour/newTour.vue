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
    import {apiCreateTour} from "../../api/api";

    export default {
        name: "newTour",
        data() {
            return {
                tour: {
                    type: '',
                    title: '',
                    brief: '',
                    location: '',
                    price: '',
                    specialPrice: '',
                    detail: ''
                }
            }
        },
        methods: {
            saveTour() {
                console.log(this.tour)
                apiCreateTour({
                    type: this.tour.type,
                    title: this.tour.title,
                    detail: this.tour.detail,
                    brief: this.tour.brief,
                    price: this.tour.price,
                    specialPrice: this.tour.specialPrice,
                    location: this.tour.location
                }).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.$Message.success('创建成功')
                    } else {
                        throw new Error('创建失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>
