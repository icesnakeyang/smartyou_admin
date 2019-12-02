<template>
  <div>
    <MenuItem name="1">
      <Icon type="ios-navigate"></Icon>
      Item 1
    </MenuItem>
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-analytics"></Icon>
        {{userName}}
      </template>
      <div v-if="isLogin">
          <MenuItem name="menuSignOut">退出登录</MenuItem>
      </div>
      <div v-else="isLogin">
          <MenuItem name="menuLogin">登录</MenuItem>
          <MenuItem name="menuRegister">注册</MenuItem>
      </div>
    </Submenu>
  </div>
</template>

<script>
  export default {
    name: "baseHeader",
    computed: {
      isLogin() {
        if (this.$store.state.gogo_smartyou_token) {
          return true
        }
        return false
      },
      userName() {
        if (this.$store.state.gogo_smartyou_username) {
          return this.$store.state.gogo_smartyou_username
        }
        return '未登录'
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
