<template>
  <div>
    <Form>
      <FormItem label="类型">
        <Input type="text" v-model="tour.type"></Input>
      </FormItem>
      <FormItem label="标题">
        <Input type="text" v-model="tour.title"></Input>
      </FormItem>
      <FormItem label="主题">
        <Input type="text" v-model="tour.theme"></Input>
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
      <FormItem>
        <Input type="text" v-model="tour.tourId"></Input>
      </FormItem>

      <Button type="primary" @click="saveTour">保存</Button>
    </Form>
    <TestPic code="logo"
             @event1="change($event)"/>
  </div>
</template>

<script>
    import {apiGetTourDetail} from "@/api/api";
    import TestPic from "./testPic";
    import {apiUpdateTour} from "../../api/api";

    export default {
        name: "tourDetail",
        components: {
            TestPic
        },
        data() {
            return {
                tour: {}
            }
        },
        methods: {
            loadAllData() {
                apiGetTourDetail({
                    tourId: this.$route.params.tourId
                }).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.tour = response.data.data.tour
                    } else {
                        throw new Error('读取数据失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            saveTour() {
                let params = {
                    tourId: this.tour.tourId,
                    type: this.tour.type,
                    title: this.tour.title,
                    detail: this.tour.detail,
                    brief: this.tour.brief,
                    price: this.tour.price,
                    specialPrice: this.tour.specialPrice,
                    location: this.tour.location,
                    logoFile: this.tour.logoFile,
                    logoFileLogId: this.tour.logoFileLogId,
                    theme: this.tour.theme
                }

                apiUpdateTour(params).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.success('保存成功')
                    } else {
                        throw new Error('保存失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })

            },
            change(data) {
                if (data.action === 'edit') {
                    this.tour.logoFile = data.fileName
                    this.tour.logoFileLogId = data.fileLogId
                } else {
                    if (data.action === 'delete') {
                        this.tour.logoFile = null
                        this.tour.logoFileLogId = null
                    }
                }
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
