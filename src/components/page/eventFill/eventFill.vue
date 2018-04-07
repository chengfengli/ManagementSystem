<template>
	<div id="eventFill-page">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="eventFill-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item :to="{ path: 'eventFillIndex' }">事件填报</el-breadcrumb-item>
				  	<el-breadcrumb-item>填报页面</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="body">
				<ul id="ancho-box">
					<li v-for="item in dataList" :keys="item.MODID"><a @click="select(item.MODID)" :class="isactive==item.MODID?isactiveClass:noactiveClass" href="javascript:void(0)">{{item.MODNAME}}</a></li>
				</ul>
				<div id="form-box">
					<el-collapse v-model="activeNames">
					  	<el-collapse-item v-for="item in dataList" :keys="item.MODID" :id="item.MODID" :title="item.MODNAME" :name="item.MODID">
					    	<el-form>
					    		<el-form-item v-for="ele in item.ELES" :keys="ele.ELEID" :label="ele.LABEL">
					    			<hr v-if="ele.ELETYPE==2">
					    			
					                <el-input v-if="ele.ELETYPE==3" v-model="form['ele_'+ele.ELEID]" size="mini"></el-input>
					                
					                <el-input v-if="ele.ELETYPE==4" v-model="form['ele_'+ele.ELEID]" type="textarea"></el-input>
					                
					                <el-radio-group v-if="ele.ELETYPE==5" v-model="form['ele_'+ele.ELEID]">
									    <el-radio :label="1"></el-radio>
									</el-radio-group>
									
									<el-date-picker v-if="ele.ELETYPE==6" type="date" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
									
									<el-date-picker v-if="ele.ELETYPE==7" type="datetime" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
						            
						            <el-select v-model="form['ele_'+ele.ELEID]" v-if="ele.ELETYPE==8" placeholder="请选择" size="mini">
						            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
									</el-select>
									
									<el-select v-model="form['ele_'+ele.ELEID]" v-if="ele.ELETYPE==9" multiple collapse-tags placeholder="请选择" size="mini">
						            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
									</el-select>
						            
						            <el-radio-group v-if="ele.ELETYPE==10" v-model="form['ele_'+ele.ELEID]">
									    <el-radio v-for="radio in ele.DATASOURCEVAL" :keys="radio.VALUE" :label="radio.VALUE">{{radio.DISPLAY}}</el-radio>
									</el-radio-group>
									
									<el-checkbox-group v-if="ele.ELETYPE==11">
									    <el-checkbox v-for="checkbox in ele.DATASOURCEVAL" :keys="checkbox.VALUE" :label="1">{{checkbox.DISPLAY}}</el-checkbox>
									</el-checkbox-group>
									
									<el-upload v-if="ele.ELETYPE==12" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple>
									  <el-button size="mini" type="primary">选择文件</el-button>
									</el-upload>
									
									<el-input v-if="ele.ELETYPE==13" type="NUMBER" :min="ele.MINVAL" :max="ele.MAXVAL" v-model="form['ele_'+ele.ELEID]" size="mini"></el-input>
					           </el-form-item>
					    	</el-form>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<div class="btn-box">
					<el-button id="temporary-btn" type="primary" @click="save" size="mini">暂存</el-button>
					<el-button id="submit-btn" type="primary" @click="openDialog" size="mini">提交</el-button>
				</div>
			</div>
		</div>
		<el-dialog title="事件上报" :visible.sync="detailDialog" width="400px" :close-on-click-modal="false" :show-close="false">
			<el-form label-width="120px">
				<!--1:默认实名，2：默认实名，禁用匿名，3：默认匿名，禁用实名-->
				<el-form-item label="实名填报：">
					<el-radio v-model="form2.REALNAME" :disabled="reportmode==3" label="1">实名</el-radio>
  					<el-radio v-model="form2.REALNAME" :disabled="reportmode==2" label="0">匿名</el-radio>
				</el-form-item>
				<el-form-item label="当事科室：">
				    <el-select v-model="form2.HAPPENDEPT" placeholder="请选择" size="mini">
		            	<el-option v-for="item in deptList" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="通知分管领导：">
					<el-checkbox v-model="form2.NOTIFIYDIVISIORLEADER==1" @change="isused"></el-checkbox>
				</el-form-item>
	            <el-form-item prop="CONTENT" label="通知内容：">
	            	<el-input v-model="form2.LW" size="mini"></el-input>
	            </el-form-item>
	            <div class="btn-box" style="text-align: center;margin: 20px 0;">
	            	<el-button @click="submit" size="mini">确定</el-button>
	            	<el-button @click="detailDialog=false" size="mini">取消</el-button>
	            </div>
	        </el-form>
		</el-dialog>
	</div>
</template>

