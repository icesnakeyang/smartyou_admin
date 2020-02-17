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
      </FormItem>
      <div v-for="(item, index) in tour.tourContents">
        <Row class="content_row_view">
          <Col :xs="12" :sm="12" :md="12" :lg="18">
            <div v-if="item.imgId">
              <img :src="item.imgUrl" width="100%">
            </div>
            <div v-else="item.imgId">
              <div v-html="item.detail"></div>
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

      <FormItem>
        <div>
          <quill-editor v-model="tour.detail"
                        :options="editorOption"
                        aria-readonly="true"
                        style="width:340px"
          ></quill-editor>
        </div>
      </FormItem>

      <FormItem>
        <Input type="text" v-model="tour.tourId"></Input>
      </FormItem>

      <Button type="primary" @click="saveTour">保存</Button>
    </Form>
    <LogoImg code="logo"
             @event1="change($event)"/>
  </div>
</template>

<script>
  import {apiGetTourDetail} from "@/api/api";
  import LogoImg from "./LogoImg";
  import {apiUpdateTour} from "../../api/api";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.bubble.css'
  import 'quill/dist/quill.snow.css'
  import {imageResize} from 'quill-image-resize-module'

  export default {
    name: "tourDetail",
    components: {
      LogoImg,
      quillEditor
    },
    data() {
      return {
        tour: {},
        editorOption: {
          modules: {
            // toolbar: [
            // ['bold', 'italic', 'underline', 'strike'],
            // ['image', 'video']
            // ],
            imageResize: true,
          }
        }
      }
    },
    methods: {
      loadAllData() {
        apiGetTourDetail({
          tourId: this.$route.params.tourId
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.tour = response.data.data.tour
          } else {
            throw new Error('读取数据失败')
          }
        }).catch((error) => {
          this.$Message.error(error)
        })
      },
      saveTour() {
        let params = {
          tourId: this.tour.tourId,
          type: this.tour.type,
          title: this.tour.title,
          detail: this.tour.detail,
          brief: this.tour.brief,
          price: this.tour.price,
          specialPrice: this.tour.specialPrice,
          location: this.tour.location,
          logoFile: this.tour.logoFile,
          logoFileLogId: this.tour.logoFileLogId,
          theme: this.tour.theme
        }

        apiUpdateTour(params).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success('保存成功')
          } else {
            throw new Error('保存失败')
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
    },
    mounted() {
      this.loadAllData()
    }
  }
</script>

<style scoped>
  .content_row_view {
    width: 500px;
  }
</style>
