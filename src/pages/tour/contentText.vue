<template>
  <div>
    <div v-if="theStatus"></div>
    <div v-if="theContent"></div>

    <Modal
      v-model="theStatus2"
      :mask-closable="false"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel">
      <quill-editor v-model="content2"
                    :options="editorOption"
                    style="width:340px"
      ></quill-editor>
    </Modal>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'

  export default {
    name: "contentText",
    components: {
      quillEditor
    },
    data() {
      return {
        theStatus2: this.modalStatus,
        content2: '',
        editorOption: {
          modules: {
            // toolbar: [
            // ['bold', 'italic', 'underline', 'strike'],
            // ['image', 'video']
            // ],
            imageResize: true
          }
        }
      }
    },
    props: {
      modalStatus: {
        type: Boolean,
        require: true
      },
      content: ''
    },
    computed: {
      theStatus() {
        console.log(this.modalStatus)
        if (this.modalStatus) {
          this.theStatus2 = true
        } else {
          this.theStatus2 = false
        }
      },
      theContent() {
        console.log(this.content)
        this.content2 = this.content
      }
    },
    methods: {
      ok() {
        console.log(this.content)
        console.log(this.content2)
        this.$emit('updateModalStatus', false)
        if (this.content) {
          console.log('edit')
          //如果有传入的数据，就是修改
          this.$emit('editContent', this.content2)
        } else {
          console.log('new')
          //如果没有传入数据，就是新增
          this.$emit('newContent', this.content2)
        }
      },
      cancel() {
        this.$emit('updateModalStatus', false)
      }
    }
  }
</script>

<style scoped>

</style>
