<template>
	<div id="editDep">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
			<el-form-item prop="DEPTID" style="display: none;">
                <el-input v-model="ruleForm.DEPTID"></el-input>
            </el-form-item>
            <el-form-item prop="DEPTNAME" label="部门名称">
                <el-input v-model="ruleForm.DEPTNAME"></el-input>
            </el-form-item>
            <el-form-item prop="ISBUSINESS" label="业务科室">
                <el-select v-model="ruleForm.ISBUSINESS" placeholder="请选择">
				    <el-option label="是" value='1'></el-option>
				    <el-option label="否" value='0'></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="BELONGID" label="归属科室" placeholder="请选择">
                <el-select v-model="ruleForm.BELONGID">
				    <el-option v-for="item in belongs" :key="item.DEPTID" :label="item.DEPTNAME" :value="item.DEPTID"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="EMAIL" label="邮箱">
                <el-input v-model="ruleForm.EMAIL"></el-input>
            </el-form-item>
            <el-form-item prop="CONTACTPHONE" label="电话">
                <el-input v-model="ruleForm.CONTACTPHONE"></el-input>
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
			'deptId':Number
		},
		data: function() {
			return {
				ruleForm:{
					DEPTNAME:'',
					DEPTID: '',
					ISBUSINESS: '',
					BELONGID: '',
					EMAIL: '',
					CONTACTPHONE: ''
				},
                rules: {
                    DEPTNAME: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    ISBUSINESS: [
                        { required: true, message: '请选择是否是业务科室', trigger: 'blur' }
                    ]
                },
                belongs:[]
			}
		},
		methods: {
			cancel() {
				this.$emit('closeDeptDialog');
			},
			submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    	if(!this.ruleForm.BELONGID){
							this.ruleForm.BELONGID = 0;
						}
                    	var url = '';
                    	if(this.ruleForm.DEPTID == ''){
                    		url = '/dept/create';
                    	}else{
                    		url = '/dept/detail/'+this.ruleForm.DEPTID;
                    	}
                        this.$http.post(url,this.ruleForm).then(res=>{
		            		if(res.code == 10000){
		            			this.$emit('closeDeptDialog');
		            			this.$message({
						          	message: res.msg,
						          	type: 'success'
						        });
		            			this.$emit("refreshDept");
		            		}else{
		            			this.$message.error(res.msg);
		            		}
		            	})
                    }
                });
            },
            selectBelongs() {
            	this.$http.post('/dept/list',{BELONGID: 0}).then(res=>{
            		if(res.code == 10000){
            			this.belongs = res.data;
            		}else{
            			this.$message.error(res.msg);
            		}
            	})
            },
            selectDeptById(deptId) {
            	this.$http.post('/dept/detail/'+deptId).then(res=>{
		            		if(res.code == 10000){
		            			this.ruleForm = res.data;
		            		}else{
		            			this.$message.error(res.msg);
		            		}
		            	})
            }
		},
		mounted() {
			this.ruleForm.ISBUSINESS = '0';
			this.selectBelongs();
			this.selectDeptById(this.deptId);
		}
	}
</script>

<style>
	#editDep .el-select{
		width: 100%;
	}
	#editDep .btn-box{
		text-align: center;
	}
	#editDep .el-button{
		width: 30%;
	}
</style>