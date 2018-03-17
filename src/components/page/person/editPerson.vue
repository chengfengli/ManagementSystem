<template>
	<div id="editPerson">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
			<el-form-item prop="USERID" style="display: none;">
                <el-input v-model="ruleForm.USERID"></el-input>
            </el-form-item>
            <el-form-item prop="USERNAME" label="姓名">
                <el-input v-model="ruleForm.USERNAME"></el-input>
            </el-form-item>
            <el-form-item prop="ROLENAME" label="角色">
                <el-select v-model="ruleForm.ROLENAME" placeholder="请选择">
				    <el-option v-for="item in roles" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="JOB" label="职务">
                <el-select v-model="ruleForm.JOB" placeholder="请选择">
				    <el-option v-for="item in jobs" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="DEPTID" label="部门">
                <el-select v-model="ruleForm.DEPTID" placeholder="请选择">
				    <el-option v-for="item in depts" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="CONTACTPHONE" label="电话">
                <el-input v-model="ruleForm.CONTACTPHONE"></el-input>
            </el-form-item>
            <el-form-item prop="EMAIL" label="邮箱">
                <el-input v-model="ruleForm.EMAIL"></el-input>
            </el-form-item>
            <el-form-item prop="ROW_ID" label="排序号">
                <el-input v-model="ruleForm.ROW_ID"></el-input>
            </el-form-item>
            <el-form-item prop="ISUSED" label="启用">
                <el-select v-model="ruleForm.ISUSED" placeholder="请选择">
				    <el-option label="是" value="1"></el-option>
				    <el-option label="否" value="0"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="ISGAG" label="禁言">
                <el-select v-model="ruleForm.ISGAG" placeholder="请选择">
				    <el-option label="是" value="1"></el-option>
				    <el-option label="否" value="0"></el-option>
				</el-select>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @keyup.enter="submitForm('ruleForm')" @click="submitForm('ruleForm')">保存</el-button>
            	<el-button @click="cancel" size="mini">取消</el-button>
            </div>
        </el-form>
	</div>
</template>

<script>
	export default{
		name: 'editPerson',
		props: {
			'ruleForm':Object
		},
		data: function() {
			return {
				rules: {
                    USERNAME: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    ISBUSINESS: [
                        { required: true, message: '请选择是否是业务科室', trigger: 'blur' }
                    ]
                },
                jobs:[],
                roles:[{label:'管理员',value:1}],
                depts:[]
			}
		},
		methods: {
			cancel() {
				this.$emit('closePersonDialog');
			}
		},
		mounted() {
			this.$http.post('/dic/getDicByKey/role').then(res=>{
        		if(res.code == 10000){
        		}else{
        			this.$message.error(res.msg);
        		}
        	})
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