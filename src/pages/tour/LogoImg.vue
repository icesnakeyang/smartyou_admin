<template>
  <div>
    <div v-if="logoImgUrl" class="demo-upload-list">
      <template v-if="logoImgStatus === 'finished'">
        <img :src="logoImgUrl">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(logoImgUrl)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
        </div>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="https://www.wegou1688.com/tools/tourLogoImgUpload"
      :headers="{token:token}"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "LogoImg",
    data() {
      return {
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        tour: {},
        logoImgUrl: '',
        logoImgId: '',
        logoImgStatus: 'finished'
      }
    },
    props: {
      logoUrlProp: ''
    },
    computed: {
      token() {
        this.logoImgUrl = this.logoUrlProp
        return this.$store.state.gogo_smartyou_token
      }
    },
    methods: {
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove() {
        let params = {
          action: 'delete'
        }
        this.$emit('event1', params)
      },
      handleSuccess(res) {
        let fileName = res.data.filename
        let fielLogId = res.data.fileLogId
        this.imgName = fileName

        let params = {
          fileName: fileName,
          fileLogId: fielLogId,
          action: 'edit'
        }
        this.$emit('event1', params)
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload() {
      }
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
    },
    created() {
      if (this.$route.params.logoFile) {
        this.defaultList = [
          {
            url: this.$route.params.logoFile,
            name: this.$route.params.logoFileLogId
          }
        ]
      } else {
      }
    }
  }
</script>

<style scoped>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>

