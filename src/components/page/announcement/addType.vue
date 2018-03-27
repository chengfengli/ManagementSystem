<template>
	<!--新增类型-->
	<div id="addType">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item prop="DEPTNAME" label="名称">
                <el-input v-model="ruleForm.DEPTNAME" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="ISBUSINESS" label="业务科室">
                <el-select v-model="ruleForm.ISBUSINESS" placeholder="请选择" size="mini">
				    <el-option label="是" value="1"></el-option>
				    <el-option label="否" value="0"></el-option>
				</el-select>
            </el-form-item>
            <el-form-item prop="BELONG" label="归属科室">
                <el-input v-model="ruleForm.BELONG" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="EMAIL" label="邮箱">
                <el-input v-model="ruleForm.EMAIL" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="CONTACTPHONE" label="电话">
                <el-input v-model="ruleForm.CONTACTPHONE" size="mini"></el-input>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @keyup.enter="submitForm('ruleForm')" @click="submitForm('ruleForm')">保存</el-button>
            	<el-button @click="cancel" size="mini">取消</el-button>
            </div>
        </el-form>
	</div>
</template>

<script>
	export default {
		data: function(){
            return {
            	ruleForm: {},
            	rules: {}
            }
        },
        methods: {
        	cancel() {
        		this.$emit('closeDialog');
        	}
        },
		mounted() {
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