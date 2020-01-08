<template>
  <div>
    <MenuItem name="menuDashboard">
      <Icon type="md-document"/>
      控制台
    </MenuItem>
    <Submenu name="menuTrain">
      <template slot="title">
        <Icon type="ios-keypad"></Icon>
        火车票管理
      </template>
      <MenuItem name="menuTrainOrder">订单管理</MenuItem>
    </Submenu>

    <Submenu name="menuAircraft">
      <template slot="title">
        <Icon type="ios-keypad"></Icon>
        飞机票管理
      </template>
      <MenuItem name="menuAirOrder">Option 1</MenuItem>
      <MenuItem name="menuAirRefund">Option 2</MenuItem>
    </Submenu>

    <Submenu name="4">
      <template slot="title">
        <Icon type="ios-analytics"></Icon>
        酒店管理
      </template>
      <MenuItem name="4-1">Option 1</MenuItem>
      <MenuItem name="4-2">Option 2</MenuItem>
    </Submenu>
    <Submenu name="5">
      <template slot="title">
        <Icon type="ios-analytics"></Icon>
        旅游线路
      </template>
      <MenuItem name="menuTourDashboard">控制台</MenuItem>
      <MenuItem name="menuTourList">旅游线路列表</MenuItem>
      <MenuItem name="menuNewTour">创建旅游线路</MenuItem>
    </Submenu>
    <Submenu name="7">
      <template slot="title">
        <Icon type="ios-analytics"></Icon>
        导游管理
      </template>
      <MenuItem name="7-1">Option 1</MenuItem>
      <MenuItem name="7-2">Option 2</MenuItem>
    </Submenu>
    <Submenu name="8">
      <template slot="title">
        <Icon type="ios-analytics"></Icon>
        用户攻略
      </template>
      <MenuItem name="8-1">Option 1</MenuItem>
      <MenuItem name="8-2">Option 2</MenuItem>
    </Submenu>
    <Submenu name="9">
      <template slot="title">
        <Icon type="ios-analytics"></Icon>
        用户管理
      </template>
      <MenuItem name="menuUserList">注册用户</MenuItem>
      <MenuItem name="8-2">Option 2</MenuItem>
    </Submenu>
    <Submenu name="menuMember">
      <template slot="title">
        <Icon type="ios-analytics"></Icon>
        会员管理
      </template>
      <MenuItem name="menuListMemberType">会员类型</MenuItem>
      <MenuItem name="menuCreateMemberType">创建会员类型</MenuItem>
    </Submenu>
    <Submenu name="menuMaintain">
      <template slot="title">
        <Icon type="md-settings"/>
        系统维护
      </template>
      <MenuItem name="menuMaintainTrainOrder">火车票订单维护</MenuItem>
    </Submenu>
  </div>
</template>

<script>
    export default {
        name: "adminSider"
    }
</script>

<style scoped>

</style>
