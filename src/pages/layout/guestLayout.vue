<template>
  <Layout style="min-height: 100vh">
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1" @on-select="onMenuSelect">
        <!--      <div class="layout-logo"></div>-->
        <Row>
          <Col :xs="6" :sm="4" :md="4" :lg="4">
            <div class="gogo-title">智游天下</div>
          </Col>
          <Col :xs="18" :sm="20" :md="20" :lg="20">
            <div class="header-right-view">
              <router-view name="header"></router-view>
            </div>
          </Col>
        </Row>
      </Menu>
    </Header>
    <Layout>
      <div v-if="isLogin">
        <Sider>
          <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </template>
              <MenuItem name="1-1">Option 1</MenuItem>
              <MenuItem name="1-2">Option 2</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
      </div>
      <Layout :style="{padding: '24px 24px 24px'}">
        <div class="content-guest-view">
          <router-view name="content"></router-view>
        </div>
      </Layout>
    </Layout>
    <Footer class="gogo-footer-view">
      <router-view name="footer"></router-view>
    </Footer>
  </Layout>
</template>

<script>
  export default {
    name: "guestLayout",
    computed: {
      isLogin() {
        console.log(this.$store.state)
        if (this.$store.state.gogo_smartyou_token) {
          console.log('login')
          return true
        }
        console.log('not login')
        return false
      }
    },
    methods: {
      onMenuSelect(name) {
        console.log(name)
        if (name === 'menuLogin') {
          this.$router.push({
            name: 'login'
          })
        }
        if (name === 'menuRegister') {
          this.$router.push({
            name: 'register'
          })
        }
        if (name === 'menuSignOut') {
          this.$store.dispatch('signOut')
          this.$router.push({
            path: '/'
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/gogoStyle.css";

  .header-right-view {
    display: flex;
    justify-content: flex-end;
  }
</style>
