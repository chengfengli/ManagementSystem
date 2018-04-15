<template>
	<div id="editDep">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
			<el-form-item prop="DEPTID" style="display: none;">
                <el-input v-model="ruleForm.DEPTID"></el-input>
            </el-form-item>
            <el-form-item prop="DEPTNAME" label="部门名称">
                <el-input v-model="ruleForm.DEPTNAME" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="ISBUSINESS" label="业务科室">
                <el-select v-model="ruleForm.ISBUSINESS" placeholder="请选择" size="mini">
				    <el-option label="是" value="1"></el-option>
				    <el-option label="否" value="0"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="BELONGID" label="归属科室">
                <el-select v-model="ruleForm.BELONGID" placeholder="请选择" size="mini">
				    <el-option v-for="item in belongs" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="EMAIL" label="邮箱">
                <el-input v-model="ruleForm.EMAIL" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="CONTACTPHONE" label="电话">
                <el-input v-model="ruleForm.CONTACTPHONE" size="mini"></el-input>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @keyup.enter="submitForm()" @click="submitForm()">保存</el-button>
            	<el-button @click="cancel" size="mini">取消</el-button>
            </div>
        </el-form>
	</div>
</template>

<script>
	export default{
		name: 'editPerson',
		props: {
			'deptId':String
		},
		data: function() {
			return {
				ruleForm:{
					DEPTNAME:'',
					DEPTID: '',
					ISBUSINESS: '0',
					BELONGID: '',
					EMAIL: '',
					CONTACTPHONE: ''
				},
                rules: {
                    DEPTNAME: [
                        { required: true }
                    ],
                    ISBUSINESS: [
                        { required: true }
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
				if(this.$validation(this.ruleForm.DEPTNAME,'required')){
            		this.$message.error('请输入部门名称');
            		return;
            	}
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
            },
            selectBelongs() {
            	this.$http.post('/dic/getDicByKey/dept',{BELONGID: 0}).then(res=>{
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
		            			this.ruleForm.ISBUSINESS = this.ruleForm.ISBUSINESS.toString();
		            		}else{
		            			this.$message.error(res.msg);
		            		}
		            	})
            }
		},
		mounted() {
			this.selectBelongs();
			if(this.deptId!=''){
				this.selectDeptById(this.deptId);
			}
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