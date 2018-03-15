<template>
    <div class="header">
        <div class="logo"><img src="../../../static/img/logo.png">不良事件上报系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">当前用户：{{user.USERNAME}}</span>
                <el-dropdown-menu slot="dropdown">
                	<el-dropdown-item command="loginout">修改个人信息</el-dropdown-item>
                    <el-dropdown-item command="loginout">注销</el-dropdown-item>
                    <el-dropdown-item command="loginout">帮助手册</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        computed:{
            user(){
            	var user = JSON.parse(localStorage.getItem('user'))
                return user;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-color: #00d1b2;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
        margin-left: 20px;
    }
    .header .logo img{
    	position: relative;
    	top: 13px;
    	margin-right: 20px;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
