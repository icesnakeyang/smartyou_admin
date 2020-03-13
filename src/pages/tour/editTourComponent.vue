<template>
  <div>
    <div v-if="isEdit"></div>
    <Form>
      <FormItem label="类型">
        <Input type="text" v-model="tour.type"></Input>
      </FormItem>
      <FormItem label="标题">
        <Input type="text" v-model="tour.title"></Input>
      </FormItem>
      <FormItem label="Logo">
        <LogoImg :logoUrlProp="tour.logoImgUrl"
                 @event1="change($event)"/>
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
      </FormItem>
      <div v-for="(item, index) in tour.tourContents">
        <Divider/>
        <Row class="content_row_view">
          <Col :xs="12" :sm="12" :md="12" :lg="18">
            <div v-if="item.imgId">
              <img :src="item.imgUrl" width="100%">
            </div>
            <div v-if="item.detail">
              <div v-html="item.detail"></div>
            </div>
          </Col>
          <Col :xs="12" :sm="12" :md="12" :lg="6">
            <div>
              <div v-if="item.imgUrl">
                <Button type="error" @click="modalDeleteRow(index)">删除图片</Button>
              </div>
              <div v-if="item.detail">
                <Button type="info" @click="modalEditText(item, index)">修改</Button>
                <Button type="error" @click="modalDeleteRow(index)">删除</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <FormItem>
        <div>
          <Button type="info" @click="modalNewText">添加文字</Button>
          <Button type="warning" @click="modalPicNew">添加图片</Button>
        </div>
      </FormItem>


      <content-text :modalStatus="modalStatusNewText"
                    :content="tourContent.detail"
                    @newContent="newContent"
                    @updateModalStatus="updateModalStatus"></content-text>

      <content-text :modalStatus="modalStatusEditText"
                    :content="tourContent.detail"
                    @editContent="editContent"
                    @updateModalStatus="updateModalStatus"></content-text>

      <content-pic :modalStatus="modalStatusPicNew"
                   @newImg="newImg"
                   @updateModalStatus="updateModalStatus"></content-pic>
      <Divider/>
      <Button type="primary" @click="btSave">保存</Button>
    </Form>
  </div>
</template>

<script>
  import LogoImg from './LogoImg'
  import ContentPic from './contentPic'
  import ContentText from './contentText'

  export default {
    name: "editTourComponent",
    components: {
      ContentText,
      ContentPic,
      LogoImg
    },
    data() {
      return {
        tour: {},
        modalStatusNewText: false,
        modalStatusEditText: false,
        modalStatusPicNew: false,
        tourContent: {},
      }
    },
    props: {
      tourProps: {},
      editStatus: false
    },
    computed: {
      isEdit() {
        this.tour = this.tourProps
        if (this.editStatus) {
          return true
        }
        return false
      }
    },
    methods: {
      /**
       * 打开新增文本框
       */
      modalNewText() {
        this.modalStatusNewText = true
        this.tourContent = {
          detail: ''
        }
      },

      /**
       * 打开上传图片的对话框
       */
      modalPicNew() {
        this.modalStatusPicNew = true
      },

      /**
       * 新建文字框的保存回调
       * 把新增加的文字内容添加到tour.tourContents
       * @param content
       */
      newContent(content) {
        if(!this.tour.tourContents){
          this.tour.tourContents=[]
        }
        this.tourContent = {
          detail: content
        }
        this.tour.tourContents.push(this.tourContent)

      },

      /**
       * 删除一个内容
       * @param index
       */
      modalDeleteRow(index) {
        this.$Modal.confirm({
          title: '确认删除？',
          okText: '删除',
          cancelText: '取消',
          onOk: () => {
            this.tour.tourContents.splice(index, 1)
          }
        })
      },

      /**
       * 设置updateModalStatus，隐藏modal框
       * @param status
       */
      updateModalStatus(status) {
        this.modalStatusNewText = status
        this.modalStatusEditText = status
        this.modalStatusPicNew = status
      },

      /**
       * 打开编辑文本框
       * 把内容和数组序号传入到组件
       * @param item
       * @param index
       */
      modalEditText(item, index) {
        this.tourContent = item
        this.indexContent = index
        this.modalStatusEditText = true
      },

      /**
       * 编辑文字框保存的回调
       * 把编辑好的内容修改tour.tourContents里的元素
       * @param content
       */
      editContent(content) {
        this.tourContent = {
          detail: content
        }
        this.tour.tourContents.splice(this.indexContent, 1, this.tourContent)
      },

      /**
       * 新增图片的回调
       * 把新增图片保存到tour.tourContents里
       * @param params
       */
      newImg(params) {
        if(!this.tour.tourContents){
          this.tour.tourContents=[]
        }
        this.tour.tourContents.push({
          imgUrl: params.fileName,
          imgId: params.fileLogId
        })
      },

      deletePic(item, index) {
      },

      btSave() {
        this.$emit('onSave', this.tour)
      },

      /**
       * 修改logo
       * @param data
       */
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
      }
    }
  }
</script>

<style scoped>
  .content_row_view {
    width: 500px;
  }
</style>
