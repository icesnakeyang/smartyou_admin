<template>
  <div>
    <Card>
      <p slot="title">{{line.lineLog.title}}</p>
      <Row>
        <Col :xs="24" :sm="24" :md="12" :lg="6">
          <img :src="line.lineLog.logoImgUrl" style="height: 200px;width:200px">
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="6">
          <p>类型：{{line.lineLog.type}}</p>
          <p>主题：{{line.lineLog.theme}}</p>
          <p>原价：{{line.lineLog.price}}</p>
          <p>特价：{{line.lineLog.specialPrice}}</p>
          <p>地点：{{line.lineLog.location}}</p>
          <p>发布时间：{{publishTime}}</p>
        </Col>
      </Row>
      <br>
      <p>简介：{{line.lineLog.brief}}</p>
      <Divider/>
      <div v-for="(item, index) in line.lineLog.tourContents">
        <div v-if="item.detail" v-html="item.detail"></div>
        <div v-if="item.imgUrl">
          <img :src="item.imgUrl" style="width: 100%">
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import {apiGetLine} from "@/api/api";
  import moment from "moment";

  export default {
    name: "lineDetail",
    data() {
      return {
        line: {}
      }
    },
    computed: {
      publishTime() {
        if (this.line && this.line.publishTime) {
          return moment(this.line.publishTime).format('YYYY-MM-DD HH:mm')
        }
        return ''
      }
    },
    methods: {
      loadAllData() {
        let params = {
          lineId: this.$route.params.lineId
        }
        apiGetLine(params).then((response) => {
          if (response.data.code === 0) {
            this.line = response.data.data.line
          } else {
            this.$Message.error(response.data.code)
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
