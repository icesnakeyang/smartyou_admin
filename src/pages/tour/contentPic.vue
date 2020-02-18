<template>
  <div>
    <div v-if="theStatus"></div>
    <Modal
      v-model="theStatus2"
      :mask-closable="false"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel">
      <TourImg @event1="change($event)"></TourImg>
    </Modal>

  </div>
</template>

<script>
  import TourImg from './TourImg'

  export default {
    name: "contentPic",
    components: {
      TourImg
    },
    data() {
      return {
        theStatus2: false,
        fileName: '',
        fileLogId: ''
      }
    },
    props: {
      modalStatus: {
        type: Boolean,
        require: true
      },
    },
    computed: {
      theStatus() {
        if (this.modalStatus) {
          this.theStatus2 = true
        } else {
          this.theStatus2 = false
        }
      },
    },
    methods: {
      ok() {
        let params = {
          fileName: this.fileName,
          fileLogId: this.fileLogId
        }

        this.$emit('newImg', params)
        this.$emit('updateModalStatus', false)
      },
      cancel() {
        this.$emit('updateModalStatus', false)
      },
      change(data) {
        this.fileName = data.fileName
        this.fileLogId = data.fileLogId
      },
    }
  }
</script>

<style scoped>

</style>
