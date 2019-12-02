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
      <MenuGroup title="Item 1">
        <MenuItem name="menuLogin">登录</MenuItem>
        <MenuItem name="menuRegister">注册</MenuItem>
      </MenuGroup>
      <MenuGroup title="Item 2">
        <MenuItem name="1-3">退出登录</MenuItem>
        <MenuItem name="1-4">Option 4</MenuItem>
      </MenuGroup>
    </Submenu>
  </div>
</template>

<script>
    export default {
        name: "baseHeader",
        computed: {
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
