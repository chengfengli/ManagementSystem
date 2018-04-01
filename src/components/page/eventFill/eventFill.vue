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
					    	<el-form label-width="80px">
					    		<el-form-item label="单行">
					                <el-input size="mini"></el-input>
					            </el-form-item>
					            <el-form-item label="数字">
					                <el-input type="NUMBER" min='1' size="mini"></el-input>
					            </el-form-item>
					            <el-form-item label="多行">
					                <el-input type="textarea"></el-input>
					            </el-form-item>
					            <el-form-item label="日期">
					                <el-date-picker type="date" placeholder="选择日期" size="mini"></el-date-picker>
					            </el-form-item>
					            <el-form-item label="日期时间">
					                <el-date-picker type="datetime" placeholder="选择日期" size="mini"></el-date-picker>
					            </el-form-item>
					            <!--<el-form-item label="下拉">
					                <el-select placeholder="请选择" size="mini">
									</el-select>
					            </el-form-item>-->
					            <el-form-item label="单选">
					            	<el-radio-group>
									    <el-radio :label="3">备选项</el-radio>
									    <el-radio :label="6">备选项</el-radio>
									    <el-radio :label="9">备选项</el-radio>
									</el-radio-group>
					            </el-form-item>
					            <el-form-item label="多选">
					            	<el-checkbox-group>
									    <el-checkbox :label="1">多选一</el-checkbox>
									    <el-checkbox :label="2">多选二</el-checkbox>
									</el-checkbox-group>
					            </el-form-item>
					            <el-form-item label="上传">
					            	<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple>
									  <el-button size="mini" type="primary">点击上传</el-button>
									</el-upload>
					            </el-form-item>
					    	</el-form>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<!--<div class="btn-box">
					<el-button id="temporary-btn" type="primary" size="mini">暂存</el-button>
					<el-button id="submit-btn" type="primary" size="mini">提交</el-button>
				</div>
				
				
				-->
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
            	activeName: 'first',
            	activeNames: [],
            	dataList:[],
            	isactive:0,
            	isactiveClass:'isactive',
            	noactiveClass:null,
            	name: 'sadf'
            }
        },
        methods: {
        	select(id) {
        		this.isactive = id;
        		document.getElementById(id).scrollIntoView();
        	}
        },
		mounted() {
			var obj = this.$route.query;
			this.$http.post('/event/initFillPage/'+obj.id).then(res=>{
        		if(res.code == 10000){
        			this.dataList = res.data;
        			for(var i in res.data){
        				this.activeNames.push(res.data[i].MODID)
        			}
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
	}
	#eventFill-page .btn-box{
		position: absolute;
		right: 20px;
		top: 15px;
	}
</style>