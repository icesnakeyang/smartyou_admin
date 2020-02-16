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
      <FormItem label="设置logo">
        <LogoImg code="logo"
                 @event1="change($event)"/>
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
      <FormItem>
        <div>
          <div v-html="tourContent">

          </div>
        </div>
        <Button type="primary" @click="modalStatus = true">Display dialog box</Button>

      </FormItem>
      <div>
        <Button type="primary" @click="saveTour">保存</Button>
      </div>
    </Form>

    <content-text :modalStatus="modalStatus"
                  :content="tourContent"
                  @updateContent="updateContent"
                  @updateModalStatus="updateModalStatus"></content-text>
  </div>
</template>

<script>
    import {apiCreateTour} from "../../api/api";
    import LogoImg from './LogoImg'
    import contentText from "./contentText";

    export default {
        name: "newTour",
        components: {
            LogoImg,
            contentText
        },
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
                    theme: '',
                    logoFile: '',
                    logoFileLogId: ''
                },
                uploadList: [],
                defaultList: [],
                visible: false,
                imgName: '',
                tourContent: '',
                modalStatus: false
            }
        },
        computed: {
            token() {
                return this.$store.state.gogo_smartyou_token
            }
        },
        methods: {
            saveTour() {
                apiCreateTour({
                    type: this.tour.type,
                    title: this.tour.title,
                    detail: this.tour.detail,
                    brief: this.tour.brief,
                    price: this.tour.price,
                    specialPrice: this.tour.specialPrice,
                    location: this.tour.location,
                    theme: this.tour.theme,
                    logoFile: this.tour.logoFile,
                    logoFileLogId: this.tour.logoFileLogId
                }).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.success('创建成功')
                    } else {
                        throw new Error('创建失败')
                    }
                }).catch((error) => {
                    this.$Message.error(error)
                })
            },
            change(data) {
                if (data.action === 'edit') {
                    this.tour.logoFile = data.fileName
                    this.tour.logoFileLogId = data.fileLogId
                } else {
                    if (data.action === 'delete') {
                        this.tour.logoFile = null
                        this.tour.logoFileLogId = null
                    }
                }
            },
            updateModalStatus(status) {
                this.modalStatus = status
            },
            updateContent(content) {
                this.tourContent = content
            }
        },
        mounted() {
            // this.uploadList = this.$refs.upload.fileList;
            console.log(this.modalStatus)
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
