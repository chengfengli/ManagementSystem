<template>
    <div id="login-page">
    	<div class="login-box">
    		<div class="ms-title"><img class="logo" src="../../../static/img/logo.png"><span>不良事件上报系统</span></div>
    		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
                <el-form-item prop="ACCOUNT">
                    <el-input id="account" type="email" v-model="ruleForm.ACCOUNT" placeholder="用户名/账号"></el-input>
                </el-form-item>
                <el-form-item prop="PASSWORD">
                    <el-input id="password" type="password" placeholder="密码" v-model="ruleForm.PASSWORD" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button id="login-btn" type="success" @keyup.enter="submitForm('ruleForm')" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
    	</div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    ACCOUNT: 'pubing',
                    PASSWORD: '123456'
                },
                rules: {
                    ACCOUNT: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    PASSWORD: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/user/login',this.ruleForm).then(res=>{
		            		if(res.code == 10000){
		            			this.$httpHeader.sessionId = res.data.token;
		            			localStorage.setItem('user',JSON.stringify(res.data.user))
		            			this.$router.push('/index');
		            		}else{
		            			this.$message.error(res.msg);
		            		}
		            	})
                    }
                });
            }
        }
    }
</script>

<style >
    #login-page{
    	position: relative;
        width:100%;
        height:100%;
        background-color: rgba(56, 157, 170, 0.82);
        text-align: center;
    }
    #login-page .login-box{
    	display: inline-block;
    	margin-top: 15%;
    }
    #login-page .el-form-item{
    	padding-bottom: 20px;
    }
    #account{
    	width: 300px;
    }
    .ms-title{
        margin-bottom: 20px;
        text-align: center;
        font-size:30px;
        color: #fff;
    }
    .ms-title .logo{
    	position: relative;
    	top: 13px;
    }
    #login-btn{
    	width: 100%;
    }
</style>