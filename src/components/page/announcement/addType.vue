<template>
	<!--新增类型-->
	<div id="addType">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item prop="NAME" label="名称">
                <el-input v-model="ruleForm.NAME" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="SN" label="排序号">
                <el-input v-model="ruleForm.SN" type="NUMBER" min='1' size="mini"></el-input>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @click="submitForm()">保存</el-button>
            	<el-button @click="cancel" size="mini">取消</el-button>
            </div>
        </el-form>
	</div>
</template>

<script>
	export default {
		data: function(){
            return {
            	ruleForm: {
            		SN:1,
            		NAME: ''
            	},
            	rules: {
            		NAME: [
                        { required: true }
                    ]
            	}
            }
        },
        methods: {
        	cancel() {
        		this.$emit('closeDialog');
        	},
        	submitForm() {
        		if(this.$validation(this.ruleForm.NAME,'required')){
            		this.$message.error('请输入名称');
            		return;
            	}
        		this.$http.post('/affiche/createType',this.ruleForm).then(res=>{
	        		if(res.code == 10000){
            			this.$emit('closeDialog');
            			this.$message({
				          	message: res.msg,
				          	type: 'success'
				        });
            			this.$emit("refreshType");
            		}else{
            			this.$message.error(res.msg);
            		}
	        	})
        	}
        },
		mounted() {
			this.ruleForm.SN = 1;
			this.ruleForm.NAME = '';
		}
	}
</script>

<style>
	#addType .btn-box{
		text-align: center;
	}
	#addType .el-button{
		width: 30%;
	}
</style>