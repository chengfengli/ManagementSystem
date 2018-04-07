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
									    <el-radio :label="3">备选项</el-radio>
									</el-radio-group>
									
									<el-date-picker v-if="ele.ELETYPE==6" type="date" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
									
									<el-date-picker v-if="ele.ELETYPE==7" type="datetime" v-model="form['ele_'+ele.ELEID]" placeholder="选择日期" size="mini"></el-date-picker>
						            
						            <el-select v-model="form['ele_'+ele.ELEID]" v-if="ele.ELETYPE==8" placeholder="请选择" size="mini">
						            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
									</el-select>
									
									<el-select v-model="values" v-if="ele.ELETYPE==9" multiple placeholder="请选择" size="mini">
						            	<el-option v-for="option in ele.DATASOURCEVAL" :key="option.VALUE" :label="option.DISPLAY" :value="option.VALUE"></el-option>
									</el-select>
						            
						            <el-radio-group v-if="ele.ELETYPE==10" v-model="form['ele_'+ele.ELEID]">
									    <el-radio v-for="radio in ele.DATASOURCEVAL" :keys="radio.VALUE" :label="radio.VALUE">{{radio.DISPLAY}}</el-radio>
									</el-radio-group>
									
									<el-checkbox-group v-if="ele.ELETYPE==11">
									    <el-checkbox v-for="checkbox in ele.DATASOURCEVAL" :keys="checkbox.VALUE" :label="1">{{checkbox.DISPLAY}}</el-checkbox>
									</el-checkbox-group>
									
									<el-upload v-if="ele.ELETYPE==12" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple>
									  <el-button size="mini" type="primary">点击上传</el-button>
									</el-upload>
					           </el-form-item>
					    	</el-form>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<div class="btn-box">
					<el-button id="temporary-btn" type="primary" @click="save" size="mini">暂存</el-button>
					<el-button id="submit-btn" type="primary" @click="submit" size="mini">提交</el-button>
				</div>
			</div>
		</div>
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
            	value:'',
            	values:[],
            	form:{},
            	type:''
            }
        },
        methods: {
        	select(id) {// 定位
        		this.isactive = id;
        		document.getElementById(id).scrollIntoView();
        	},
        	save() {//暂存
        		var data = {TYPE:this.type,SET:null,VALUES:''};
        		var list = [];
        		for(var key in this.form){
        			var new_key = key.substring(key.lastIndexOf('_')+1);
        			list.push({ELEID:parseInt(new_key),VAL:this.form[key].toString()});
        		}
        		data.VALUES=list;
        		this.$http.post('/event/tempStorage/',data).then(res=>{
	        		if(res.code == 10000){
	        			
	        		}else{
	        			this.$message.error(res.msg);
	        		}
	        	});
        	},
        	submit() {// 提交
        		this.$message.error('开发中...');
        	}
        },
		mounted() {
			var obj = this.$route.query;
			this.$http.post('/event/initFillPage/'+obj.id).then(res=>{
        		if(res.code == 10000){
        			var list = res.data.DATA;
        			this.type = res.data.TYPE;
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
	#eventFill-page .btn-box{
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