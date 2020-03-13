<template>
  <div>
    <Card>
      <Table :columns="col1" :data="lines">
        <template slot-scope="{row}" slot="logo">
          <img :src="row.logoImgUrl" style="width: 100px;height: 100px;">
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="showDetail(row)">详情</Button>
        </template>
      </Table>
      <Page style="margin:20px" :total="totalLine" @on-change="pageChange"></Page>
    </Card>
  </div>
</template>

<script>
  import {apiListLine} from "../../api/api";

  export default {
    name: "lineList",
    data() {
      return {
        lines: [],
        pageIndex: 1,
        pageSize: 10,
        totalLine: 0,
        col1: [
          {
            title: 'Logo',
            slot: 'logo'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '类型',
            key: 'type',
          },
          {
            title: '主题',
            key: 'theme'
          },
          {
            title: '原价',
            key: 'price'
          },
          {
            title: '特价',
            key: 'specialPrice'
          },
          {
            title: '详情',
            slot: 'action'
          }
        ]
      }
    },
    methods: {
      loadAllData() {
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        apiListLine(params).then((response) => {
          if (response.data.code === 0) {
            this.lines = response.data.data.lines
            this.totalLine = response.data.data.totalLine
          } else {
            this.$Message.error(response.data.code)
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },

      pageChange(page) {
      },

      showDetail(row) {
        this.$router.push({
          name: 'lineDetail',
          params: {
            lineId: row.lineId
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
