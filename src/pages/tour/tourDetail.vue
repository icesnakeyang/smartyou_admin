<template>
  <div>
    <EditTourComponent :tourProps="tour" :editStatus="true" @onSave="saveTour"></EditTourComponent>
  </div>
</template>

<script>
  import {apiGetTourDetail} from "@/api/api";
  import {apiUpdateTour} from "../../api/api";
  import EditTourComponent from './editTourComponent'

  export default {
    name: "tourDetail",
    components: {
      EditTourComponent
    },
    data() {
      return {
        tour: {}
      }
    },
    methods: {
      /**
       * 读取数据库数据
       */
      loadAllData() {
        apiGetTourDetail({
          tourId: this.$route.params.tourId
        }).then((response) => {
          if (response.data.code === 0) {
            this.tour = response.data.data.tour
          } else {
            throw new Error('读取数据失败')
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },

      /**
       * 保存编辑的旅游线路
       */
      saveTour(params) {
        this.$Modal.confirm({
          title: '确定保存修改吗？',
          onOk: () => {
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
          onCancel: () => {

          }
        });
      },
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>

</style>
