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
					<li v-for="item in dataList" :keys="item.MODID"><a @click="select(item.MODID)" class="menu-left" :class="isactive==item.MODID?isactiveClass:noactiveClass" href="javascript:void(0)">{{item.MODNAME}}</a></li>
				</ul>

				<div id="form-box">
					<div class="plan" v-for="item in dataList" :keys="item.MODID">
						<div class="type" :id="item.MODID">
							<span class="type-title">{{item.MODNAME}}</span><span class="remakes">{{item.MODMARK}}</span>
						</div>
						<div v-for="ele in item.ELES" :keys="ele.ELEID">
							<div v-if="ele.ELETYPE==1" style="font-size: 16px;font-weight: 600;color: #5aa1ea;margin-top: 20px;">—————————&nbsp;{{ele.LABEL}}&nbsp;—————————</div>
							<hr v-if="ele.ELETYPE==2">
							<div v-else>
								<table v-if="ele.LABEL.length<17">
									<tr>
										<td valign="top" style="width: 112px;font-size: 14px;padding-right: 15px;text-align: right;">{{ele.LABEL}}</td>
										<td style="width: 300px;">
											<el-input v-if="ele.ELETYPE==3" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]" size="mini"></el-input>
							                <el-input v-if="ele.ELETYPE==4" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]" type="textarea"></el-input>
							                <el-radio-group v-if="ele.ELETYPE==5" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]">
											    <el-radio :label="1"></el-radio>
											</el-radio-group>
											<el-date-picker v-if="ele.ELETYPE==6" type="date" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
											<el-date-picker v-if="ele.ELETYPE==7" type="datetime" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
								            <el-select v-model="form['ele_'+ele.ELEID]" :id="'ele_'+ele.ELEID" v-if="ele.ELETYPE==8" placeholder="请选择" size="mini">
								            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
											</el-select>
											<el-select v-model="form['ele_'+ele.ELEID]" :id="'ele_'+ele.ELEID" v-if="ele.ELETYPE==9" multiple collapse-tags placeholder="请选择" size="mini">
								            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
											</el-select>
								            <el-radio-group v-if="ele.ELETYPE==10" v-model="form['ele_'+ele.ELEID]"  :id="'ele_'+ele.ELEID">
											    <el-radio v-for="radio in ele.DATASOURCEVAL" :keys="radio.VALUE" :label="radio.VALUE.toString()">{{radio.DISPLAY}}</el-radio>
											</el-radio-group>
											<el-checkbox-group v-if="ele.ELETYPE==11" v-model="form['ele_'+ele.ELEID]"  :id="'ele_'+ele.ELEID">
											    <el-checkbox v-for="checkbox in ele.DATASOURCEVAL" :keys="checkbox.VALUE" :label="checkbox.VALUE.toString()">{{checkbox.DISPLAY}}</el-checkbox>
											</el-checkbox-group>
											<el-upload v-if="ele.ELETYPE==12" :id="'ele_'+ele.ELEID" :http-request='submitUpload' class="upload-demo" :action="uploadUrl" :file-list="form['ele_'+ele.ELEID]" multiple>
											  <el-button size="mini" type="primary" @click="onChange('ele_'+ele.ELEID)">选择文件</el-button>
											</el-upload>
											<el-input v-if="ele.ELETYPE==13" :id="'ele_'+ele.ELEID" type="NUMBER" :min="ele.MINVAL" :max="ele.MAXVAL" v-model="form['ele_'+ele.ELEID]" size="mini"></el-input>
										</td>
										<td style="width: 400px;color: #5EBAE7;font-size: 12px;padding-left: 5px;"><span v-if="ele.ISREQUIRED==1" class="required">*</span></td>
									</tr>
								</table>
								<table v-else>
									<tr>
										<td style="font-size: 14px;" colspan="2">{{ele.LABEL}}</td>
									</tr>
									<tr>
										<td style="width: 412px;">
											<el-input v-if="ele.ELETYPE==3" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]" size="mini"></el-input>
							                <el-input v-if="ele.ELETYPE==4" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]" type="textarea"></el-input>
							                <el-radio-group v-if="ele.ELETYPE==5" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]">
											    <el-radio :label="1"></el-radio>
											</el-radio-group>
											<el-date-picker v-if="ele.ELETYPE==6" :id="'ele_'+ele.ELEID" type="date" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
											<el-date-picker v-if="ele.ELETYPE==7" :id="'ele_'+ele.ELEID" type="datetime" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
								            <el-select v-model="form['ele_'+ele.ELEID]" :id="'ele_'+ele.ELEID" v-if="ele.ELETYPE==8" placeholder="请选择" size="mini">
								            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
											</el-select>
											<el-select v-model="form['ele_'+ele.ELEID]" :id="'ele_'+ele.ELEID" v-if="ele.ELETYPE==9" multiple collapse-tags placeholder="请选择" size="mini">
								            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
											</el-select>
								            <el-radio-group v-if="ele.ELETYPE==10" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]">
											    <el-radio v-for="radio in ele.DATASOURCEVAL" :keys="radio.VALUE" :label="radio.VALUE.toString()">{{radio.DISPLAY}}</el-radio>
											</el-radio-group>
											<el-checkbox-group v-if="ele.ELETYPE==11" :id="'ele_'+ele.ELEID" v-model="form['ele_'+ele.ELEID]">
											    <el-checkbox v-for="checkbox in ele.DATASOURCEVAL" :keys="checkbox.VALUE" :label="checkbox.VALUE.toString()">{{checkbox.DISPLAY}}</el-checkbox>
											</el-checkbox-group>
											<el-upload v-if="ele.ELETYPE==12" :id="'ele_'+ele.ELEID" :http-request='submitUpload' class="upload-demo" :action="uploadUrl" :file-list="form['ele_'+ele.ELEID]" multiple>
											  <el-button size="mini" type="primary" @click="onChange('ele_'+ele.ELEID)">选择文件</el-button>
											</el-upload>
											<el-input v-if="ele.ELETYPE==13" :id="'ele_'+ele.ELEID" type="NUMBER" :min="ele.MINVAL" :max="ele.MAXVAL" v-model="form['ele_'+ele.ELEID]" size="mini"></el-input>
										</td>
										<td style="width: 400px;color: #5EBAE7;font-size: 12px;padding-left: 5px;"><span v-if="ele.ISREQUIRED==1" class="required">*</span></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="btn-box">
					<el-button v-if="eventDeal" id="temporary-btn" type="primary" @click="save" size="mini">暂存</el-button>
					<el-button id="submit-btn" type="primary" @click="openDialog" size="mini">提交</el-button>
				</div>
			</div>
		</div>
		<el-dialog title="事件上报" :visible.sync="detailDialog" width="400px" :close-on-click-modal="false" :show-close="false">
			<el-form label-width="120px">
				<!--1:默认实名，2：默认实名，禁用匿名，3：默认匿名，禁用实名-->
				<el-form-item label="实名填报：">
					<el-radio v-model="form2.REALNAME" :disabled="reportmode==3" label='1'>实名</el-radio>
  					<el-radio v-model="form2.REALNAME" :disabled="reportmode==2" label='0'>匿名</el-radio>
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
            	eventDeal:false,
            	checks:[],
            	activeNames: [],
            	dataList:[],
            	isactive:5,
            	isactiveClass:'isactive',
            	noactiveClass:null,
            	eleId:null,
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
            	reportmode:null,
            	uploadUrl:this.$hostUrl+'/fileUpload',
            	saveMode:'fillEvent',
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
           		var bool = true;
           		var list_temp = [];
           		for(var i in list){
           			for(var k in list[i].ELES){
           				list_temp.push(list[i].ELES[k]);
           			}
           		}
           		outer:
           		for(var key in form){
           			var new_key = key.substring(key.lastIndexOf('_')+1);
           			var val = form[key];
           			for(var i in list_temp){
           				if(new_key==list_temp[i].ELEID){
           					if(list_temp[i].ISREQUIRED==1){// 必填
           						if(this.$validation(val,'required')){
           							this.$message.error(list_temp[i].LABEL+'不能为空');
           							document.getElementById('ele_'+list_temp[i].ELEID).focus();
           							bool = false;
           							break outer;
           						}
           					}else{//非必填
           						if(!this.$validation(val,'required')&& !this.$validation(list_temp[i].REG,'required')){
           							var reg = new RegExp(list_temp[i].REG);
           							if(!reg.test(val)){
           								this.$message.error(list_temp[i].LABEL+'格式不正确，'+list_temp[i].ERRTIP);
           								bool = false;
           								break outer;
           							}
           						}
           					}
           				}
           			}
           		}
           		return bool;
           	},
        	save() {//暂存
        		var bool = this.validation(this.form,this.dataList);
        		if(bool){
        			var data = {TYPE:this.type,SET:null,VALUES:'',MODE:'tempStorageEvent'};
	        		var list = [];
	        		for(var key in this.form){
	        			var new_key = key.substring(key.lastIndexOf('_')+1);
	        			if(typeof(this.form[key])=='object'){
	        				var arry = [];
	        				for(var i in this.form[key]){
	        					if(!this.$validation(this.form[key][i].url,'required')){
	        						arry.push(this.form[key][i].url);
	        					}
	        				}
	        				if(arry.length>0){
	        					this.form[key]=arry;
	        				}
	        			}
	        			list.push({ELEID:parseInt(new_key),VAL:this.form[key].toString()});
	        		}
	        		data.VALUES=list;
	        		this.$http.post('/event/save/',data).then(res=>{
		        		if(res.code == 10000){
		        			this.$message({
					            type: 'success',
					            message: res.msg
					        });
					        setTimeout(()=>{
					        	this.$router.push({
					                path: 'eventProcessing',
					                query: {txt:'我的事件'}
					           	})
					        },2000);
		        		}else{
		        			this.$message.error(res.msg);
		        		}
		        	});
        		}
        	},
        	openDialog(){
        		var bool = this.validation(this.form,this.dataList);
        		if(bool){
        			this.detailDialog = true;
        		}
        	},
        	submit() {// 提交
        		var bool = true;
        		if(this.$validation(this.form2.HAPPENDEPT,'required')){
        			this.$message.error('请选择当事科室');
        			bool = false;
        		}else if(this.form2.NOTIFIYDIVISIORLEADER==1){
        			if(this.$validation(this.form2.LW,'required')){
	        			this.$message.error('请输入通知内容');
	        			bool = false;
	        		}
        		}
        		if(bool){
        			var data = {TYPE:this.type,SET:this.form2,VALUES:'',MODE:this.saveMode};
	        		var list = [];
	        		for(var key in this.form){
	        			var new_key = key.substring(key.lastIndexOf('_')+1);
	        			if(typeof(this.form[key])=='object'){
	        				var arry = [];
	        				for(var i in this.form[key]){
	        					if(!this.$validation(this.form[key][i].url,'required')){
	        						arry.push(this.form[key][i].url);
	        					}
	        				}
	        				if(arry.length>0){
	        					this.form[key]=arry;
	        				}
	        			}
	        			list.push({ELEID:parseInt(new_key),VAL:this.form[key].toString()});
	        		}
	        		data.VALUES=list;
	        		this.$http.post('/event/save/',data).then(res=>{
		        		if(res.code == 10000){
		        			this.detailDialog = false;
		        			this.$message({
					            type: 'success',
					            message: res.msg
					        });
					        setTimeout(()=>{
					        	this.$router.push({
					                path: 'eventProcessing',
					                query: {txt:'我的事件'}
					           	})
					        },2000);
		        		}else{
		        			this.$message.error(res.msg);
		        		}
		        	});
        		}
        	},
			submitUpload(content){
				let formData = new FormData;
                formData.append('files', content.file);
                this.$http.post('/fileUpLoad',formData).then(res=>{
	        		if(res.code == 10000){
	        			for(var i in res.data){
	        				var map = {name:res.data[i].ORGNAME,id:res.data[i].ID,url:res.data[i].FILENAME};
		        			this.form[this.eleId].push(map);
	        			}
	        		}else{
	        			this.$message.error(res.msg);
	        		}
	        	});
			},
			onChange(id){
				this.eleId=id;
			}
        },
		mounted() {
			var obj = this.$route.query;
			var params={};
			if(!this.$validation(obj.local,'required')){
				this.eventDeal = true;
				params={
					TYPEID:obj.typeId,
					MODE:'FILL',
					CATEGORY:'INCIDENT'
				};
			}else{
				this.saveMode = obj.saveMode;
				params={
				  EVENTID:obj.eventId,
					MODE:obj.mode,
					CATEGORY:obj.category
				};
			}
			this.$http.post('/event/initFillPage',params).then(res=>{
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
        					if(params.MODE=='FILL'){
        						if(list[i].ELES[j].ELETYPE==11){
	        						temp_form[key]=list[i].ELES[j].DEFAULTVALUE.split('_');
	        					}else if(list[i].ELES[j].ELETYPE==12){
	        						temp_form[key]=[];
	    						}else{
	        						temp_form[key]=list[i].ELES[j].DEFAULTVALUE;
	        					}
        					}else{
        						if(list[i].ELES[j].ELETYPE==11){
	        						temp_form[key]=list[i].ELES[j].VAL.split(',');
	        					}else if(list[i].ELES[j].ELETYPE==12){
	        						temp_form[key]=[];
	    						}else{
	        						temp_form[key]=list[i].ELES[j].VAL;
	        					}
        					}
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
			var app = document.getElementById('app')
			app.onscroll=()=>{
				var top = app.scrollTop;
				var types_ele = document.getElementsByClassName('type');
				var menus = document.getElementsByClassName('menu-left');
				if(top!=0){
					for(var i=menus.length-1;i>=0;i--){
						menus[i].classList.remove('isactive');
					}
					for(var i=types_ele.length-1;i>=0;i--){
						if(app.scrollHeight-app.scrollTop==app.clientHeight){
					　　　　menus[menus.length-1].classList.add('isactive')
					　　}else{
							if(top>types_ele[i].offsetTop){
								menus[i].classList.add('isactive')
								break;
							}
						}
					}
				}
			}
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
		border: 1px solid #B6B6B6;
    	border-radius: 5px;
	}
	#ancho-box li+li{
		border-top:1px solid #E7E7E7;
	}
	#ancho-box li a:hover{
		background-color: #839965;
		color: #fff!important;
	}
	.isactive{
		background-color: #839965;
		color: #fff!important;
	}
	#ancho-box a{
		font-size: 14px;
		padding:10px;
		display: block;
		color: #839965;
	}
	#form-box{
		margin-left: 200px;
		margin-top: 20px;
	}
	#eventFill-page .eventFill-body .btn-box{
		position: fixed;
	    right: 60px;
	    bottom: 20px;
	}
	.el-input{
		display: block;
		width: 100%;
	}
	.el-collapse-item__header{
		font-size: 16px;
	}
	table{
		width: auto;
	}
	.plan{
		margin-bottom: 20px;
	}
	.plan table{
		margin-top: 10px;
	}
	.type-title{
	    font-size: 18px;
	    color: #839965;
	    font-weight: bold;
	}
	.remakes{
		color: #5EBAE7;
		display: inline-block;margin-left: 30px;
	}
	.required{
		color: red;
		margin-right: 5px;
	}
	.el-select{
		display: block;
	}
	.el-radio+.el-radio,.el-checkbox+.el-checkbox{
		margin-left: 0;
	}
	.el-radio,.el-checkbox{
		margin-right: 20px;
		margin-bottom: 10px;
	}
</style>
