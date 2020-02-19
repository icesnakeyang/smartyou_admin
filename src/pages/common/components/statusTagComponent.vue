<template>
  <div>
    <div v-if="isTable"></div>
    <div>
      <div v-if="isActive">
        <Tag color="success">已发布</Tag>
      </div>
      <div v-if="isReject">
        <Tag color="error">已审核拒绝</Tag>
      </div>
      <div v-if="isPending">
        <Tag color="warning">等待审核</Tag>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "statusTagComponent",
        data() {
            return {
                status: '',
                isPending: false,
                isActive: false,
                isReject: false
            }
        },
        props: {
            theStatus: '',
            mode: false
        },
        computed: {
            isTable() {
                if (this.theStatus) {
                    if (this.theStatus === 'ACTIVE') {
                        this.isActive = true
                    } else {
                        if (this.theStatus === 'REJECT') {
                            this.isReject = true
                        }
                        return 'ok'
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
