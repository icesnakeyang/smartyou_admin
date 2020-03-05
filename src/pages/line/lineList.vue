<template>
  <div>
    <Card>
      <Table :columns="col1" :data="lines"></Table>
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
                        title: '标题',
                        key: 'title'
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
                console.log(page)
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
