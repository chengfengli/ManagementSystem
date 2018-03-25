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
				  	<el-col :span="4">
				  		<ul class="ul_1">
				  			<li><div style="font-size: 16px;font-weight: bold;text-align: center;">开放事件</div>
								<div style="font-size: 14px;text-align: center;border-bottom: 1px solid #ccc;padding-bottom: 5px;color: #ccc;margin-bottom: 5px;">看一看、评一评、赞一赞 </div>
         						<div style="line-height: 20px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span style="color: red;margin-left: 24px;">特此声明：</span>不良事件系统中所有不良事件仅供医院职工内部职工学习交流，改进自身质量的作用，任何人不得以任何形式将医院不良事件泄露给院外人员。</span></div>
				  			</li>
				  		</ul>
				  		<table class="statistic" border="0" cellspacing="0" cellpadding="0">
				  			<tr><td>总事件：</td><td>{{statistic.ALLLEVEL}}</td></tr>
				  			<tr><td>l级事件：</td><td>{{statistic.ONELEVEL}}</td></tr>
				  			<tr><td>ll级事件：</td><td>{{statistic.TWOLEVEL}}</td></tr>
				  			<tr><td>lll级事件：</td><td>{{statistic.THREELEVEL}}</td></tr>
				  			<tr><td>lV级事件：</td><td>{{statistic.FOURELEVEL}}</td></tr>
				  			<tr><td>个人建议：</td><td>{{statistic.PROPOSALS}}</td></tr>
				  			<tr><td>点赞：</td><td>{{statistic.THUMBS}}</td></tr>
				  		</table>
				  	</el-col>
				  	<el-col :offset="1" :span="19">
				  		<el-form label-width="80px">
				  			<el-form-item label="事件类型" size="mini">
							    <el-select @change="selectChange" clearable v-model="form.TYPEID">
							      	<el-option v-for="eventType in eventTypes" :key="eventType.EVENTTYPEID" :label="eventType.TYPENAME" :value="eventType.EVENTTYPEID"></el-option>
							    </el-select>
							</el-form-item>
							<el-form-item label="当事科室" size="mini">
								<el-col :span="11" style="width: 190px;">
									<el-select v-model="form.DEPTID" clearable>
							      	<el-option v-for="item in depts" :key="item.DEPTID" :label="item.DEPTNAME" :value="item.DEPTID"></el-option>
							    </el-select>
								</el-col>
							    <el-col class="line" :span="2"><span href="javascript:vodi(0)" @click="currentDept" style="cursor: pointer;color: blue;">本科室事件</span></el-col>
							</el-form-item>
							<el-form-item label="事件等级" size="mini">
								<el-checkbox-group v-model="form.LEVEL" @change="checkboxChange">
								    <el-checkbox v-for="item in eventlevels" :label="item.VALUE" :key="item.VALUE">{{item.DISPLAY}}</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
				  		</el-form>
				  		<div style="margin-top: 20px">
						    <el-radio-group @change="orderbyGet" v-model="orderby" size="mini">
						      	<el-radio-button label="publishdate">发布时间</el-radio-button>
						      	<el-radio-button label="thumb">点赞数</el-radio-button>
						      	<el-radio-button label="comment">评论数</el-radio-button>
						    </el-radio-group>
					  	</div>
					  	<table class="data" cellspacing="0">
							<tr v-for="item in dataList" :keys="item.count" @click="details(item.id)">
								<td>【{{item.TYPENAME}}】{{item.TITLE}}<span v-if='item.TOP==1' style="color: blue;">【置顶】</span></td>
								<td>{{item.PUBLISHDATE}}</td>
								<td><img class="icon" src="../../../../static/img/public/click.png"><span class="count">({{item.CLICKS}})</span>&nbsp;&nbsp;<img class="icon" src="../../../../static/img/public/comment.png"><span class="count">({{item.PROPOSALS}})</span>&nbsp;&nbsp;<img class="icon" src="../../../../static/img/public/thumb.png"><span class="count">({{item.THUMBS}})</span></td>
							</tr>
						</table>
						<div v-if="dataList.length==0" style="color: #ccc;text-align: center;padding: 10px 0;">无数据</div>
						<el-pagination @size-change="changePageSize" @current-change="currentPage" :current-page="form.page"
	        			:page-sizes="[10,20,30,50]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="form.total"></el-pagination>
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
            	form:{
            		TYPEID: null,
            		DEPTID:null,
            		LEVEL:[],
            		SORTBY: 'publishdate',
            		total: 0,
            		page:1,
            		pageSize:10
            	},
            	eventTypes: [],
            	depts:[],
            	eventlevels:[],
            	orderby:'publishdate',
            	statistic: {
            		ALLLEVEL:'',
					FOURELEVEL:'',
					ONELEVEL:'',
					PROPOSALS:'',
					THREELEVEL:'',
					THUMBS:'',
					TWOLEVEL:''
            	},
            	dataList:[]
            }
        },
        methods: {
        	orderbyGet(value) {// 排序
        		this.form.SORTBY = value;
        		this.initDate(this.form);
        	},
        	selectChange() { //下拉框改变
        		this.initDate(this.form);
        	},
        	initDate(params){ //初始列表化数据
        		this.$http.post('/event/center/list',params).then(res=>{
	        		if(res.code == 10000){
	        			this.form.total = res.data.totalSize;
	        			this.dataList = res.data.rows;
	        		}else{
	        			this.$message.error(res.msg);
	        		}
	        	});
        	},
        	statistics() {//统计
        		this.$http.post('/event/center/statistics').then(res=>{
	        		if(res.code == 10000){
	        			this.statistic = res.data;
	        		}else{
	        			this.$message.error(res.msg);
	        		}
	        	});
        	},
        	changePageSize(pageSize) { // 每页数量发生改变——员工
        		this.form.pageSize = pageSize;
        		this.initDate(this.form);
        	},
        	currentPage(currentPage) {// 每页页码发生改变——员工
        		this.form.page = currentPage;
        		this.initDate(this.form);
        	},
        	details(id) {//详情
        		
        	},
        	checkboxChange() {
        		this.initDate(this.form);
        	},
        	currentDept() {
        		var user = JSON.parse(localStorage.getItem('user'));
        		this.form.DEPTID = user.DEPTID
        	}
        },
		mounted() {
			this.$http.post('/event/rootType').then(res=>{//初始化事件类型
        		if(res.code == 10000){
        			this.eventTypes = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	});
        	this.$http.post('/dept/list',{BELONGID:null}).then(res=>{//初始化科室
        		if(res.code == 10000){
        			this.depts = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	});
        	this.$http.post('/dic/getDicByKey/eventlevel').then(res=>{//初始化事件等级
        		if(res.code == 10000){
        			this.eventlevels = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	});
        	this.initDate(this.form);
        	this.statistics();
        	this.$http.post('/event/fillTypes').then(res=>{//初始化事件等级
        		if(res.code == 10000){
        		}else{
        			this.$message.error(res.msg);
        		}
        	});
		}
	}
</script>

<style>
	#eventCenter .ul_1 li{
		list-style: none;
		padding: 10px 0;
	}
	.statistic{
		width: 100%;
	}
	.statistic td{
		width: 50%;
		line-height: 20px;
	}
	.statistic td:nth-child(1){
		text-align: right;
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
	.icon{
		width: 15px;
	}
	.count{
	    position: relative;
    	top: -3px;
	}
	.el-checkbox__label{
		padding-left: 0px;
	}
	.el-checkbox__inner{
		top: -2px;
	}
	.el-checkbox+.el-checkbox {
	    margin-left: 14px;
	}
</style>