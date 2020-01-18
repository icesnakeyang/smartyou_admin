<template>
  <div>
    <Form>
      <FormItem label="类型">
        <Input type="text" v-model="tour.type"></Input>
      </FormItem>
      <FormItem label="标题">
        <Input type="text" v-model="tour.title"></Input>
      </FormItem>
      <FormItem label="主题">
        <Input type="text" v-model="tour.theme"></Input>
      </FormItem>
      <FormItem label="简要说明">
        <Input type="text" v-model="tour.brief"></Input>
      </FormItem>
      <FormItem label="地理位置关键字">
        <Input type="text" v-model="tour.location"></Input>
      </FormItem>
      <FormItem label="定价">
        <Input type="text" v-model="tour.price"></Input>
      </FormItem>
      <FormItem label="特价">
        <Input type="text" v-model="tour.specialPrice"></Input>
      </FormItem>
      <FormItem label="详细内容">
        <Input type="textarea" :maxlength="100" :show-word-limit="true" v-model="tour.detail"></Input>
      </FormItem>
      <div>
        <div class="demo-upload-list" v-for="item in uploadList">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="1024"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          type="drag"
          action="//www.wegou1688.com:8090/tools/tourLogoImgUpload"
          :headers="{token:token}"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
          <img :src="'https://www.wegou1688.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
      </div>
      <div>
        <Button type="primary" @click="saveTour">保存</Button>
      </div>
    </Form>
  </div>
</template>

<script>
    import {apiCreateTour} from "../../api/api";

    export default {
        name: "newTour",
        data() {
            return {
                tour: {
                    type: '',
                    title: '',
                    brief: '',
                    location: '',
                    price: '',
                    specialPrice: '',
                    detail: '',
                    theme:'',
                    logoFile:'',
                    logoFileLogId:''
                },
                uploadList: [],
                defaultList: [],
                visible: false,
                imgName: ''
            }
        },
        computed: {
            token() {
                return this.$store.state.gogo_smartyou_token
            }
        },
        methods: {
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess(res) {
                let fileName = res.data.fileLog.filename
                let fielLogId = res.data.fileLog.fileLogId
                console.log(fileName)
                console.log(fielLogId)
                this.imgName=fileName
                this.tour.logoFile=fileName
                this.tour.logoFileLogId=fielLogId


                console.log(this.tour)
            },
            handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件《' + file.name + '》格式不正确，请使用jpg或者png格式的文件。'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '文件大小超限',
                    desc: '文件《' + file.name + '》太大了，请不要上传超过1M的文件。'
                });
            },
            saveTour() {
                console.log(this.tour)
                apiCreateTour({
                    type: this.tour.type,
                    title: this.tour.title,
                    detail: this.tour.detail,
                    brief: this.tour.brief,
                    price: this.tour.price,
                    specialPrice: this.tour.specialPrice,
                    location: this.tour.location,
                    theme:this.tour.theme,
                    logoFile:this.tour.logoFile,
                    logoFileLogId:this.tour.logoFileLogId
                }).then((response) => {
                    console.log(response)
                    if (response.data.code === 0) {
                        this.$Message.success('创建成功')
                    } else {
                        throw new Error('创建失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            }
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
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
