<template>
	<div id="eventCenter">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="eventCenter-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>事件中心</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="container">
				<el-row>
				  	<el-col :span="3">
				  		<ul class="ul_1">
				  			<li>申明内容：</li>
				  			<li>总事件：</li>
				  			<li>l级事件：</li>
				  			<li>ll级事件：</li>
				  			<li>ll级事件：</li>
				  			<li>lll级事件：</li>
				  			<li>lV级事件：</li>
				  			<li>个人建议：</li>
				  			<li>点赞：</li>
				  		</ul>
				  	</el-col>
				  	<el-col :offset="1" :span="20">
				  		<el-form :model="form" label-width="80px">
				  			<el-form-item label="事件类型" size="mini">
							    <el-select v-model="form.type" placeholder="">
							      	<el-option label="区域一" value="shanghai"></el-option>
							      	<el-option label="区域二" value="beijing"></el-option>
							    </el-select>
							</el-form-item>
							<el-form-item label="当事科室" size="mini">
							    <el-select v-model="form.region">
							      	<el-option label="区域一" value="shanghai"></el-option>
							      	<el-option label="区域二" value="beijing"></el-option>
							    </el-select>
							</el-form-item>
							<el-form-item label="事件等级" size="mini">
							    <el-select v-model="form" multiple size="mini">
								    <el-option label="区域一" value="shanghai"></el-option>
							      	<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
				  		</el-form>
				  		<div style="margin-top: 20px">
						    <el-radio-group @change="orderbyGet" v-model="orderby" size="mini">
						      	<el-radio-button label="tiem">发布时间</el-radio-button>
						      	<el-radio-button label="2">点赞数</el-radio-button>
						      	<el-radio-button label="3">评论数</el-radio-button>
						    </el-radio-group>
					  	</div>
					  	<table class="data" cellspacing="0">
							<tr v-for="item in dataList" :keys="item.count" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>【{{item.type}}】{{item.title}}</td>
								<td>点击量({{item.count}})</td>
							</tr>
						</table>
						<el-pagination :current-page="1"
	        			:page-sizes="[10,20,30,50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="20"></el-pagination>
				  	</el-col>
				</el-row>
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
            	form: {
            		
            	},
            	orderby:'2',
            	dataList:[
            		{time:'2018/3/8',type:'事件类型1',title:'事件标题',count:3}
            	]
            }
        },
        methods: {
        	orderbyGet(value) {
        		alert(value)
        	}
        },
		mounted() {
			for(var i=1;i<=10;i++){
				this.dataList.push({time:'2018/3/8',type:'事件类型'+i,title:'事件标题',count:i});
			}
		}
	}
</script>

<style>
	#eventCenter .ul_1 li{
		list-style: none;
		padding: 10px 0;
	}
	#eventCenter .container{
		margin: 0 5%;
	}
	#eventCenter .data{
		width: 100%;
		margin-top: 10px;
	}
	#eventCenter .data tr:nth-child(odd){
		background-color: #F5F7FA;
	}
	#eventCenter .data tr:hover{
		background-color: #F5F7FA;
	}
	#eventCenter .data td{
		padding: 5px 10px;
	}
</style>