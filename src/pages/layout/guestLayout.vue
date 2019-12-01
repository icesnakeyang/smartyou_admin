<template>
  <Layout>
    <Header>
      <router-view name="header"></router-view>
    </Header>
    <Content>
      <router-view name="content"></router-view>
    </Content>
    <Footer>
      <router-view name="footer"></router-view>
    </Footer>
  </Layout>
</template>

<script>
  export default {
    name: "guestLayout"
  }
</script>

<style scoped>

</style>
