<template>
  <div class="content-guest-body">
    <Card>
      <p slot="title">登录</p>
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
        <FormItem>
          <Button type="primary" @click="onLogin">登录</Button>
          <Button type="text" @click="onRegister">注册</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
  import {apiLogin} from "@/api/api";

  export default {
    name: "login",
    data() {
      return {
        showErr: '',
        loginName: '',
        password: '',
        errMsg: ''
      }
    },
    methods: {
      onLogin() {
        apiLogin({
          loginName: this.loginName,
          password: this.password
        }).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success('登录成功')
            this.$store.dispatch('saveToken', response.data.data.adminInfo.token)
            this.$store.dispatch('saveUsername', response.data.data.adminInfo.username)
            this.$router.push({
              name: 'dashboard'
            })
          } else {
            this.$Message.error('登录失败')
          }
        }).catch((error) => {
          this.$Message.error('登录失败')
        })
      },
      onRegister() {
        this.$router.push({
          name: 'register'
        })
      }
    }
  }
</script>

<style scoped>

</style>
