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
          <Menu theme="dark" width="auto" @on-select="onMenuSelect">
            <router-view name="sider"></router-view>
          </Menu>
        </Sider>
      </div>
      <Layout :style="{padding: '24px 24px 24px'}">
        <!--        <div class="content-guest-view">-->
        <div>
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
        if (this.$store.state.gogo_smartyou_token) {
          return true
        }
        return false
      }
    },
    methods: {
      onMenuSelect(name) {
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
        if (name === 'menuDashboard') {
          this.$router.push({
            name: 'dashboard'
          })
        }
        if (name === 'menuTrainOrder') {
          this.$router.push({
            name: 'trainBookingList'
          })
        }
        if (name === 'menuTrainSettings') {
          this.$router.push({
            name: 'trainSettings'
          })
        }
        if (name === 'menuUserList') {
          this.$router.push({
            name: 'userList'
          })
        }
        if (name === 'menuTourDashboard') {
          this.$router.push({
            name: 'TourDashboard'
          })
        }
        if (name === 'menuTourList') {
          this.$router.push({
            name: 'tourList'
          })
        }
        if (name === 'menuNewTour') {
          this.$router.push({
            name: 'newTour'
          })
        }
        if (name === 'menuListMemberType') {
          this.$router.push({
            name: 'memberTypeList'
          })
        }
        if (name === 'menuCreateMemberType') {
          this.$router.push({
            name: 'createMemberType'
          })
        }
        if (name === 'menuMaintainTrainOrder') {
          this.$router.push({
            name: 'trainOrderMaintain'
          })
        }
        if (name === 'menuRentVehicleOrder') {
          this.$router.push(({
            name: 'rentVehicleOrderList'
          }))
        }
        if (name === 'menuTourOrderList') {
          this.$router.push({
            name: 'tourOrderList'
          })
        }
        if (name === 'menuGuideInfoList') {
          this.$router.push({
            name: 'guideInfoList'
          })
        }
        if (name === 'menuGuideLogListApply') {
          this.$router.push({
            name: 'guideLogListApply'
          })
        }if (name === 'menuGuideLogListPotential') {
          this.$router.push({
            name: 'guideLogListPotential'
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
