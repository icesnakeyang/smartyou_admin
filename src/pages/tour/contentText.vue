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
                this.content2 = this.content
            }
        },
        methods: {
            ok() {
                this.$emit('updateModalStatus', false)
                this.$emit('updateContent', this.content2)
            },
            cancel() {
                this.$emit('updateModalStatus', false)
            }
        }
    }
</script>

<style scoped>

</style>
