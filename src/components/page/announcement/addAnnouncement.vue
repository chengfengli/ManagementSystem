<template>
	<!--发布公告-->
	<div id="addAnnouncement">
		<el-form label-width="80px">
			<el-form-item label="标题">
			    <el-input v-model="form.TITLE" size="mini"></el-input>
			</el-form-item>
			<el-form-item prop="TOP" label="置顶">
			    <el-col :span="9">
			      	<el-checkbox v-model="form.TOP==1" @change="topFun"></el-checkbox>
			    </el-col>
			    <el-col :span="3">发布日期</el-col>
			    <el-col :span="10">
			    	<el-date-picker v-model="form.PUBLISHDATE" type="date" placeholder="选择发布日期" size="mini"></el-date-picker>
			    </el-col>
			</el-form-item>
			<el-form-item label="">
			    
			</el-form-item>
            <el-form-item label-width="40px">
                <textarea id="editor"></textarea>
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
		props: {
			'type':0,
			'obj':null
		},
		data: function(){
            return {
                editor:null,
                form:{
                	ID:null,
                	TITLE: '',
                	CONTENT: '',
                	TOP:0,
                	PUBLISHDATE:'',
                	TYPE:0
                }
            }
        },
        methods: {
        	cancel() {
        		this.$emit('closeDialog');
        	},
        	topFun(value) {
        		if(value){
           			this.form.TOP=1
           		}else{
           			this.form.TOP=0
           		}
        	},
        	submitForm() {
        		if(this.$validation(this.form.TITLE,'required')){
        			this.$message.error('请输入公告标题');
            		return;
        		}
        		if(this.$validation(this.form.PUBLISHDATE,'required')){
        			this.$message.error('请选择发布时间');
            		return;
        		}
        		if(this.$validation(this.editor.getData(),'required')){
        			this.$message.error('请输入公告内容');
            		return;
        		}
        		this.form.CONTENT=this.editor.getData();
        		var url = '';
        		if(this.form.ID!=null){
        			url = '/affiche/edit/'+this.form.ID;
        		}else{
        			url = '/affiche/create';
        		}
        		this.$http.post(url,this.form).then(res=>{
	        		if(res.code == 10000){
            			this.$emit('closeDialog');
            			this.$message({
				          	message: res.msg,
				          	type: 'success'
				        });
            			this.$emit("refreshAn");
            		}else{
            			this.$message.error(res.msg);
            		}
	        	})
        	},
        	details() {
        		
        	},
        	setData() {
        		this.editor.setData('大事发生的');
        	}
        },
		mounted() {
			this.editor = CKEDITOR.replace("editor", {height: "200px", width: "100%", toolbar: "Full"});
			this.form.TYPE = this.type;
			if(this.obj!=null){
				this.form=this.obj;
				this.editor.setData(this.form.CONTENT);
			}
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
	#addAnnouncement .el-icon-date:before{
	    position: relative!important;
		top: 0px!important;
	} 
</style>