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
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="btDetail(row)">详情</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
    import {apiListSpecialPriceTour} from "../../api/api";

    export default {
        name: "tourList",
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
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '发布时间',
                        key: 'publishTime'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],

            }
        },
        methods: {
            loadAllData() {
                apiListSpecialPriceTour({
                    pageIndex: 1,
                    pageSize: 5
                }).then((response) => {
                    if (response.data.code === 0) {
                        this.tourList = response.data.data.specialTourList
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
                        tourId: row.tourId,
                        logoFile: row.logoFile,
                        logoFileLogId: row.logoFileLogId
                    }
                })
            },
            remove(index) {
                this.data6.splice(index, 1);
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