<script>
	import elHead from '../../common/Header.vue';
	export default {
		components:{
			elHead
       	},
		data: function(){
            return {
            	activeNames: [],
            	dataList:[],
            	isactive:0,
            	isactiveClass:'isactive',
            	noactiveClass:null,
            	form:{},
            	form2:{
            		HAPPENDEPT:'',
            		REALNAME:'1',
            		NOTIFIYDIVISIORLEADER:1,
            		LW:''
            	},
            	deptList:[],
            	type:'',
            	detailDialog:false,
            	reportmode:null 
            }
        },
        methods: {
        	select(id) {// 定位
        		this.isactive = id;
        		document.getElementById(id).scrollIntoView();
        	},
        	isused(value){
           		if(value){
           			this.form2.NOTIFIYDIVISIORLEADER=1
           		}else{
           			this.form2.NOTIFIYDIVISIORLEADER=0
           		}
           	},
           	validation(form,list){
           		var list_temp = [];
           		for(var i in list){
           			for(var k in list[i].ELES){
           				list_temp.push(list[i].ELES[k]);
           			}
           		}
           		for(var key in form){
           			var new_key = key.substring(key.lastIndexOf('_')+1);
           			var val = form[key];
           			for(var i in list_temp){
           				if(new_key==list_temp[i].ELEID){
           					if(list_temp[i].ISREQUIRED==0){// 必填
           						if(this.$validation(val,'required')){
           							this.$message.error(list_temp[i].LABEL+'不能为空');
           							return;
           						}
           					}else{//非必填
           						if(!this.$validation(val,'required')&& !this.$validation(list_temp[i].REG,'required')){
           							var reg = new RegExp(list_temp[i].REG);
           							if(!reg.test(val)){
           								this.$message.error(list_temp[i].LABEL+'格式不正确');
           								return;
           							}
           						}
           					}
           				}
           			}
           		}
           	},
        	save() {//暂存
        		this.validation(this.form,this.dataList);
//      		var data = {TYPE:this.type,SET:null,VALUES:''};
//      		var list = [];
//      		for(var key in this.form){
//      			var new_key = key.substring(key.lastIndexOf('_')+1);
//      			if(new_key==11 || new_key==9){
//      				var val = this.form[key];
//      			}else{
//      				list.push({ELEID:parseInt(new_key),VAL:this.form[key].toString()});
//      			}
//      		}
//      		data.VALUES=list;
//      		this.$http.post('/event/tempStorage/',data).then(res=>{
//	        		if(res.code == 10000){
//	        			this.$message({
//				            type: 'success',
//				            message: res.msg
//				        });
//	        		}else{
//	        			this.$message.error(res.msg);
//	        		}
//	        	});
        	},
        	openDialog(){
        		this.detailDialog = true;
        	},
        	submit() {// 提交
        		this.form2.REALNAME = parseInt(this.form2.REALNAME);
        		var data = {TYPE:this.type,SET:this.form2,VALUES:''};
        		var list = [];
        		for(var key in this.form){
        			var new_key = key.substring(key.lastIndexOf('_')+1);
        			list.push({ELEID:parseInt(new_key),VAL:this.form[key].toString()});
        		}
        		data.VALUES=list;
        		this.$http.post('/event/save/',data).then(res=>{
	        		if(res.code == 10000){
	        			this.$message({
				            type: 'success',
				            message: res.msg
				        });
	        		}else{
	        			this.$message.error(res.msg);
	        		}
	        	});
        	}
        },
		mounted() {
			var obj = this.$route.query;
			this.$http.post('/event/initFillPage/'+obj.id).then(res=>{
        		if(res.code == 10000){
        			var list = res.data.DATA;
        			this.type = res.data.TYPE;
        			this.reportmode = res.data.REPORTMODE;
        			if(this.reportmode==3){
        				this.form2.REALNAME = '0';
        			}
        			var temp_form = {};
        			this.isactive = list[0].MODID;
        			for(var i in list){
        				this.activeNames.push(list[i].MODID);
        				for(var j in list[i].ELES){
        					var key = 'ele_'+list[i].ELES[j].ELEID;
        					temp_form[key]=list[i].ELES[j].DEFAULTVALUE;
        				}
        			}
        			this.form = temp_form;
        			this.dataList=list;
        		}else{
        			this.$message.error(res.msg);
        		}
        	});
			this.$http.post('/dic/getDicByKey/dept',{BELONGID:null}).then(res=>{
        		if(res.code == 10000){
        			this.deptList = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	})
		}
	}
</script>

<style scoped>
	#eventFill-page .body{
		position: relative;
	}
	#ancho-box{
		list-style: none;
		position: fixed;
		top: 100px;
	}
	#ancho-box li{
		margin-bottom: 10px;
		background-color: rgb(238, 246, 246);
	}
	#ancho-box li:hover{
		background-color: #00d1b2;
	}
	.isactive{
		background-color: #00d1b2;
		color: #fff;
	}
	#ancho-box a{
		font-size: 14px;
		padding: 10px 5px;
		display: block;
	}
	#form-box{
		margin-left: 200px;
		margin-top: 20px;
		width: 300px;
	}
	#eventFill-page .eventFill-body .btn-box{
		position: absolute;
		right: 20px;
		top: 15px;
	}
	.el-input{
		width: 200px;
	}
	.el-collapse-item__header{
		font-size: 16px;
	}
</style>