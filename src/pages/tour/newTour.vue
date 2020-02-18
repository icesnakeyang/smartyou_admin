<template>
  <div>
    <EditTourComponent :tourProps="tour" :editStatus="false" @onSave="saveTour"></EditTourComponent>
  </div>
</template>

<script>
  import {apiCreateTour} from "../../api/api";
  import EditTourComponent from './editTourComponent'

  export default {
    name: "newTour",
    components: {
      EditTourComponent
    },
    data() {
      return {
        tour: {
          tourContents:[],
          logoFile:''
        }
      }
    },
    methods: {
      saveTour(params) {
        this.$Modal.confirm({
          title: '确定保存修改吗？',
          onOk: () => {
            apiCreateTour(params).then((response) => {
              if (response.data.code === 0) {
                this.$Message.success('创建成功')
              } else {
                throw new Error('创建失败')
              }
            }).catch((error) => {
              this.$Message.error(error)
            })
          },
          onCancel: () => {
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
