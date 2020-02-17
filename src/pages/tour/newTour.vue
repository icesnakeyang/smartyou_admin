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
        <div v-for="(item, index) in tourContentList">
          <Divider/>
          <Row class="content_row_view">
            <Col :xs="12" :sm="12" :md="12" :lg="18">
              <div v-if="item.fileName">
                <img :src="item.fileName" width="100%">
              </div>
              <div v-else="item.filename">
                <div v-html="item">
                </div>
              </div>
            </Col>
            <Col :xs="12" :sm="12" :md="12" :lg="6">
              <div>
                <div v-if="item.fileName">
                  <Button type="error" @click="deletePic(item, index)">删除图片</Button>
                </div>
                <div v-else="item.fileName">
                  <Button type="primary" @click="modalEditText(item, index)">修改</Button>
                  <Button type="primary" @click="modalDeleteRow(index)">删除</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Button type="primary" @click="modalNewText">添加文字</Button>
        <Button type="primary" @click="modalPicNew">添加图片</Button>

      </FormItem>
      <div>
        <Button type="primary" @click="saveTour">保存</Button>
      </div>
    </Form>

    <content-text :modalStatus="modalStatusNewText"
                  :content="tourContent"
                  @newContent="newContent"
                  @updateModalStatus="updateModalStatus"></content-text>

    <content-text :modalStatus="modalStatusEditText"
                  :content="tourContent"
                  @editContent="editContent"
                  @updateModalStatus="updateModalStatus"></content-text>

    <content-pic :modalStatus="modalStatusPicNew"
                 @newImg="newImg"
                 @updateModalStatus="updateModalStatus"></content-pic>
  </div>
</template>

<script>
  import {apiCreateTour} from "../../api/api";
  import LogoImg from './LogoImg'
  import contentText from "./contentText";
  import contentPic from './contentPic'

  export default {
    name: "newTour",
    components: {
      LogoImg,
      contentText,
      contentPic
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
        tourContent: {},
        tourContentList: [],
        modalStatus: false,
        modalStatusNewText: false,
        modalStatusEditText: false,
        indexContent: 0,
        modalStatusPicNew: false
      }
    },
    computed: {
      token() {
        return this.$store.state.gogo_smartyou_token
      }
    },
    methods: {
      saveTour() {
        console.log(this.tourContentList)
        let params = {
          type: this.tour.type,
          title: this.tour.title,
          brief: this.tour.brief,
          price: this.tour.price,
          specialPrice: this.tour.specialPrice,
          location: this.tour.location,
          theme: this.tour.theme,
          logoFile: this.tour.logoFile,
          logoFileLogId: this.tour.logoFileLogId,
          tourContentList: this.tourContentList
        }
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
        console.log('set status to false')
        this.modalStatusNewText = status
        this.modalStatusEditText = status
        this.modalStatusPicNew = status
      },
      newContent(content) {
        console.log('parent new')
        this.tourContent = content
        this.tourContentList.push(content)
        console.log(this.tourContentList)
      },
      editContent(content) {
        console.log('parent edit')
        this.tourContent = content
        console.log(this.tourContent)
        console.log(this.tourContentList)
        console.log(this.indexContent)
        this.tourContentList.splice(this.indexContent, 1, this.tourContent)
      },
      modalNewText() {
        this.modalStatusNewText = true
        this.tourContent = ''
      },
      modalEditText(item, index) {
        console.log(item)
        this.tourContent = item
        this.indexContent = index
        this.modalStatusEditText = true
      },

      modalPicNew() {
        this.modalStatusPicNew = true
        console.log(this.modalStatusPicNew)
      },

      modalDeleteRow(index) {
        this.$Modal.confirm({
          title: '确认删除？',
          okText: '删除',
          cancelText: '取消',
          onOk: () => {
            this.tourContentList.splice(index, 1)
          }
        })
      },
      newImg(params) {
        console.log(params)
        this.tourContentList.push({
          fileName: params.fileName,
          fileLogId: params.fileLogId
        })
        console.log(this.tourContentList)
      },
      deletePic(item, index) {
        console.log(item)
        console.log(index)
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

  .content_row_view {
    width: 500px;
  }
</style>
