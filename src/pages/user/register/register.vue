<template>
  <div class="content-guest-body">
    <Card>
      <p slot="title">注册</p>
      <Form>
        <FormItem v-show="showErr">
          <Alert type="error" show-icon>{{errMsg}}</Alert>
        </FormItem>
        <FormItem label="用户名">
          <Input v-model="username"/>
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
  export default {
    name: "register",
    data() {
      return {
        username: '',
        password: '',
        showErr: false,
        errMsg: ''
      }
    },
    methods: {
      onLogin() {

      },
      onRegister() {

      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/gogoStyle.css";
</style>
