<template>
	<!--发布公告-->
	<div id="addAnnouncement">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item prop="DEPTNAME" label="内容">
            </el-form-item>
            <el-form-item label-width="0px">
                <textarea id="editor"></textarea>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @keyup.enter="submitForm('ruleForm')" @click="submitForm('ruleForm')">保存</el-button>
            	<el-button @click="cancel" size="mini">取消</el-button>
            </div>
        </el-form>
	</div>
</template>

<script>
	import CKEDITOR from "CKEDITOR";
	export default {
		name: "addAnnouncement",
		data: function(){
            return {
                editor:null,
                ruleForm:{},
                rules:{}
            }
        },
        methods: {
        	cancel() {
        		this.$emit('closeDialog');
        	}
        },
		mounted() {
			this.editor = CKEDITOR.replace("editor", {height: "300px", width: "100%", toolbar: "Full"});
		}
	}
</script>

<style>
	#addAnnouncement .btn-box{
		text-align: center;
	}
	#addAnnouncement .el-button{
		width: 30%;
	}
</style>