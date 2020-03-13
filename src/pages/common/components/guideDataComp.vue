<template>
  <div>
    <Card>
      <p slot="title">导游详细信息</p>
      <Row>
        <Col :xs="2" :sm="4" :md="6" :lg="6">
          <div class="demo-avatar">
            <Avatar :src="guideData.avataUrl" style="width: 200px;height: 200px"/>
          </div>
        </Col>
        <Col :xs="2" :sm="4" :md="6" :lg="18">
          <p>姓名：{{guideData.name}}</p>
          <p>身份证号码：{{guideData.idcard}}</p>
          <p>出生日期：{{birthDay}}</p>
          <p>性别：{{sex}}</p>
          <p>年龄：{{guideData.age}}</p>
          <p>电话：{{guideData.phone}}</p>
        </Col>
      </Row>
      <div style="margin-top: 20px">
        <p>导游服务地址：{{guideData.location}}</p>
        <p>导游特色：{{guideData.styleKey}}</p>
        <p>擅长语言：{{guideData.language}}</p>
        <Divider/>
        <div><b>导游描述：</b></div>
        <div v-html="guideData.description"></div>
      </div>
    </Card>
  </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "guideDataComp",
        props: {
            guideData: {}
        },
        computed: {
            birthDay() {
                if (this.guideData.birthDate) {
                    return moment(this.guideData.birthDate).format('YYYY-MM-DD')
                }
            },
            sex() {
                if (this.guideData.sex === 'M') {
                    return '男'
                }
                if (this.guideData.sex === 'F') {
                    return '女'
                }
            },
        },
        methods: {
            loadAllData() {

            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
