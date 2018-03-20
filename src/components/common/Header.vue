<template>
    <div class="header">
        <div class="logo"><img src="../../../static/img/logo.png"><span class="sysname">不良事件上报系统</span></div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">当前用户：{{user.USERNAME}}</span>
                <el-dropdown-menu slot="dropdown">
                	<el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
                    <el-dropdown-item command="loginout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog title="编辑用户信息" :visible.sync="editPersonDialog" width="30%" :close-on-click-modal="false" :show-close="false">
		  <user-info v-if="editPersonDialog" @refreshEmp="selectPoseson()" @closePersonDialog="editPersonDialog=false" :empId="id"></user-info>
		</el-dialog>
    </div>
</template>
<script>
	import userInfo from '../common/userInfo.vue';
    export default {
    	components:{
			userInfo
       	},
        data() {
            return {
                name: '',
                editPersonDialog: false,
                id: '',
            }
        },
        computed:{
            user(){
            	var user = JSON.parse(localStorage.getItem('user'));
                return user;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                	this.$http.post('/user/logout').then(res=>{
		        		if(res.code == 10000){
		        			localStorage.removeItem('user');
		        			this.$router.push('/login');
		        		}else{
		        			this.$message.error(res.msg);
		        		}
		        	})
                }else if(command == 'userinfo'){
                	this.editPersonDialog = true;
                }
            }
        },
        mounted() {
        	if(this.user){
        		this.id = this.user.USERID;
        	}else{
        		this.$router.push('/login');
        	}
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        line-height: 50px;
        color: #fff;
        background-color: #00d1b2;
    }
    .header .logo{
        float: left;
        text-align: center;
        margin-left: 20px;
        position: relative;
    }
    .header .logo .sysname{
    	margin-left: 60px;
    	font-size: 26px;
    }
    .header .logo img{
    	position: absolute;
    	top: 2px;
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
