<template>
    <div class="login-wrap">
        <div class="ms-title"><img class="loggo" src="../../../static/img/logo.png"><span>不良事件上报系统</span></div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="ACCOUNT">
                    <el-input id="account" clav-model="ruleForm.ACCOUNT" placeholder="用户名/账号"></el-input>
                </el-form-item>
                <el-form-item prop="PASSWORD">
                    <el-input id="password" type="PASSWORD" placeholder="密码" v-model="ruleForm.PASSWORD" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @keyup.enter="submitForm('ruleForm')" @click="submitForm('ruleForm')">登录</el-button>
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

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -193px;
        text-align: center;
        font-size:30px;
        color: #fff;
    }
    .ms-title .loggo{
    	position: relative;
    	top: 13px;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>