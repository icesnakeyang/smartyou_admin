<template>
  <div>
    <Card>

    </Card>

    <Card style="margin-top: 10px">
      <p slot="title">导游列表</p>
      <Table border :columns="col1" :data="guideList">
      </Table>
      <div style="margin-top: 10px">
        <Page :total="total" :current="pageIndex" show-total
              :page-size="pageSize" @on-change="onTablePage"/>
      </div>
    </Card>
  </div>
</template>

<script>
    import GuideListRow from "./guideListRow";
    import {apiListGuide} from "../../api/api";
    import moment from "moment";

    export default {
        name: "guideList",
        components: {
            GuideListRow
        },
        data() {
            return {
                col1: [
                    {
                        title: '注册时间',
                        key: 'createTime',
                        render: (h, params) => {
                            return h('div', [
                                h('span', moment(params.row.createTime).format('YYYY-MM-DD HH:mm'))
                            ])
                        }
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '身份证号码',
                        key: 'idCard'
                    },
                    {
                        title: '服务地址',
                        key: 'location'
                    },
                    {
                        title: '联系电话',
                        key: 'phone'
                    },
                    {
                        title: '订单状态',
                        key: 'status',
                        render:(h, params)=>{
                            return h('div',[
                                h('span', this.showStatus(params.row.status))
                            ])
                        }
                    },
                    {
                        title: '详情',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.btDetail(params.row)
                                        }
                                    }
                                }, '详情')
                            ])
                        }
                    }
                ],
                guideList: [],
                pageIndex:1,
                pageSize:20,
                total:0
            }
        },
        methods: {
            loadAllData() {
                apiListGuide({
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.guideList = response.data.data.guideInfos
                        this.total=response.data.data.total
                    } else {
                        throw new Error(error)
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            showStatus(status){
                if(status==='PENDING'){
                    return '等待审核'
                }
                if(status==='BANNED'){
                    return '已禁止'
                }
                if(status==='ACTIVE'){
                    return '正常'
                }
            },
            onTablePage(page) {
                this.pageIndex = page
                this.loadAllData()
            },
            btDetail(row){
                this.$router.push({
                    name:'guideInfoDetail',
                    params:{
                        guideId:row.guideId
                    }
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
