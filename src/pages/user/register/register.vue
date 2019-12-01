<template>
  <div class="content-guest-body">
    <Card>
      <p slot="title">注册</p>
      <Form>
        <FormItem v-show="showErr">
          <Alert type="error" show-icon>{{errMsg}}</Alert>
        </FormItem>
        <FormItem label="用户名">
          <Input v-model="loginName"/>
        </FormItem>
        <FormItem label="密码">
          <Input type="password" v-model="password"/>
        </FormItem>
        <FormItem label="确认密码">
          <Input type="password" v-model="password2"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="onRegister">注册</Button>
          <Button type="text" @click="onLogin">登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
  import {apiRegister} from "@/api/api";

  export default {
    name: "register",
    data() {
      return {
        loginName: '',
        password: '',
        password2: '',
        showErr: false,
        errMsg: ''
      }
    },
    methods: {
      onLogin() {
        this.$router.push({
          name: 'login'
        })
      },

      onRegister() {
        if (!this.checkError()) {
          return
        }
        apiRegister({
          loginName: this.loginName,
          password: this.password
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$Message.success('注册成功')
            this.$router.push({
              name: 'login'
            })
          } else {
            this.$Message.error('注册失败:' + response.data.code)
          }
        }).catch((error) => {
          this.$Message.error('注册失败')
        })
      },

      checkError() {
        if (!this.loginName) {
          this.showErr = '请输入用户名'
          return false
        }
        if (this.password !== this.password2) {
          this.showErr = '两次输入的密码不一致'
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
