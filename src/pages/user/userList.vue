<template>
  <div>
    <Table border :columns="columns" :data="users">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.nickName }}</strong>
      </template>
      <template slot-scope="{row}" slot="createTime">
        <!--        {{// moment(row.createTime).format('YYYY-MM-DD')}}-->
        <user-list-row :createTime="row.createTime"/>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        <!--        <Button type="error" size="small" @click="remove(index)">Delete</Button>-->
      </template>
    </Table>
    <Page :current="currentPage" :total="totalUser" show-total @on-change="onChangePage"/>
  </div>
</template>

<script>
    import {apiListAllUser} from "../../api/api";
    import userListRow from "./userListRow";

    export default {
        name: "userList",
        components: {
            userListRow
        },
        data() {
            return {
                users: [],
                columns: [
                    {
                        title: '昵称',
                        slot: 'name',
                        sortable: true
                    },
                    {
                        title: '状态',
                        key: 'status',
                        sortable: true
                    },
                    {
                        title: '注册时间',
                        slot: 'createTime',
                        sortable: true
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        sortable: true
                    },
                    {
                        title: '城市',
                        key: 'city',
                        sortable: true
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                totalPage: 0,
                totalUser: 0,
                currentPage: 1,
                pageSize: 10
            }
        },
        methods: {
            loadAllData() {
                apiListAllUser({
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize
                }).then((response) => {
                    if (response.data.code === 0) {
                        this.users = response.data.data.users
                        this.totalUser = response.data.data.totalUser
                        this.totalPage = response.data.data.totalPage
                    } else {
                        throw new Error('读取用户数据错误')
                    }
                }).catch((error) => {
                    this.$Message.error(error.message)
                })
            },
            onChangePage(index) {
                this.currentPage = index
                this.loadAllData()
            },
            show(item) {
            },
            remove(index) {
                this.users.splice(index, 1);
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>

</style>
