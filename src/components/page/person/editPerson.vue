<template>
	<div id="editPerson">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
			<el-form-item prop="USERID" style="display: none;">
                <el-input v-model="ruleForm.USERID"></el-input>
            </el-form-item>
            <el-form-item prop="ACCOUNT" label="账号">
                <el-input v-model="ruleForm.ACCOUNT" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="WORKID" label="工号">
                <el-input v-model="ruleForm.WORKID" size="mini"></el-input>
            </el-form-item>
            <el-form-item v-if="ruleForm.PASSWORD==''" prop="PASSWORD" label="密码">
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
            <el-form-item prop="USERSN" label="排序号">
                <el-input v-model="ruleForm.USERSN" type="NUMBER" min='1' size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="ROLEID" label="角色">
                <el-select v-model="ruleForm.ROLEID" placeholder="请选择" size="mini">
				    <el-option v-for="item in roles" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="JOB" label="职务">
                <el-select v-model="ruleForm.JOB" placeholder="请选择" size="mini">
				    <el-option v-for="item in jobs" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="DEPTID" label="部门">
                <el-select v-model="ruleForm.DEPTID" placeholder="请选择" size="mini">
				    <el-option v-for="item in depts" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="ISUSED" label="启用">
            	<el-checkbox v-model="ruleForm.ISUSED==1" @change="isused"></el-checkbox>
            </el-form-item>
            <el-form-item prop="ISGAG" label="禁言">
            	<el-checkbox v-model="ruleForm.ISGAG==1" @change="isgag" ></el-checkbox>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @click="submitForm()">保存</el-button>
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
                        { required: true }
                    ],
                    ACCOUNT: [
                        { required: true }
                    ],
                    PHONE: [
                        { required: true },
                    ]
                },
                ruleForm:{
                	WORKID:'',
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
				if(this.$validation(this.ruleForm.ACCOUNT,'required')){
            		this.$message.error('请输入账号');
            		return;
            	}
            	if(this.$validation(this.ruleForm.USERNAME,'required')){
            		this.$message.error('请输入姓名');
            		return;
            	}
            	if(this.$validation(this.ruleForm.PHONE,'required')){
            		this.$message.error('请输入电话');
            		return;
            	}
            	if(!this.$validation(this.ruleForm.PHONE,'phone')){
            		this.$message.error('电话格式有误');
            		return;
            	}
            	if(!this.$validation(this.ruleForm.EMAIL,'required')){
            		if(!this.$validation(this.ruleForm.EMAIL,'email')){
	            		this.$message.error('邮箱格式有误');
	            		return;
	            	}
            	}
                var url = '';
            	if(this.ruleForm.USERID == ''){
            		url = '/user/create'
            	}else{
            		url = '/user/update/'+this.ruleForm.USERID
            	}
            	this.$http.post(url,this.ruleForm).then(res=>{
	        		if(res.code == 10000){
            			this.$emit('closePersonDialog');
            			this.$message({
				          	message: res.msg,
				          	type: 'success'
				        });
            			this.$emit("refreshEmp");
            		}else{
            			this.$message.error(res.msg);
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
           	isused(value){
           		if(value){
           			this.ruleForm.ISUSED=1
           		}else{
           			this.ruleForm.ISUSED=0
           		}
           	},
           	isgag(value){
           		if(value){
           			this.ruleForm.ISGAG=1
           		}else{
           			this.ruleForm.ISGAG=0
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
			this.$http.post('/dic/getDicByKey/dept').then(res=>{
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