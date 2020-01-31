<template>
<div>
  <Card>
    <p slot="title">导游详细信息</p>
    <p>姓名：{{guideInfo.name}}</p>
    <p>注册时间：{{registerTime}}</p>
    <p>身份证号码：{{guideInfo.idCard}}</p>
    <p>性别：{{sex}}</p>
    <p>年龄：{{guideInfo.age}}</p>
    <p>电话：{{guideInfo.phone}}</p>
    <p>导游服务地址：{{guideInfo.location}}</p>
    <p>导游描述：{{guideInfo.description}}</p>
    <p>当前状态：{{status}}</p>
    <p>出生日期：{{birthDay}}</p>
    <p>管理员处理时间：{{processTime}}</p>
    <p>管理员处理说明：{{guideInfo.processRemark}}</p>
  </Card>

  <div style="margin-top: 20px">

      <Button type="primary">通过</Button>
      <Button type="error">拒绝</Button>

  </div>
</div>
</template>

<script>
    import {apiGetGuide} from "../../api/api";
    import moment from "moment";

    export default {
        name: "guideInfoDetail",
        data(){
            return{
                guideInfo:{}
            }
        },
        computed:{
            registerTime(){
                if(this.guideInfo.createTime){
                    return moment(this.guideInfo.createTime).format('YYYY-MM-DD HH:mm')
                }
            },
            sex(){
                if(this.guideInfo.sex==='M'){
                    return '男'
                }
                if(this.guideInfo.sex==='F'){
                    return '女'
                }
            },
            birthDay(){
                if(this.guideInfo.birthDate){
                    return moment(this.guideInfo.birthDate).format('YYYY-MM-DD')
                }
            },
            status(){
                if(this.guideInfo.status==='PENDING'){
                    return '等待审核'
                }
            },
            processTime(){
                if(this.guideInfo.processTime){
                    return moment(this.guideInfo.processTime).format('YYYY-MM-DD HH:mm')
                }else{
                    return '未处理'
                }
            }
        },
        methods:{
            loadAllData(){
                let params={
                    guideId:this.$route.params.guideId
                }
                apiGetGuide(params).then((response)=>{
                    console.log(response)
                    if(response.data.code===0){
                        this.guideInfo=response.data.data.guideInfo
                    }else{
                        throw new Error('读取数据库错误')
                    }
                }).catch((error)=>{
                    this.$Message.error(error)
                })
            }
        },
        mounted() {
            console.log(this.$route.params.guideId)
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
