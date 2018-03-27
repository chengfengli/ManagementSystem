<template>
	<!--发布公告-->
	<div id="addAnnouncement">
		<el-form label-width="80px">
			<el-form-item label="标题">
			    <el-input v-model="form.NAME" size="mini"></el-input>
			</el-form-item>
            <el-form-item prop="CONTENT" label="内容">
            </el-form-item>
            <el-form-item label-width="40px">
                <textarea id="editor">{{form.CONTENT}}</textarea>
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" size="mini" @click="submitForm()">保存</el-button>
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
                form:{
                	NAME: '',
                	CONTENT: ''
                }
            }
        },
        methods: {
        	cancel() {
        		this.$emit('closeDialog');
        	},
        	submitForm() {
        		if(this.$validation(this.form.NAME,'required')){
        			this.$message.error('请输入公告标题');
            		return;
        		}
        		if(this.$validation(this.editor.getData(),'required')){
        			this.$message.error('请输入公告内容');
            		return;
        		}
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
		margin:20px 0;
	}
	#addAnnouncement .el-button{
		width: 30%;
	}
</style>