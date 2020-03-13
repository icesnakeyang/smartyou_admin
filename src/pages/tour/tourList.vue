<template>
  <div>
    <Card>
      <p slot="title">查询条件</p>
      <Form :label-width="100">
        <FormItem label="线路名称">
          <Input type="text"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">查询</Button>
        </FormItem>
      </Form>
    </Card>
    <Card style="margin-top: 20px">
      <p slot="title">旅游线路</p>
      <Table border :columns="colListTour" :data="tourList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.title }}</strong>
        </template>
        <template slot-scope="{row}" slot="status">
          <StatusTagComponent :the-status="row.status"></StatusTagComponent>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="btDetail(row)">详情</Button>
        </template>
      </Table>
      <div style="margin-top: 20px">
        <Page :total="totalTour" :page-size="pageSize" @on-change="changePage"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
    import {apiListSpecialPriceTour, apiListTour} from "../../api/api";
    import StatusTagComponent from '../common/components/statusTagComponent'
    import moment from "moment";

    export default {
        name: "tourList",
        components: {
            StatusTagComponent
        },
        data() {
            return {
                tourList: [],
                colListTour: [
                    {
                        title: '线路名称',
                        slot: 'name'
                    },
                    {
                        title: '简介',
                        key: 'brief'
                    },
                    {
                        title: '状态',
                        slot: 'status'
                    },
                    {
                        title: '发布时间',
                        render:(h, params)=> {
                          return h('div', moment(params.createTime).format('YYYY-MM-DD HH:mm'))
                        }
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                pageIndex: 1,
                pageSize: 10,
                totalTour: 0
            }
        },
        methods: {
            loadAllData() {
                let params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
                apiListTour(params).then((response) => {
                    if (response.data.code === 0) {
                        this.tourList = response.data.data.tours
                        this.totalTour = response.data.data.totalTour
                    } else {
                        throw new Error('读取数据错误')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            btDetail(row) {
                this.$router.push({
                    name: 'tourDetail',
                    params: {
                        tourId: row.tourId
                    }
                })
            },
            remove(index) {
                this.data6.splice(index, 1);
            },
            changePage(page) {
                this.pageIndex = page
                this.loadAllData()
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
