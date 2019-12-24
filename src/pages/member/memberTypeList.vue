<template>
  <div>
    <member-type-list-row style="margin-top: 20px"
                          v-for="(item, index) in memberTypeList"
                          :key="index"
                          :row="item">
    </member-type-list-row>
  </div>
</template>

<script>
  import {apiListMemberType} from "../../api/api";
  import memberTypeListRow from './memberTypeListRow'

  export default {
    name: "memberTypeList",
    components: {
      memberTypeListRow
    },
    data() {
      return {
        memberTypeList: []
      }
    },
    methods: {
      loadAllData() {
        apiListMemberType({}).then((response) => {
          if (response.data.code === 0) {
            this.memberTypeList = response.data.data.memberTypes;
          } else {
            this.$Message.error('读取会员配置信息失败')
          }
        }).catch((error) => {
          this.$Message.error('读取会员配置信息失败')
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
