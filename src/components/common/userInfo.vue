<template>
	<div id="editPerson">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
			<el-form-item prop="USERID" style="display: none;">
                <el-input v-model="ruleForm.USERID"></el-input>
            </el-form-item>
            <el-form-item prop="ACCOUNT" label="账号">
                <el-input :disabled="true" v-model="ruleForm.ACCOUNT" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="PASSWORD" label="密码">
                <el-input v-model="ruleForm.PASSWORD" placeholder="默认：123456" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="USERNAME" label="姓名">
                <el-input v-model="ruleForm.USERNAME" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="PHONE" label="电话">
                <el-input v-model="ruleForm.PHONE" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="EMAIL" label="邮箱">
                <el-input v-model="ruleForm.EMAIL" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="ROLEID" label="角色">
                <el-select :disabled="true" v-model="ruleForm.ROLEID" placeholder="请选择" size="mini">
				    <el-option v-for="item in roles" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item  prop="JOB" label="职务">
                <el-select :disabled="true" v-model="ruleForm.JOB" placeholder="请选择" size="mini">
				    <el-option v-for="item in jobs" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="DEPTID" label="部门">
                <el-select :disabled="true" v-model="ruleForm.DEPTID" placeholder="请选择" size="mini">
				    <el-option v-for="item in depts" :key="item.DEPTID" :label="item.DEPTNAME" :value="item.DEPTID"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="ISGAG" label="禁言">
                <el-select :disabled="true" v-model="ruleForm.ISGAG" placeholder="请选择" size="mini">
				    <el-option v-for="item in bools" :key="item.value" :label="item.txt" :value="item.value"></el-option>
				</el-select>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">保存</el-button>
            	<el-button @click="cancel" size="mini">取消</el-button>
            </div>
        </el-form>
	</div>
</template>

<script>
	export default{
		name: 'editPerson',
		props: {
			'empId':Number
		},
		data: function() {
			return {
				rules: {
                    USERNAME: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                        
                    ],
                    EMAIL: [
                    	{ validator: this.vemail, message: '邮箱格式错误', trigger: 'blur' }
                    ],
                    PHONE: [
                    	{ validator: this.phoneCheck, message: '手机格式错误', trigger: 'blur' }
                    ]
                },
                ruleForm:{
                	USERID: '',
                	USERNAME: '',
                	ROLEID: '',
                	PASSWORD: '',
                	ACCOUNT: '',
                	JOB: '',
                	DEPTID: '',
                	PHONE: '',
                	EMAIL: '',
                	USERSN:1,
                	ISUSED: '',
                	ISGAG: ''
                },
                bools: [
                	{txt:'是',value:1},
                	{txt:'否',value:0}
                ],
                jobs:[],
                roles:[],
                depts:[]
			}
		},
		methods: {
			cancel() {
				this.$emit('closePersonDialog');
			},
			submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    	this.$http.post('/user/update/'+this.ruleForm.USERID,this.ruleForm).then(res=>{
			        		if(res.code == 10000){
		            			this.$http.post('/user/logout').then(res=>{
					        		if(res.code == 10000){
					        			localStorage.removeItem('user');
					        			this.$router.push('/login');
					        		}else{
					        			this.$message.error(res.msg);
					        		}
					        	})
		            		}else{
		            			this.$message.error(res.msg);
		            		}
			        	})
                    }
				})
			},
			selectEmptById(id) {
				if(id!=''){
					this.$http.post('/user/detail/'+id).then(res=>{
		        		if(res.code == 10000){
		        			this.ruleForm = res.data;
		        		}else{
		        			this.$message.error(res.msg);
		        		}
		        	})
				}
			},
			vemail(rule, value, callback) {//邮箱验证
            	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            	if(value!=''){
            		if(!reg.test(value)){
            			callback(new Error(rule));
            		}
            	}
           	},
           	phoneCheck(rule, value, callback){
           		var reg = new RegExp("^((13[0-9])|(17[3-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\\d{8}$");
            	if(value!=''){
            		if(!reg.test(value)){
            			callback(new Error(rule));
            		}
            	}
           	}
		},
		mounted() {
			this.$http.post('/dic/getDicByKey/role').then(res=>{
        		if(res.code == 10000){
        			this.roles = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	})
			this.$http.post('/dic/getDicByKey/post').then(res=>{
        		if(res.code == 10000){
        			this.jobs = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	})
			this.$http.post('/dic/getDicByKey/dept',{BELONGID:null}).then(res=>{
        		if(res.code == 10000){
        			this.depts = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	})
			this.selectEmptById(this.empId);
		}
	}
</script>

<style>
	#editPerson .el-select{
		width: 100%;
	}
	#editPerson .btn-box{
		text-align: center;
	}
	#editPerson .el-button{
		width: 30%;
	}
</style>